import Link from 'next/link';

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-muted-foreground">
            © {currentYear} ShopThings Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="/help" 
              className="text-muted-foreground hover:text-secondary transition-colors duration-200"
            >
              Help Center
            </Link>
            <Link 
              href="/contact" 
              className="text-muted-foreground hover:text-secondary transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link 
              href="/privacy" 
              className="text-muted-foreground hover:text-secondary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-muted-foreground hover:text-secondary transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
