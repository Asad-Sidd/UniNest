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
    if (a.includes('wifi')) return <Wifi className="w-5 h-5 text-blue-500" />;
    if (a.includes('food') || a.includes('meal')) return <Coffee className="w-5 h-5 text-orange-500" />;
    if (a.includes('ac') || a.includes('air')) return <Wind className="w-5 h-5 text-cyan-500" />;
    if (a.includes('gym')) return <Dumbbell className="w-5 h-5 text-gray-700" />;
    if (a.includes('security') || a.includes('guard')) return <Shield className="w-5 h-5 text-green-500" />;
    return <CheckCircle className="w-5 h-5 text-indigo-500" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Image Gallery */}
      <div className="w-full h-[50vh] relative bg-gray-900">
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
                <Badge className="bg-green-500/80 hover:bg-green-500 text-white backdrop-blur-md border-0 flex items-center gap-1 text-sm">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-200">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.address.street}, {property.address.area}, {property.address.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-start mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">About this property</h2>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>
                {reviews.length > 0 && (
                  <div className="flex flex-col items-center bg-blue-50 p-3 rounded-xl border border-blue-100 ml-6 shrink-0">
                    <div className="flex items-center text-blue-700 font-bold text-2xl">
                      <Star className="w-6 h-6 fill-blue-600 text-blue-600 mr-1" />
                      {avgOverall.toFixed(1)}
                    </div>
                    <span className="text-sm text-blue-600/80 font-medium mt-1">{reviews.length} reviews</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      {renderAmenityIcon(amenity)}
                      <span className="font-medium text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Sharing</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Monthly Rent (Starts)</span>
                  <span className="text-xl font-bold text-gray-900">₹{property.pricing.monthlyRent}</span>
                </div>
                <div className="p-4 rounded-xl border bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Security Deposit</span>
                  <span className="text-xl font-bold text-gray-900">₹{property.pricing.securityDeposit}</span>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-4 text-gray-900">Available Options</h3>
              <div className="space-y-3">
                {property.pricing.sharingOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border hover:border-blue-300 hover:shadow-sm transition-all bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {opt.type.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{opt.type}</div>
                        <div className="text-sm text-gray-500">Subject to availability</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">₹{opt.price}</div>
                      <div className="text-sm text-gray-500">per month</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                <Button variant="outline">Write a Review</Button>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                  No reviews yet. Be the first to review!
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="pb-6 border-b last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {review.studentId?.name?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{review.studentId?.name || 'Anonymous Student'}</div>
                            <div className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center bg-gray-100 px-2.py-1 rounded text-sm font-bold text-gray-700">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                          {review.ratings.overall}
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Owner</h3>
              
              {property.ownerId && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <User className="text-gray-500 w-5 h-5" />
                    <span className="font-medium text-gray-900">{property.ownerId.name || 'Property Manager'}</span>
                  </div>
                  {property.ownerId.phone && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <Phone className="text-blue-600 w-5 h-5" />
                      <a href={`tel:${property.ownerId.phone}`} className="font-semibold text-blue-700 hover:underline">
                        {property.ownerId.phone}
                      </a>
                    </div>
                  )}
                  {property.ownerId.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                      <Mail className="text-gray-500 w-5 h-5" />
                      <a href={`mailto:${property.ownerId.email}`} className="text-gray-700 hover:text-blue-600 transition-colors">
                        {property.ownerId.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200">
                Contact via WhatsApp
              </Button>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-indigo-600" />
                  Route from Campus
                </h3>
                <Badge variant="secondary" className="font-mono">{property.distanceFromCampus} km</Badge>
              </div>
              
              <div className="h-64 rounded-xl overflow-hidden border bg-gray-100">
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
