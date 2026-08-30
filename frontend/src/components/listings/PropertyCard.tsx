'use client';

import Link from 'next/link';
import { Property } from '@/types/listing';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Navigation } from 'lucide-react';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
  avgRating?: number;
  reviewCount?: number;
}

export const PropertyCard = ({ property, avgRating = 4.5, reviewCount = 12 }: PropertyCardProps) => {
  return (
    <Link href={`/listings/${property._id}`}>
      <Card className="overflow-hidden group h-full flex flex-col cursor-pointer border-mist/50 dark:border-dark-border bg-white dark:bg-dark-surface">
        <div className="relative h-48 w-full overflow-hidden bg-cream dark:bg-dark-elevated">
          <Image 
            src={property.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'} 
            alt={property.title} 
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100 rounded-t-xl"
          />
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            <Badge className="bg-white/90 dark:bg-dark-surface/90 border border-mist dark:border-dark-border text-charcoal dark:text-dark-text shadow-sm backdrop-blur-sm font-semibold uppercase tracking-[0.1em] text-[10px]">
              {property.type}
            </Badge>
            {property.verificationStatus === 'verified' && (
              <Badge variant="success" className="bg-sage text-white border-0 px-2 py-0.5 rounded shadow-sm text-[10px] uppercase font-bold tracking-wider">
                Verified
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col flex-1 bg-white dark:bg-dark-surface">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-dark-text line-clamp-1 group-hover:text-coral transition-colors tracking-tight">
              {property.title}
            </h3>
            <div className="flex items-center bg-coral/5 dark:bg-coral/20 border border-coral/20 px-2 py-1 rounded-lg text-sm font-bold text-coral">
              <Star className="w-3.5 h-3.5 fill-coral text-coral mr-1" />
              {avgRating.toFixed(1)}
            </div>
          </div>
          
          <div className="flex items-center text-charcoal/60 dark:text-dark-muted text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.address.street}, {property.address.area}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-auto">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-xs font-medium text-charcoal/80 dark:text-dark-text/80 bg-cream dark:bg-dark-elevated border border-mist/30 dark:border-dark-border px-2.5 py-1 rounded-lg">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs font-medium text-charcoal/50 dark:text-dark-muted bg-white dark:bg-dark-surface border border-mist/30 dark:border-dark-border px-2 py-1 rounded-lg">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
          
          <div className="mt-5 pt-4 border-t border-mist/30 dark:border-dark-border flex items-center justify-between">
            <div>
              <span className="text-xs text-mocha dark:text-dark-muted font-semibold block uppercase tracking-wider mb-0.5">Starts from</span>
              <span className="text-xl font-bold text-coral">₹{property.pricing.monthlyRent}</span>
              <span className="text-sm text-charcoal/40 dark:text-dark-muted font-medium">/mo</span>
            </div>
            
            <div className="flex items-center text-sm font-medium text-charcoal dark:text-dark-text bg-white dark:bg-dark-surface border border-mist/40 dark:border-dark-border px-3 py-1.5 rounded-lg shadow-sm">
              <Navigation className="w-4 h-4 mr-1.5 text-coral" />
              {property.distanceFromCampus} km
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
