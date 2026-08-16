import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-desert-dark border-t border-sand-shadow/20 py-12 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-night-shadow/30 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading text-sand-tan uppercase tracking-widest">
                UniNest
              </span>
            </Link>
            <p className="text-papyrus/60 max-w-sm mb-4">
              AI-Powered Accommodation & Navigation System for Integral University students. Find your perfect stay near Dasauli and Kursi Road.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sand-tan mb-4 tracking-wider uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/listings" className="text-papyrus/80 hover:text-sand-tan transition-colors">Listings</Link></li>
              <li><Link href="/map" className="text-papyrus/80 hover:text-sand-tan transition-colors">Map</Link></li>
              <li><Link href="/ai-search" className="text-papyrus/80 hover:text-sand-tan transition-colors">AI Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sand-tan mb-4 tracking-wider uppercase text-sm">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-papyrus/80 hover:text-sand-tan transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-papyrus/80 hover:text-sand-tan transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sand-shadow/20 mt-12 pt-8 text-center text-papyrus/40 text-sm">
          <p>&copy; {new Date().getFullYear()} UniNest. Built for Integral University students.</p>
        </div>
      </div>
    </footer>
  );
};
