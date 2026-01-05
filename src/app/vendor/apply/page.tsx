'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Store,
  Building2,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Info,
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { submitVendorApplication } from './actions';

interface FormData {
  storeName: string;
  storeDescription: string;
  businessAddress: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  businessEmail: string;
  businessType: string;
  productCategories: string[];
  agreedToTerms: boolean;
}

const PRODUCT_CATEGORIES = [
  'Fashion & Apparel',
  'Art & Sculptures',
  'Home Decor',
  'Jewelry & Accessories',
  'Food & Beverages',
  'Beauty & Skincare',
  'Textiles & Fabrics',
  'Handcrafted Goods',
  'Musical Instruments',
  'Books & Stationery',
];

const BUSINESS_TYPES = [
  'Individual/Sole Proprietor',
  'Registered Business',
  'Cooperative/Artisan Group',
  'Non-Profit Organization',
];

export default function VendorApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    storeDescription: '',
    businessAddress: '',
    city: '',
    state: '',
    country: 'Nigeria',
    phoneNumber: '',
    businessEmail: '',
    businessType: '',
    productCategories: [],
    agreedToTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      productCategories: prev.productCategories.includes(category)
        ? prev.productCategories.filter((c) => c !== category)
        : [...prev.productCategories, category],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.storeName.trim().length >= 3 && 
               formData.storeDescription.trim().length >= 20;
      case 2:
        return formData.businessAddress.trim() !== '' &&
               formData.city.trim() !== '' &&
               formData.state.trim() !== '' &&
               formData.phoneNumber.trim() !== '';
      case 3:
        return formData.businessType !== '' && 
               formData.productCategories.length > 0;
      case 4:
        return formData.agreedToTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await submitVendorApplication({
        storeName: formData.storeName,
        storeDescription: formData.storeDescription,
        businessAddress: formData.businessAddress,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        businessEmail: formData.businessEmail || undefined,
        businessType: formData.businessType,
        productCategories: formData.productCategories,
      });
      
      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to pending page
        router.push('/vendor/pending');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Store Info', icon: Store },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Business', icon: Building2 },
    { number: 4, title: 'Review', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
            Become a Seller
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete your seller application to start selling on ShopThings
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.number
                      ? 'bg-secondary border-secondary text-white'
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.number
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      currentStep > step.number ? 'bg-secondary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-error/10 border border-error/20 text-error rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl p-6 border border-border">
          {/* Step 1: Store Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Tell us about your store
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Store Name"
                    name="storeName"
                    placeholder="e.g., Accra Textiles & Crafts"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Store Description
                    </label>
                    <textarea
                      name="storeDescription"
                      placeholder="Describe your store, what you sell, and what makes your products special..."
                      value={formData.storeDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 20 characters ({formData.storeDescription.length}/20)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Where are you located?
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Business Address"
                    name="businessAddress"
                    placeholder="Street address"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      placeholder="e.g., Lagos"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="State/Region"
                      name="state"
                      placeholder="e.g., Lagos State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Business Email (Optional)"
                    name="businessEmail"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Business Type */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Business Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUSINESS_TYPES.map((type) => (
                        <label
                          key={type}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.businessType === type
                              ? 'border-secondary bg-secondary/5'
                              : 'border-border hover:border-secondary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="businessType"
                            value={type}
                            checked={formData.businessType === type}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.businessType === type
                                ? 'border-secondary'
                                : 'border-border'
                            }`}
                          >
                            {formData.businessType === type && (
                              <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                            )}
                          </div>
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Product Categories (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_CATEGORIES.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleCategoryToggle(category)}
                          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                            formData.productCategories.includes(category)
                              ? 'bg-secondary text-white border-secondary'
                              : 'border-border hover:border-secondary/50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Selected: {formData.productCategories.length} categories
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Review Your Application
                </h2>

                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Store Information</h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Name:</span> {formData.storeName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Description:</span> {formData.storeDescription}
                    </p>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.businessAddress}, {formData.city}, {formData.state}, {formData.country}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Phone:</span> {formData.phoneNumber}
                    </p>
                    {formData.businessEmail && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">Email:</span> {formData.businessEmail}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Business Details</h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Type:</span> {formData.businessType}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Categories:</span> {formData.productCategories.join(', ')}
                    </p>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <span className="text-sm text-muted-foreground">
                        I agree to the{' '}
                        <Link href="/help/seller-terms" className="text-secondary hover:underline">
                          Seller Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/help/privacy" className="text-secondary hover:underline">
                          Privacy Policy
                        </Link>
                        . I understand that my application will be reviewed and I will be notified via email.
                      </span>
                    </label>
                  </div>

                  <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Your application will be reviewed within 1-3 business days. We&apos;ll notify you via email once your store is approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!validateStep(4) || isLoading}
                isLoading={isLoading}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
