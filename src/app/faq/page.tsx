import { Metadata } from 'next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about ShopThings marketplace, ordering, shipping, returns, and more.',
  openGraph: {
    title: 'FAQ - ShopThings',
    description: 'Find answers to common questions about ShopThings marketplace.',
  },
};

const FAQ_CATEGORIES = [
  {
    title: 'General Questions',
    questions: [
      {
        question: 'What is ShopThings?',
        answer: 'ShopThings is an online marketplace dedicated to authentic African products, fashion, art, and crafts. We connect customers worldwide with verified sellers across Africa and the diaspora, offering a curated selection of high-quality, culturally rich products.'
      },
      {
        question: 'How do I create an account?',
        answer: 'Creating an account is easy! Click the "Sign Up" button in the top right corner, enter your email address and create a password. You\'ll receive a verification email to confirm your account. Once verified, you can start shopping immediately.'
      },
      {
        question: 'Is ShopThings free to use?',
        answer: 'Yes, creating an account and browsing products on ShopThings is completely free for customers. We only charge transaction fees to sellers when they make a sale.'
      },
      {
        question: 'What types of products can I find on ShopThings?',
        answer: 'We offer a wide variety of authentic African products including traditional textiles (Kente, Ankara), fashion and clothing, handmade crafts, jewelry, art pieces, beauty products, home decor, and specialty food items.'
      }
    ]
  },
  {
    title: 'Ordering & Payment',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our products, add items to your cart, and proceed to checkout. Enter your shipping information, select your payment method, and confirm your order. You\'ll receive an order confirmation email with tracking details.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, Mastercard, American Express), debit cards, and mobile money payments. All payments are processed securely through our encrypted payment system.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'You can modify or cancel your order within 2 hours of placing it, provided the seller hasn\'t started processing it. Contact our customer support team or the seller directly through your order page.'
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Currently, we require full payment at the time of purchase. However, we\'re working on introducing flexible payment options in the future.'
      }
    ]
  },
  {
    title: 'Shipping & Delivery',
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'Shipping times vary by location and seller. Domestic shipping within Africa typically takes 3-7 business days, while international shipping can take 7-21 business days. Each product page shows estimated delivery times.'
      },
      {
        question: 'How much does shipping cost?',
        answer: 'Shipping costs are calculated based on the item\'s weight, dimensions, and destination. You\'ll see the exact shipping cost during checkout before completing your purchase. Some sellers offer free shipping on orders over a certain amount.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to most countries worldwide. However, some products may have shipping restrictions due to customs regulations. Check the product page for specific shipping information.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "My Orders" section.'
      }
    ]
  },
  {
    title: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Custom or personalized items may not be eligible for returns. Check the specific return policy on each product page.'
      },
      {
        question: 'How do I return an item?',
        answer: 'Contact the seller through your order page or our customer support team within 30 days of delivery. We\'ll provide return instructions and a prepaid return label when applicable.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.'
      },
      {
        question: 'What if my item arrives damaged?',
        answer: 'If your item arrives damaged or defective, contact us immediately with photos of the damage. We\'ll work with the seller to provide a replacement or full refund at no cost to you.'
      }
    ]
  },
  {
    title: 'Seller Information',
    questions: [
      {
        question: 'How do I become a seller on ShopThings?',
        answer: 'To become a seller, click "Become a Vendor" and complete our application process. We verify all sellers to ensure quality and authenticity. Once approved, you can start listing your products.'
      },
      {
        question: 'How are sellers verified?',
        answer: 'We verify sellers through a comprehensive process including business documentation, product authenticity checks, and quality assessments. Verified sellers display a blue checkmark badge.'
      },
      {
        question: 'Can I contact sellers directly?',
        answer: 'Yes! You can message sellers directly through our messaging system. Click the "Contact Seller" button on any product page or order page to start a conversation.'
      },
      {
        question: 'What if I have an issue with a seller?',
        answer: 'If you have any issues with a seller, please contact our customer support team. We\'ll mediate the situation and ensure a fair resolution for both parties.'
      }
    ]
  },
  {
    title: 'Account & Security',
    questions: [
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we take security seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent. Read our Privacy Policy for more details.'
      },
      {
        question: 'How do I update my account information?',
        answer: 'Log into your account and go to "Account Settings" to update your personal information, shipping addresses, and payment methods.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account at any time by contacting our customer support team. Please note that this action is permanent and cannot be undone.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about ShopThings marketplace. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {FAQ_CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <details key={faqIndex} className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <h3 className="font-medium text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <div className="p-4 pt-2">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@shopthings.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}