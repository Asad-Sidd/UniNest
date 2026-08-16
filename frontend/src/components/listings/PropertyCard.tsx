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
      <Card className="overflow-hidden hover:shadow-[0_0_20px_rgba(225,179,130,0.15)] transition-all duration-300 border-sand-shadow/30 bg-desert-dark group h-full flex flex-col cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden bg-night-shadow">
          <Image 
            src={property.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'} 
            alt={property.title} 
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-night-shadow/80 border border-sand-shadow/30 text-sand-tan shadow-sm backdrop-blur-sm font-semibold uppercase tracking-wider text-[10px]">
              {property.type}
            </Badge>
            {property.verificationStatus === 'verified' && (
              <Badge className="bg-night-blue/90 border border-star-gold text-star-gold shadow-sm backdrop-blur-sm uppercase tracking-wider text-[10px]">
                Verified
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col flex-1 bg-desert-dark">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-bold text-lg text-sand-tan line-clamp-1 group-hover:text-papyrus transition-colors uppercase tracking-widest text-sm">
              {property.title}
            </h3>
            <div className="flex items-center bg-night-blue border border-star-gold/30 px-2 py-1 rounded text-sm font-medium text-star-gold">
              <Star className="w-3.5 h-3.5 fill-star-gold text-star-gold mr-1" />
              {avgRating.toFixed(1)}
            </div>
          </div>
          
          <div className="flex items-center text-papyrus/70 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.address.street}, {property.address.area}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-auto">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[10px] font-medium text-papyrus bg-night-blue/50 border border-sand-shadow/20 px-2.5 py-1 rounded-sm uppercase tracking-wider">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[10px] font-medium text-papyrus/60 bg-night-shadow/50 border border-sand-shadow/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
          
          <div className="mt-5 pt-4 border-t border-sand-shadow/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-papyrus/50 block uppercase tracking-wider">Starts from</span>
              <span className="text-xl font-heading font-bold text-sand-tan">₹{property.pricing.monthlyRent}</span>
              <span className="text-sm text-papyrus/50">/mo</span>
            </div>
            
            <div className="flex items-center text-sm font-medium text-papyrus bg-night-blue border border-sand-shadow/30 px-3 py-1.5 rounded-sm">
              <Navigation className="w-4 h-4 mr-1.5 text-sand-tan" />
              {property.distanceFromCampus} km
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
