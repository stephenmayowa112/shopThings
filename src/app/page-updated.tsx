import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, ShoppingBag, Truck, Shield, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui';

// Featured categories with images
const FEATURED_CATEGORIES = [
  { 
    name: 'Global Connection', 
    slug: 'global-connection', 
    image: '/images/categories/globalConnection.png',
    count: 1250 
  },
  { 
    name: 'Payment & Logistics', 
    slug: 'payment-logistics', 
    image: '/images/categories/payment&logistics.png',
    count: 890 
  },
];

// Verified sellers with avatars
const VERIFIED_SELLERS = [
  { 
    name: 'AfroThreads Co.', 
    slug: 'afrothreads-co',
    location: 'Lagos, Nigeria', 
    products: 234, 
    rating: 4.9,
    avatar: '/images/sellers/afrothreads.jpg',
    description: 'Handcrafted apparel inspired by traditional African textiles'
  },
  { 
    name: 'Artisan Carvings', 
    slug: 'artisan-carvings',
    location: 'Accra, Ghana', 
    products: 189, 
    rating: 4.8,
    avatar: '/images/sellers/artisan-carvings.jpg',
    description: 'Intricate wooden sculptures from West African artisans'
  },
  { 
    name: 'Spice Route Delights', 
    slug: 'spice-route-delights',
    location: 'Nairobi, Kenya', 
    products: 156, 
    rating: 4.9,
    avatar: '/images/sellers/spice-route.jpg',
    description: 'Authentic spices and gourmet foods from across the continent'
  },
];

// Curated collections - UPDATED TO MATCH MOCKUP
const CURATED_COLLECTIONS = [
  { 
    name: 'Fashion', 
    slug: 'fashion',
    image: '/images/collections/fasion.png',
    description: 'Contemporary looks for every day'
  },
  { 
    name: 'Home & Art', 
    slug: 'home-art',
    image: '/images/collections/home&art.png',
    description: 'Crafted pieces to elevate your space'
  },
  { 
    name: 'Skincare', 
    slug: 'skincare',
    image: '/images/collections/skincare.png',
    description: 'Self-care staples from trusted creators'
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section - UPDATED WITH REAL IMAGE */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Hero Image */}
        <Image 
          src="/images/hero/herosection1.png" 
          alt="Marketplace hero visual"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Discover the Spirit of Africa
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Explore a curated selection of authentic crafts, fashion, and art from across the continent.
            </p>
            <Link href="/products">
              <Button variant="secondary" size="lg">
                Explore Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-muted py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <BadgeCheck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Verified Sellers</p>
                <p className="text-sm text-muted-foreground">100% Authentic</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <Truck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Global Shipping</p>
                <p className="text-sm text-muted-foreground">Worldwide Delivery</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Secure Payments</p>
                <p className="text-sm text-muted-foreground">Safe & Protected</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <HeartHandshake className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Support Artisans</p>
                <p className="text-sm text-muted-foreground">Direct Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - UPDATED WITH IMAGES */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Featured Categories
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {FEATURED_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image 
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-semibold mb-1">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Sellers - UPDATED WITH AVATARS */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Verified Sellers
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_SELLERS.map((seller) => (
              <div
                key={seller.slug}
                className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image 
                      src={seller.avatar}
                      alt={seller.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold text-foreground">{seller.name}</h3>
                      <BadgeCheck className="w-4 h-4 ml-1 text-secondary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{seller.description}</p>
                  </div>
                </div>
                <Link href={`/vendors/${seller.slug}`}>
                  <Button variant="outline" fullWidth className="mt-4">
                    View Profile
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Global Collections - UPDATED LAYOUT AND NAMES */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
              Curated Global Collections
            </h2>
          </div>
          
          {/* 2x2 Grid on desktop, 1 column on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURATED_COLLECTIONS.map((collection) => (
              <Link 
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image 
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">{collection.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Finds Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
            Fresh Finds, Just For You
          </h2>
          <p className="text-muted-foreground mb-8">
            Discover the latest arrivals from our verified sellers
          </p>
          <Link href="/products?sort=newest">
            <Button variant="primary" size="lg">
              Shop New Arrivals
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
