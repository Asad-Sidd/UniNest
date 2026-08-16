'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useMap } from '@/hooks/useMap';
import { Property } from '@/types/listing';
import { PropertyCard } from '../listings/PropertyCard';

interface MapContainerProps {
  properties: Property[];
}

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)', // Adjust based on navbar height
};

const defaultCenter = {
  lat: 26.9583,
  lng: 80.9363, // Integral University Campus
};

export const MapContainer = ({ properties }: MapContainerProps) => {
  const { isLoaded, loadError, onLoad, onUnmount } = useMap();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  if (loadError) return <div className="p-4 text-red-500 bg-red-50 h-full flex items-center justify-center">Error loading maps</div>;
  if (!isLoaded) return <div className="p-4 bg-gray-100 h-full flex items-center justify-center animate-pulse">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {/* Campus Marker */}
      <Marker
        position={defaultCenter}
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        }}
        title="Integral University Campus"
      />

      {/* Property Markers */}
      {properties.map((property) => (
        <Marker
          key={property._id}
          position={property.address.coordinates}
          onClick={() => setSelectedProperty(property)}
          icon={{
            url: property.type === 'PG' 
              ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }}
        />
      ))}

      {/* Info Window when a marker is clicked */}
      {selectedProperty && (
        <InfoWindow
          position={selectedProperty.address.coordinates}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div className="w-64">
            <div className="font-bold text-lg mb-1">{selectedProperty.title}</div>
            <div className="text-sm text-gray-600 mb-2">{selectedProperty.address.area}</div>
            <div className="font-bold text-blue-600 mb-2">₹{selectedProperty.pricing.monthlyRent} / mo</div>
            <a 
              href={`/listings/${selectedProperty._id}`}
              className="block w-full text-center bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700 transition-colors"
            >
              View Details
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
