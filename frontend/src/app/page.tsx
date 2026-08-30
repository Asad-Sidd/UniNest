import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Star, Shield, Home } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 bg-warm-white dark:bg-dark-void transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[600px] h-[80vh] flex items-center justify-center overflow-hidden bg-warm-white dark:bg-transparent bg-gradient-to-b dark:from-dark-void dark:to-dark-surface">
        
        {/* Dynamic Background Elements */}
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#C2CAD0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30"></div>
        
        {/* Soft Animated Gradient Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/10 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 animate-float-slow pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sage/15 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 animate-float pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-mist/20 rounded-full blur-[90px] -translate-y-1/2 -translate-x-1/2 animate-float-fast pointer-events-none" />
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-[15%] text-coral/20 animate-float">
          <Star className="w-12 h-12" />
        </div>
        <div className="absolute bottom-32 right-[10%] text-sage/30 animate-float-slow">
          <Home className="w-16 h-16" />
        </div>
        <div className="absolute top-40 right-[20%] text-mocha/10 animate-float-fast">
          <MapPin className="w-10 h-10" />
        </div>
        <div className="absolute bottom-40 left-[10%] text-coral/15 animate-float" style={{ animationDelay: '2s' }}>
          <Shield className="w-14 h-14" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 text-charcoal dark:text-dark-text leading-tight max-w-4xl mx-auto">
            Find the <span className="text-coral">Perfect</span> Home Away From Home
          </h1>
          
          <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto text-charcoal/60 dark:text-dark-muted leading-relaxed">
            Verified PGs and Hostels near Integral University with AI-powered search.
          </p>

          <div className="max-w-2xl mx-auto bg-white dark:bg-dark-surface border border-mist dark:border-dark-border rounded-xl shadow-sm dark:shadow-none focus-within:shadow-md focus-within:border-coral/50 dark:focus-within:border-coral/50 transition-all flex items-center p-1.5 mb-8">
            <div className="flex-1 flex items-center px-4">
              <MapPin className="text-charcoal/40 dark:text-dark-muted w-5 h-5 mr-3" />
              <Input
                type="text"
                placeholder="Where does your journey begin? (e.g. Dasauli)"
                className="border-0 focus-visible:ring-0 text-charcoal dark:text-dark-text placeholder:text-charcoal/30 dark:placeholder:text-dark-muted/50 bg-transparent h-12 text-base px-0 shadow-none focus-visible:ring-transparent focus-visible:ring-offset-0"
              />
            </div>
            <Link href="/listings" className="shrink-0">
              <Button size="lg" className="rounded-lg px-8 h-12">
                <Search className="mr-2 w-4 h-4" /> Seek
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-coral font-bold text-2xl">50+</span>
              <span className="text-charcoal/50 dark:text-dark-muted uppercase tracking-[0.15em] text-xs font-semibold mt-1">Verified</span>
            </div>
            <div className="w-px h-8 bg-mist/50 dark:bg-dark-border"></div>
            <div className="flex flex-col items-center">
              <span className="text-sage font-bold text-2xl">100%</span>
              <span className="text-charcoal/50 dark:text-dark-muted uppercase tracking-[0.15em] text-xs font-semibold mt-1">Secure</span>
            </div>
            <div className="w-px h-8 bg-mist/50 dark:bg-dark-border"></div>
            <div className="flex flex-col items-center">
              <span className="text-coral font-bold text-2xl">24/7</span>
              <span className="text-charcoal/50 dark:text-dark-muted uppercase tracking-[0.15em] text-xs font-semibold mt-1">AI Assist</span>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center">
            <Link href="/ai-search" className="text-charcoal/60 dark:text-dark-muted hover:text-coral dark:hover:text-coral hover:bg-coral/5 dark:hover:bg-coral/10 transition-colors rounded-lg px-6 py-3 flex items-center text-sm font-medium border border-transparent hover:border-coral/20">
              <Star className="w-4 h-4 mr-2 text-coral" />
              Try the AI Concierge
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-stone dark:bg-dark-surface/50 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text mb-4">Why Choose UniNest?</h2>
            <p className="text-charcoal/70 dark:text-dark-muted max-w-2xl mx-auto leading-relaxed">We make finding your perfect student accommodation near Integral University effortless and secure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-surface p-8 rounded-xl border border-mist/30 dark:border-dark-border shadow-sm dark:shadow-none hover:shadow-lg hover:border-coral/30 dark:hover:border-coral/30 hover:shadow-mocha/5 dark:hover:shadow-black/20 transition-all">
              <div className="w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center text-sage mb-6 border border-sage/30">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-charcoal dark:text-dark-text mb-3">Verified Listings</h3>
              <p className="text-charcoal/70 dark:text-dark-muted leading-relaxed text-sm">Every PG and hostel on our platform is physically verified for authenticity and quality.</p>
            </div>

            <div className="bg-white dark:bg-dark-surface p-8 rounded-xl border border-mist/30 dark:border-dark-border shadow-sm dark:shadow-none hover:shadow-lg hover:border-coral/30 dark:hover:border-coral/30 hover:shadow-mocha/5 dark:hover:shadow-black/20 transition-all">
              <div className="w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center text-sage mb-6 border border-sage/30">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-charcoal dark:text-dark-text mb-3">Smart Routing</h3>
              <p className="text-charcoal/70 dark:text-dark-muted leading-relaxed text-sm">Get accurate distance metrics and directions from your property directly to the university campus.</p>
            </div>

            <div className="bg-white dark:bg-dark-surface p-8 rounded-xl border border-mist/30 dark:border-dark-border shadow-sm dark:shadow-none hover:shadow-lg hover:border-coral/30 dark:hover:border-coral/30 hover:shadow-mocha/5 dark:hover:shadow-black/20 transition-all">
              <div className="w-12 h-12 bg-coral/10 dark:bg-coral/20 rounded-lg flex items-center justify-center text-coral mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-charcoal dark:text-dark-text mb-3">AI Concierge</h3>
              <p className="text-charcoal/70 dark:text-dark-muted leading-relaxed text-sm">Just tell our AI what you need and receive personalized, insightful recommendations instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-warm-white dark:bg-dark-void transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 text-charcoal dark:text-dark-text leading-tight">Ready to find your sanctuary?</h2>
          <p className="text-lg text-charcoal/70 dark:text-dark-muted mb-10 max-w-2xl mx-auto leading-relaxed">Join hundreds of Integral University scholars who have already found their home through UniNest.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/listings">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-lg shadow-sm">
                Explore Properties
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-lg">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
