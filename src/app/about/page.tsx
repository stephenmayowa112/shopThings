import { Metadata } from 'next';
import Image from 'next/image';
import { Heart, Globe, Shield, Users, Award, Zap } from 'lucide-react';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ShopThings mission to connect the world with authentic African products, culture, and craftsmanship from verified sellers across Africa and the diaspora.',
  openGraph: {
    title: 'About ShopThings - African Marketplace',
    description: 'Discover our mission to celebrate African culture through authentic products and craftsmanship.',
  },
};

const VALUES = [
  {
    icon: Heart,
    title: 'Authenticity',
    description: 'We are committed to showcasing genuine African products and supporting authentic cultural expression.'
  },
  {
    icon: Globe,
    title: 'Global Connection',
    description: 'Bridging continents by connecting African sellers with customers worldwide, fostering cultural exchange.'
  },
  {
    icon: Shield,
    title: 'Trust & Quality',
    description: 'Every seller is verified and every product is curated to ensure the highest standards of quality.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a supportive community that celebrates African heritage and empowers local artisans.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Striving for excellence in everything we do, from product curation to customer service.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Using technology to make African products more accessible while preserving traditional craftsmanship.'
  }
];

const TEAM_STATS = [
  { number: '500+', label: 'Verified Sellers' },
  { number: '50+', label: 'Countries Served' },
  { number: '10,000+', label: 'Happy Customers' },
  { number: '25,000+', label: 'Products Listed' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
                Discover the Spirit of Africa
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                ShopThings is more than just a marketplace – we're a bridge connecting the rich cultural heritage 
                of Africa with the world. Our platform celebrates authentic African craftsmanship, fashion, art, 
                and traditions while empowering local artisans and entrepreneurs.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">2023</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">54</div>
                  <div className="text-sm text-muted-foreground">African Countries</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Authentic Products</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <Image
                  src="/images/hero/herosection1.png"
                  alt="African marketplace showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To create a global platform that celebrates African culture, empowers local artisans, 
              and makes authentic African products accessible to customers worldwide while preserving 
              traditional craftsmanship and supporting sustainable economic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
              Our Impact
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Since our launch, we've been proud to support African entrepreneurs and 
              connect customers worldwide with authentic African products.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20">
                <Image
                  src="/images/hero/herosection2.png"
                  alt="African artisans at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  ShopThings was born from a simple yet powerful vision: to create a bridge between 
                  Africa's rich cultural heritage and the global marketplace. Our founders, passionate 
                  about African culture and entrepreneurship, recognized the need for a platform that 
                  could showcase authentic African products while supporting local artisans.
                </p>
                <p>
                  What started as a small initiative to help a few local craftspeople has grown into 
                  a thriving marketplace that serves hundreds of verified sellers across Africa and 
                  the diaspora. We've maintained our commitment to authenticity, quality, and 
                  community support throughout our journey.
                </p>
                <p>
                  Today, ShopThings stands as a testament to the power of technology in preserving 
                  and promoting cultural heritage while creating economic opportunities for African 
                  entrepreneurs worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">
              Our Commitment
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're dedicated to creating positive impact through every aspect of our business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Sustainability
              </h3>
              <p className="text-muted-foreground">
                Supporting eco-friendly practices and sustainable production methods 
                that respect both people and planet.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Fair Trade
              </h3>
              <p className="text-muted-foreground">
                Ensuring fair compensation for artisans and promoting ethical 
                business practices throughout our supply chain.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-border text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Cultural Preservation
              </h3>
              <p className="text-muted-foreground">
                Protecting and promoting traditional African crafts, techniques, 
                and cultural expressions for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">
            Join Our Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a customer looking for authentic African products or an artisan 
            wanting to share your craft with the world, we invite you to be part of our story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Shop Products
            </a>
            <a
              href="/vendor/apply"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Become a Seller
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}