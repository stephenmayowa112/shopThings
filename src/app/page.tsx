import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, ShoppingBag, Truck, Shield, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui';

// Featured categories - only 4 to match mockup
const FEATURED_CATEGORIES = [
  { name: 'African Fashion', slug: 'african-fashion', image: '/images/categories/african-fashion.jpg', count: 1250 },
  { name: 'Art & Sculptures', slug: 'art-sculptures', image: '/images/categories/art-sculptures.jpg', count: 890 },
  { name: 'Home Decor', slug: 'home-decor', image: '/images/categories/home-decor.jpg', count: 654 },
  { name: 'Gourmet Foods', slug: 'gourmet-foods', image: '/images/categories/gourmet-foods.jpg', count: 432 },
];

// Verified sellers - 3 to match mockup
const VERIFIED_SELLERS = [
  { name: 'AfroThreads Co.', slug: 'afrothreads-co', location: 'Lagos, Nigeria', products: 234, rating: 4.9, avatar: '/images/sellers/afrothreads.jpg', description: 'Handcrafted apparel inspired by traditional African textiles' },
  { name: 'Artisan Carvings', slug: 'artisan-carvings', location: 'Accra, Ghana', products: 189, rating: 4.8, avatar: '/images/sellers/artisan-carvings.jpg', description: 'Intricate wooden sculptures from West African artisans' },
  { name: 'Spice Route Delights', slug: 'spice-route-delights', location: 'Nairobi, Kenya', products: 156, rating: 4.9, avatar: '/images/sellers/spice-route.jpg', description: 'Authentic spices and gourmet foods from across the continent' },
];

// Curated collections - 4 to match mockup
const CURATED_COLLECTIONS = [
  { name: 'Diaspora Fashion Edit', slug: 'diaspora-fashion', image: '/images/collections/diaspora-fashion.jpg' },
  { name: 'Afro-Caribbean Vibes', slug: 'afro-caribbean', image: '/images/collections/afro-caribbean.jpg' },
  { name: 'The Sahel Collection', slug: 'sahel', image: '/images/collections/sahel.jpg' },
  { name: 'East African Innovations', slug: 'east-africa', image: '/images/collections/east-africa.jpg' },
];


export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Image 
          src="/images/hero/african-marketplace.jpg" 
          alt="Vibrant African marketplace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
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

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
              Featured Categories
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                  <h3 className="text-lg md:text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Sellers */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Verified Sellers
              </h2>
              <p className="text-muted-foreground mt-1">
                Shop with confidence from our trusted vendors
              </p>
            </div>
            <Link 
              href="/vendors" 
              className="hidden md:flex items-center text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_SELLERS.map((seller) => (
              <div
                key={seller.name}
                className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-foreground">{seller.name}</h3>
                      <BadgeCheck className="w-4 h-4 ml-1 text-secondary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{seller.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{seller.products} products</span>
                  <span className="flex items-center">
                    <span className="text-warning">★</span>
                    <span className="ml-1 font-medium">{seller.rating}</span>
                  </span>
                </div>
                <Link href={`/vendors/${seller.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="outline" fullWidth className="mt-4">
                    Visit Store
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Finds / New Arrivals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
                Fresh Finds
              </h2>
              <p className="text-muted-foreground mt-1">
                Just arrived on ShopThings
              </p>
            </div>
            <Link 
              href="/products?sort=newest" 
              className="hidden md:flex items-center text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {FRESH_FINDS.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                    <span className="text-4xl">🛍️</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground flex items-center">
                    {product.vendor}
                    <BadgeCheck className="w-3 h-3 ml-1 text-secondary" />
                  </p>
                  <h3 className="font-medium text-foreground mt-1 line-clamp-1 group-hover:text-secondary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-warning text-sm">★</span>
                    <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-primary mt-2">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-accent to-accent/90 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
            Start Selling on ShopThings
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of African artisans and entrepreneurs. Share your craft with the world and grow your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/vendor/register">
              <Button variant="primary" size="lg" className="bg-white text-accent hover:bg-white/90">
                Create Your Store
              </Button>
            </Link>
            <Link href="/vendor/success-stories">
              <Button variant="ghost" size="lg" className="text-white border border-white/30 hover:bg-white/10">
                Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Collections */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Curated Global Collections
            </h2>
            <p className="text-white/80 mt-2 max-w-2xl mx-auto">
              Discover unique items from across Africa, carefully selected to bring the continent&apos;s rich heritage to your doorstep.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-20 h-20 bg-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🌍
              </div>
              <h3 className="text-xl font-semibold mb-2">West African Treasures</h3>
              <p className="text-white/70 mb-4">
                Vibrant Ankara prints, Kente cloth, and traditional crafts from Nigeria, Ghana, and beyond.
              </p>
              <Link href="/collections/west-africa" className="text-secondary hover:underline">
                Explore Collection →
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-20 h-20 bg-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🦁
              </div>
              <h3 className="text-xl font-semibold mb-2">East African Elegance</h3>
              <p className="text-white/70 mb-4">
                Maasai beadwork, Kikoy fabrics, and handcrafted jewelry from Kenya, Tanzania, and Ethiopia.
              </p>
              <Link href="/collections/east-africa" className="text-secondary hover:underline">
                Explore Collection →
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-20 h-20 bg-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                💎
              </div>
              <h3 className="text-xl font-semibold mb-2">Southern African Gems</h3>
              <p className="text-white/70 mb-4">
                Zulu beadwork, Ndebele art, and Cape Malay inspired products from the southern regions.
              </p>
              <Link href="/collections/south-africa" className="text-secondary hover:underline">
                Explore Collection →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
