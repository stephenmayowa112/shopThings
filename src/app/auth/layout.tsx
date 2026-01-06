import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Truck, Shield } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary/80 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/images/logo.jpeg"
              alt="ShopThings"
              width={140}
              height={40}
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <h1 className="text-4xl xl:text-5xl font-heading font-bold mb-6 leading-tight">
              Discover the Spirit of Africa
            </h1>
            <p className="text-lg text-white/85 mb-10 leading-relaxed">
              Join thousands of buyers and sellers on Africa&apos;s premier marketplace for authentic crafts, fashion, and art.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-center space-x-4 group">
                <div className="w-14 h-14 bg-secondary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300">
                  <ShoppingBag className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">10,000+ Products</p>
                  <p className="text-sm text-white/70">Authentic African crafts and more</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-14 h-14 bg-secondary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300">
                  <Truck className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Global Shipping</p>
                  <p className="text-sm text-white/70">Delivery to 50+ countries</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-14 h-14 bg-secondary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300">
                  <Shield className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Verified Sellers</p>
                  <p className="text-sm text-white/70">Shop with confidence</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} ShopThings Africa. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        {/* Mobile header */}
        <div className="lg:hidden p-5 border-b border-border/50 bg-white sticky top-0 z-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold">
              <span className="text-primary">Shop</span><span className="text-secondary">Things</span>
            </span>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gradient-to-b from-white to-muted/20">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
