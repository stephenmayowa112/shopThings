import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how ShopThings collects, uses, and protects your personal information when using our African marketplace platform.',
  openGraph: {
    title: 'Privacy Policy - ShopThings',
    description: 'Privacy policy for ShopThings African marketplace platform.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 20, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 mb-0">
              <strong>Your Privacy Matters:</strong> This Privacy Policy explains how ShopThings collects, 
              uses, and protects your personal information. We are committed to maintaining your trust and confidence.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-primary mb-3">1.1 Information You Provide</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Create an account (name, email, password)</li>
              <li>Complete your profile (phone number, address, preferences)</li>
              <li>Make purchases (billing and shipping information)</li>
              <li>Become a seller (business information, tax details, bank account)</li>
              <li>Contact customer support (messages, feedback)</li>
              <li>Participate in surveys or promotions</li>
              <li>Leave reviews or ratings</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3">1.2 Information We Collect Automatically</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you use our Platform, we automatically collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, clicks, searches)</li>
              <li>Location information (general geographic location)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log files and analytics data</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3">1.3 Information from Third Parties</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may receive information from payment processors, shipping companies, 
              social media platforms (if you connect your accounts), and other service providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Provide and improve our Platform services</li>
              <li>Process transactions and payments</li>
              <li>Communicate with you about orders, updates, and promotions</li>
              <li>Verify seller accounts and prevent fraud</li>
              <li>Personalize your shopping experience</li>
              <li>Provide customer support</li>
              <li>Comply with legal obligations</li>
              <li>Analyze usage patterns and improve our services</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Protect against security threats and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">3. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We process your personal information based on:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li><strong>Contract:</strong> To fulfill our obligations under our Terms of Service</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Consent:</strong> For marketing communications and optional features</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">4. Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-primary mb-3">4.1 With Your Consent</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We share information when you explicitly consent, such as when you choose to 
              connect with social media platforms or participate in third-party integrations.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">4.2 Service Providers</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We share information with trusted service providers who help us operate our Platform:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Payment processors (for transaction processing)</li>
              <li>Shipping companies (for order fulfillment)</li>
              <li>Cloud hosting providers (for data storage)</li>
              <li>Email service providers (for communications)</li>
              <li>Analytics providers (for usage insights)</li>
              <li>Customer support tools</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3">4.3 Business Transfers</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In the event of a merger, acquisition, or sale of assets, your information 
              may be transferred as part of the business transaction.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">4.4 Legal Requirements</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may disclose information when required by law, court order, or to protect 
              our rights, property, or safety, or that of our users or the public.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              However, no method of transmission over the internet is 100% secure. 
              We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your information for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain business records</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              When information is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">7. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-primary mb-3">7.1 Access and Portability</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can access and download your personal information through your account settings 
              or by contacting us.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">7.2 Correction and Updates</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can update your information through your account settings or contact us 
              to correct inaccurate information.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">7.3 Deletion</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can request deletion of your account and personal information, subject to 
              legal and business requirements.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">7.4 Marketing Communications</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can opt out of marketing emails by clicking the unsubscribe link or 
              updating your preferences in your account settings.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">7.5 Cookies</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings, though this may affect 
              Platform functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Keep you logged in</li>
              <li>Analyze how you use our Platform</li>
              <li>Provide personalized content and ads</li>
              <li>Improve our services</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can manage cookie preferences through your browser settings or our cookie consent tool.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">9. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information during 
              international transfers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We comply with applicable data protection laws regarding international transfers, 
              including using standard contractual clauses where required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">10. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our Platform is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If we become aware that we have collected information from a child under 13, 
              we will take steps to delete such information promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of 
              significant changes by email or through a notice on our Platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your continued use of the Platform after changes are posted constitutes 
              acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-muted-foreground mb-2"><strong>Email:</strong> privacy@shopthings.com</p>
              <p className="text-muted-foreground mb-2"><strong>Address:</strong> ShopThings Privacy Officer</p>
              <p className="text-muted-foreground mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p className="text-muted-foreground"><strong>Data Protection Officer:</strong> dpo@shopthings.com</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">13. Regional Privacy Rights</h2>
            
            <h3 className="text-xl font-semibold text-primary mb-3">13.1 European Union (GDPR)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are in the EU, you have additional rights under the General Data Protection Regulation, 
              including the right to object to processing and the right to lodge a complaint with a supervisory authority.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">13.2 California (CCPA)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              California residents have specific rights under the California Consumer Privacy Act, 
              including the right to know what personal information is collected and the right to delete personal information.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">13.3 Other Jurisdictions</h3>
            <p className="text-muted-foreground leading-relaxed">
              We comply with applicable privacy laws in all jurisdictions where we operate. 
              Contact us for information about your specific rights.
            </p>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <p className="text-green-800 mb-0">
              <strong>Commitment to Privacy:</strong> We are committed to protecting your privacy and 
              handling your information responsibly. This policy reflects our current practices and 
              will be updated as needed to ensure continued protection of your rights.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}