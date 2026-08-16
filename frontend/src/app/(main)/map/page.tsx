'use client';

import { useListings } from '@/hooks/useListings';
import { MapContainer } from '@/components/map/MapContainer';

export default function MapPage() {
  const { properties, loading, error } = useListings();

  return (
    <div className="flex-1 flex flex-col relative h-[calc(100vh-64px)]">
      {/* Overlay Filter Panel could be added here later */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-gray-200">
        <h1 className="font-bold text-gray-900">UniNest Map View</h1>
        <p className="text-sm text-gray-600">Showing {properties.length} properties near campus</p>
      </div>

      <div className="flex-1 w-full bg-gray-100">
        <MapContainer properties={properties} />
      </div>
    </div>
  );
}
