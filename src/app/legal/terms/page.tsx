import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - ShopThings',
  description: 'Terms and conditions for using the ShopThings African marketplace platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-heading font-bold text-primary mb-8">Terms & Conditions</h1>
          
          <p className="text-muted-foreground mb-8">
            <strong>Last updated:</strong> January 20, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing and using ShopThings ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p>
              ShopThings is a marketplace platform that connects buyers with African vendors and artisans worldwide. These terms govern your use of our platform and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Platform"</strong> refers to the ShopThings website and mobile applications</li>
              <li><strong>"User"</strong> refers to anyone who accesses or uses our platform</li>
              <li><strong>"Vendor"</strong> refers to sellers who list products on our platform</li>
              <li><strong>"Buyer"</strong> refers to users who purchase products through our platform</li>
              <li><strong>"Content"</strong> refers to all text, images, videos, and other materials on our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
            <p className="mb-4">
              To use certain features of our platform, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">3.2 Account Security</h3>
            <p className="mb-4">
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason we deem appropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">4. Vendor Terms</h2>
            <h3 className="text-xl font-semibold mb-3">4.1 Vendor Registration</h3>
            <p className="mb-4">
              Vendors must complete our verification process before listing products. This includes providing business documentation and agreeing to our vendor standards.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">4.2 Product Listings</h3>
            <p className="mb-4">
              Vendors are responsible for accurate product descriptions, pricing, and availability. All products must comply with applicable laws and our content policies.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">4.3 Order Fulfillment</h3>
            <p>
              Vendors must fulfill orders promptly and provide accurate shipping information. Failure to meet fulfillment standards may result in account suspension.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">5. Buyer Terms</h2>
            <h3 className="text-xl font-semibold mb-3">5.1 Purchase Process</h3>
            <p className="mb-4">
              By placing an order, you agree to pay the listed price plus applicable taxes and shipping fees. All sales are final unless otherwise specified by the vendor's return policy.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">5.2 Payment</h3>
            <p className="mb-4">
              Payment is processed securely through our payment partners. We do not store your payment information on our servers.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">5.3 Disputes</h3>
            <p>
              For order disputes, please contact the vendor first. If unresolved, you may contact our support team for assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">6. Prohibited Uses</h2>
            <p className="mb-4">You may not use our platform to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Sell counterfeit, illegal, or prohibited items</li>
              <li>Engage in fraudulent or deceptive practices</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Interfere with the platform's operation or security</li>
              <li>Upload malicious code or attempt to hack the system</li>
              <li>Spam or send unsolicited communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              The ShopThings platform and its original content, features, and functionality are owned by ShopThings and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              Vendors retain ownership of their product content but grant us a license to display and promote their products on our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">8. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">9. Disclaimers</h2>
            <p className="mb-4">
              ShopThings is a marketplace platform that facilitates transactions between buyers and vendors. We are not responsible for the quality, safety, or legality of products listed by vendors.
            </p>
            <p>
              The platform is provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">10. Limitation of Liability</h2>
            <p>
              In no event shall ShopThings be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">12. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p><strong>Email:</strong> legal@shopthings.com</p>
              <p><strong>Address:</strong> ShopThings Legal Department</p>
              <p>123 Marketplace Street</p>
              <p>Lagos, Nigeria</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}