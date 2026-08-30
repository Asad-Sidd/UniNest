import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-mocha dark:bg-dark-void text-warm-white dark:text-dark-text py-12 mt-auto relative overflow-hidden dark:border-t dark:border-dark-border">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading text-warm-white font-extrabold tracking-tight">
                Uni<span className="text-coral">Nest</span>
              </span>
            </Link>
            <p className="text-warm-white/70 max-w-sm mb-4">
              AI-Powered Accommodation & Navigation System for Integral University students. Find your perfect stay near Dasauli and Kursi Road.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-warm-white mb-4 tracking-[0.15em] uppercase text-xs">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/listings" className="text-warm-white/80 hover:text-coral transition-colors">Listings</Link></li>
              <li><Link href="/map" className="text-warm-white/80 hover:text-coral transition-colors">Map</Link></li>
              <li><Link href="/ai-search" className="text-warm-white/80 hover:text-coral transition-colors">AI Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-warm-white mb-4 tracking-[0.15em] uppercase text-xs">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-warm-white/80 hover:text-coral transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-warm-white/80 hover:text-coral transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-white/20 mt-12 pt-8 text-center text-warm-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} UniNest. Built by and for Integral University students.</p>
        </div>
      </div>
    </footer>
  );
};
