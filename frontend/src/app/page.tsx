import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Star, Shield, Home } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 bg-desert-dark">
      {/* Hero Section */}
      <section className="relative min-h-[600px] h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background: Night Sky to Desert Sand */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-night-blue via-night-blue/80 to-sand-tan/20" />
        
        {/* Twinkling Starfield Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-star-gold rounded-full animate-twinkle"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 70 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 2 + 's'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-papyrus uppercase tracking-widest drop-shadow-lg">
            Your Home Away From Home
          </h1>
          
          {/* Decorative Divider */}
          <div className="w-16 h-px bg-sand-tan mx-auto mb-6" />
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-sand-tan drop-shadow-md">
            Find the best verified PGs and Hostels near Integral University with AI-powered search.
          </p>

          <div className="max-w-3xl mx-auto bg-night-shadow/60 backdrop-blur-md border border-sand-shadow/30 rounded-sm p-2 flex items-center shadow-lg">
            <div className="flex-1 flex items-center px-4">
              <MapPin className="text-sand-tan mr-2" />
              <Input
                type="text"
                placeholder="Where does your journey begin? (e.g. Dasauli)"
                className="border-0 focus-visible:ring-0 text-papyrus placeholder:text-papyrus/50 bg-transparent h-12 text-lg"
              />
            </div>
            <Link href="/listings">
              <Button size="lg" className="rounded-sm px-8 h-12">
                <Search className="mr-2 h-4 w-4" /> Seek
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium">
            <Link href="/ai-search" className="bg-night-shadow/40 border border-sand-shadow/30 hover:bg-night-shadow/60 backdrop-blur-md rounded-sm px-6 py-3 transition-colors flex items-center text-papyrus hover:text-sand-tan">
              <Star className="w-4 h-4 mr-2 text-star-gold" />
              Consult the AI Oracle
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-desert-dark border-b border-sand-shadow/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-sand-shadow/20">
            <div className="p-4">
              <div className="text-4xl font-heading font-bold text-sand-tan mb-2 tracking-widest">50+</div>
              <div className="text-papyrus/70 font-medium uppercase tracking-wider text-xs">Verified Sanctuaries</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-heading font-bold text-sand-tan mb-2 tracking-widest">1000+</div>
              <div className="text-papyrus/70 font-medium uppercase tracking-wider text-xs">Satisfied Scholars</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-heading font-bold text-sand-tan mb-2 tracking-widest">100%</div>
              <div className="text-papyrus/70 font-medium uppercase tracking-wider text-xs">Safe & Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-night-shadow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-papyrus mb-4 tracking-widest uppercase">Why Choose UniNest?</h2>
            <div className="w-16 h-px bg-sand-tan mx-auto mb-6" />
            <p className="text-sand-tan/80 max-w-2xl mx-auto">We make finding your perfect student accommodation near Integral University effortless and secure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-desert-dark p-8 rounded-sm border border-sand-shadow/30 hover:shadow-[0_0_20px_rgba(225,179,130,0.15)] transition-shadow">
              <div className="w-14 h-14 bg-night-blue rounded-sm flex items-center justify-center text-star-gold border border-sand-shadow/20 mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold text-sand-tan mb-3 tracking-widest uppercase text-sm">Verified Listings</h3>
              <p className="text-papyrus/70">Every PG and hostel on our platform is physically verified for authenticity and quality.</p>
            </div>

            <div className="bg-desert-dark p-8 rounded-sm border border-sand-shadow/30 hover:shadow-[0_0_20px_rgba(225,179,130,0.15)] transition-shadow">
              <div className="w-14 h-14 bg-night-blue rounded-sm flex items-center justify-center text-star-gold border border-sand-shadow/20 mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold text-sand-tan mb-3 tracking-widest uppercase text-sm">Smart Routing</h3>
              <p className="text-papyrus/70">Get accurate distance metrics and directions from your property directly to the university campus.</p>
            </div>

            <div className="bg-desert-dark p-8 rounded-sm border border-sand-shadow/30 hover:shadow-[0_0_20px_rgba(225,179,130,0.15)] transition-shadow">
              <div className="w-14 h-14 bg-night-blue rounded-sm flex items-center justify-center text-star-gold border border-sand-shadow/20 mb-6">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold text-sand-tan mb-3 tracking-widest uppercase text-sm">AI Oracle Assistant</h3>
              <p className="text-papyrus/70">Just tell our AI what you need and receive personalized, insightful recommendations instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-night-blue border-t border-sand-shadow/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-papyrus uppercase tracking-widest">Ready to find your sanctuary?</h2>
          <div className="w-16 h-px bg-sand-tan mx-auto mb-6" />
          <p className="text-xl text-sand-tan mb-10 max-w-2xl mx-auto">Join hundreds of Integral University scholars who have already found their home through UniNest.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/listings">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8">
                Explore Properties
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
