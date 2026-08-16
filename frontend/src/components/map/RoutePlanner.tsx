'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useMap } from '@/hooks/useMap';

interface RoutePlannerProps {
  destination: { lat: number; lng: number };
}

const CAMPUS_LOCATION = {
  lat: 26.9583,
  lng: 80.9363
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

export const RoutePlanner = ({ destination }: RoutePlannerProps) => {
  const { isLoaded, loadError, onLoad, onUnmount } = useMap();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: CAMPUS_LOCATION,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [isLoaded, destination]);

  if (loadError) return <div className="p-4 text-red-500 bg-red-50 h-full flex items-center justify-center">Error loading maps</div>;
  if (!isLoaded) return <div className="p-4 bg-gray-100 h-full flex items-center justify-center animate-pulse">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={CAMPUS_LOCATION}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#4f46e5',
              strokeWeight: 5,
            },
            suppressMarkers: false,
          }}
        />
      )}
    </GoogleMap>
  );
};
