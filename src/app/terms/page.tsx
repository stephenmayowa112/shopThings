import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read ShopThings terms and conditions for using our African marketplace platform, including user responsibilities, seller guidelines, and service policies.',
  openGraph: {
    title: 'Terms & Conditions - ShopThings',
    description: 'Terms and conditions for using ShopThings African marketplace.',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 20, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 mb-0">
              <strong>Important:</strong> By accessing and using ShopThings, you agree to be bound by these Terms & Conditions. 
              Please read them carefully before using our services.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing, browsing, or using the ShopThings website and mobile application (collectively, the "Platform"), 
              you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our 
              Privacy Policy. If you do not agree to these terms, please do not use our Platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              These terms apply to all users of the Platform, including browsers, vendors, customers, merchants, 
              and contributors of content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ShopThings is an online marketplace that connects buyers with sellers of authentic African products, 
              including but not limited to fashion, art, crafts, textiles, jewelry, beauty products, and home goods. 
              We provide a platform for transactions but are not a party to the actual sale between buyers and sellers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our services include product listings, search functionality, payment processing facilitation, 
              messaging systems, and customer support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-primary mb-3">3.1 Account Creation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To access certain features of our Platform, you must create an account. You agree to provide accurate, 
              current, and complete information during registration and to update such information as necessary.
            </p>
            
            <h3 className="text-xl font-semibold text-primary mb-3">3.2 Account Security</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account. You must notify us immediately of any unauthorized use 
              of your account.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">3.3 Account Termination</h3>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violation of these terms 
              or for any other reason we deem appropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">4. Seller Terms</h2>
            <h3 className="text-xl font-semibold text-primary mb-3">4.1 Seller Verification</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All sellers must complete our verification process before listing products. We reserve the right 
              to approve or reject seller applications at our discretion.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">4.2 Product Listings</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sellers are responsible for providing accurate product descriptions, images, and pricing. 
              All products must be authentic and comply with applicable laws and regulations.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">4.3 Order Fulfillment</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sellers must fulfill orders promptly and provide accurate shipping information. 
              Failure to fulfill orders may result in account suspension.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">4.4 Fees and Payments</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sellers agree to pay applicable transaction fees and commissions as outlined in our 
              Seller Agreement. Payments are processed according to our payment schedule.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">5. Buyer Terms</h2>
            <h3 className="text-xl font-semibold text-primary mb-3">5.1 Purchase Process</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By placing an order, you agree to pay the listed price plus applicable taxes and shipping fees. 
              All sales are final unless otherwise specified in our return policy.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">5.2 Payment</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Payment is due at the time of purchase. We accept various payment methods as displayed 
              during checkout. You authorize us to charge your selected payment method.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">5.3 Shipping and Delivery</h3>
            <p className="text-muted-foreground leading-relaxed">
              Shipping times and costs vary by seller and destination. We are not responsible for 
              shipping delays caused by carriers or customs authorities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">6. Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate any person or entity</li>
              <li>Collect user information without consent</li>
              <li>Interfere with the Platform's operation</li>
              <li>Sell counterfeit or inauthentic products</li>
              <li>Manipulate reviews or ratings</li>
              <li>Circumvent our security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Platform and its content, including but not limited to text, graphics, logos, images, 
              and software, are owned by ShopThings or our licensors and are protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works of our content 
              without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">8. Privacy and Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
              and protect your information when you use our Platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our Platform, you consent to the collection and use of your information 
              as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">9. Disclaimers and Limitation of Liability</h2>
            <h3 className="text-xl font-semibold text-primary mb-3">9.1 Platform Availability</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We strive to maintain Platform availability but do not guarantee uninterrupted access. 
              The Platform is provided "as is" without warranties of any kind.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">9.2 Third-Party Content</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are not responsible for the accuracy, quality, or legality of products listed by sellers. 
              Transactions are between buyers and sellers directly.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">9.3 Limitation of Liability</h3>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, ShopThings shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">10. Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We encourage users to resolve disputes directly with each other. If a resolution cannot 
              be reached, we may provide mediation services at our discretion.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Any legal disputes shall be resolved through binding arbitration in accordance with 
              the laws of [Jurisdiction], except where prohibited by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">11. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to modify these Terms & Conditions at any time. Changes will be 
              effective immediately upon posting on the Platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your continued use of the Platform after changes are posted constitutes acceptance 
              of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">12. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Either party may terminate this agreement at any time. Upon termination, your right 
              to use the Platform will cease immediately.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sections relating to intellectual property, disclaimers, limitation of liability, 
              and dispute resolution shall survive termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-muted-foreground mb-2"><strong>Email:</strong> legal@shopthings.com</p>
              <p className="text-muted-foreground mb-2"><strong>Address:</strong> ShopThings Legal Department</p>
              <p className="text-muted-foreground"><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <p className="text-yellow-800 mb-0">
              <strong>Note:</strong> These terms are effective as of the date listed above. 
              Please review them periodically for updates.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}