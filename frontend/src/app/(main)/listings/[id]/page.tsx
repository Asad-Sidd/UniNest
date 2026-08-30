'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import apiClient from '@/lib/api-client';
import { Property } from '@/types/listing';
import { Review } from '@/types/review';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Phone, Mail, User, Star, CheckCircle, Wifi, Coffee, Wind, Dumbbell, Shield } from 'lucide-react';
import { RoutePlanner } from '@/components/map/RoutePlanner';

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const [propRes, reviewRes] = await Promise.all([
          apiClient.get(`/properties/${propertyId}`),
          apiClient.get(`/properties/${propertyId}/reviews`)
        ]);
        
        if (propRes.data.status === 'success') {
          setProperty(propRes.data.data);
        }
        
        if (reviewRes.data.status === 'success') {
          setReviews(reviewRes.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (error || !property) {
    return <div className="container mx-auto py-20 text-center text-red-600 bg-red-50 rounded-xl my-10 border border-red-100">{error || 'Property not found'}</div>;
  }

  const avgOverall = reviews.length 
    ? reviews.reduce((acc, rev) => acc + rev.ratings.overall, 0) / reviews.length 
    : 0;

  const renderAmenityIcon = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a.includes('wifi')) return <Wifi className="w-5 h-5 text-coral" />;
    if (a.includes('food') || a.includes('meal')) return <Coffee className="w-5 h-5 text-coral" />;
    if (a.includes('ac') || a.includes('air')) return <Wind className="w-5 h-5 text-coral" />;
    if (a.includes('gym')) return <Dumbbell className="w-5 h-5 text-coral" />;
    if (a.includes('security') || a.includes('guard')) return <Shield className="w-5 h-5 text-coral" />;
    return <CheckCircle className="w-5 h-5 text-sage" />;
  };

  return (
    <div className="bg-warm-white dark:bg-dark-void min-h-screen pb-20 transition-colors duration-300">
      {/* Image Gallery */}
      <div className="w-full h-[50vh] relative bg-charcoal dark:bg-dark-surface">
        <Image 
          src={property.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2000'} 
          alt={property.title}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-0 text-sm">
                {property.type}
              </Badge>
              {property.verificationStatus === 'verified' && (
                <Badge variant="success" className="backdrop-blur-md flex items-center gap-1 text-sm border-0">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-2">{property.title}</h1>
            <div className="flex items-center text-white/80">
              <MapPin className="w-5 h-5 mr-2 text-coral" />
              <span className="text-lg">{property.address.street}, {property.address.area}, {property.address.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-sm dark:shadow-none border border-mist/40 dark:border-dark-border">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text tracking-tight mb-2">{property.title}</h1>
                  <p className="text-charcoal/60 dark:text-dark-muted leading-relaxed">{property.description}</p>
                </div>
                {reviews.length > 0 && (
                  <div className="flex flex-col items-center bg-coral/5 dark:bg-coral/20 p-3 rounded-xl border border-coral/20 dark:border-coral/30 ml-0 md:ml-6 shrink-0">
                    <div className="flex items-center text-coral font-bold text-2xl">
                      <Star className="w-6 h-6 fill-coral text-coral mr-1" />
                      {avgOverall.toFixed(1)}
                    </div>
                    <span className="text-sm text-coral font-medium mt-1">{reviews.length} reviews</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-4 text-charcoal dark:text-dark-text">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-mist/30 dark:border-dark-border bg-cream/50 dark:bg-dark-elevated/50 hover:bg-cream dark:hover:bg-dark-elevated transition-colors">
                      {renderAmenityIcon(amenity)}
                      <span className="font-medium text-charcoal/80 dark:text-dark-text">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-sm dark:shadow-none border border-mist/40 dark:border-dark-border">
              <h3 className="text-xl font-heading font-bold text-charcoal dark:text-dark-text mb-6">Location & Distance</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-mist/30 dark:border-dark-border bg-cream dark:bg-dark-elevated flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-coral" />
                    <span className="font-semibold text-charcoal dark:text-dark-text">To Campus</span>
                  </div>
                  <span className="font-bold text-charcoal dark:text-dark-text">{property.distanceFromCampus} km</span>
                </div>
                <div className="p-4 rounded-xl border border-mist/30 dark:border-dark-border bg-cream dark:bg-dark-elevated flex items-center justify-between">
                  <span className="text-charcoal/60 dark:text-dark-muted font-medium">Security Deposit</span>
                  <span className="text-xl font-bold text-charcoal dark:text-dark-text">₹{property.pricing.securityDeposit}</span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-lg mb-4 text-charcoal dark:text-dark-text">Available Options</h3>
              <div className="space-y-3">
                {property.pricing.sharingOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-mist/40 dark:border-dark-border hover:border-coral/40 dark:hover:border-coral/40 hover:shadow-sm dark:hover:shadow-black/20 hover:shadow-mocha/5 transition-all bg-white dark:bg-dark-surface">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-coral/10 dark:bg-coral/20 flex items-center justify-center text-coral font-bold">
                        {opt.type.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal dark:text-dark-text">{opt.type}</p>
                        <p className="text-xs text-charcoal/50 dark:text-dark-muted">Subject to availability</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-coral text-lg">₹{opt.price}</p>
                      <p className="text-xs text-charcoal/50 dark:text-dark-muted">/month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-sm dark:shadow-none border border-mist/40 dark:border-dark-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-bold text-charcoal dark:text-dark-text">Student Reviews</h3>
                <Button variant="outline" className="rounded-lg">Write a Review</Button>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-8 text-charcoal/50 dark:text-dark-muted bg-cream dark:bg-dark-elevated rounded-xl border border-mist/50 dark:border-dark-border border-dashed">
                  No reviews yet. Be the first to review!
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="pb-6 border-b border-mist/30 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-mocha/10 dark:bg-mocha/30 flex items-center justify-center text-mocha dark:text-dark-text font-bold">
                            {review.studentId?.name?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <div className="font-semibold text-charcoal dark:text-dark-text">{review.studentId?.name || 'Anonymous Student'}</div>
                            <div className="text-xs text-charcoal/50 dark:text-dark-muted">{new Date(review.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center bg-coral/5 dark:bg-coral/20 px-2 py-1 rounded text-sm font-bold text-coral border border-coral/20 dark:border-coral/30">
                          <Star className="w-3.5 h-3.5 fill-coral text-coral mr-1" />
                          {review.ratings.overall}
                        </div>
                      </div>
                      <p className="text-charcoal/70 dark:text-dark-muted text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-sm dark:shadow-none border border-mist/40 dark:border-dark-border sticky top-24">
              <h3 className="text-xl font-heading font-bold text-charcoal dark:text-dark-text mb-6">Contact Owner</h3>
              
              {property.ownerId && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-cream dark:bg-dark-elevated rounded-xl border border-mist/30 dark:border-dark-border">
                    <User className="text-coral w-5 h-5" />
                    <span className="font-medium text-charcoal/80 dark:text-dark-text">{property.ownerId.name || 'Property Manager'}</span>
                  </div>
                  {property.ownerId.phone && (
                    <div className="flex items-center gap-3 p-3 bg-cream dark:bg-dark-elevated rounded-xl border border-mist/30 dark:border-dark-border">
                      <Phone className="text-coral w-5 h-5" />
                      <a href={`tel:${property.ownerId.phone}`} className="font-semibold text-charcoal dark:text-dark-text hover:text-coral hover:underline">
                        {property.ownerId.phone}
                      </a>
                    </div>
                  )}
                  {property.ownerId.email && (
                    <div className="flex items-center gap-3 p-3 bg-cream dark:bg-dark-elevated rounded-xl border border-mist/30 dark:border-dark-border">
                      <Mail className="text-coral w-5 h-5" />
                      <a href={`mailto:${property.ownerId.email}`} className="text-charcoal/70 dark:text-dark-muted hover:text-coral transition-colors">
                        {property.ownerId.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              <Button className="w-full bg-coral hover:bg-coral-soft text-white shadow-sm h-12 rounded-xl text-base">
                Contact via WhatsApp
              </Button>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-mist/40 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-charcoal flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-coral" />
                  Route from Campus
                </h3>
                <Badge variant="outline" className="font-mono">{property.distanceFromCampus} km</Badge>
              </div>
              
              <div className="h-64 rounded-xl overflow-hidden border border-mist/30 dark:border-dark-border bg-cream dark:bg-dark-elevated">
                <RoutePlanner 
                  destination={{ lat: property.address.coordinates.lat, lng: property.address.coordinates.lng }} 
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
