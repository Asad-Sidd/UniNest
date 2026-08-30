'use client';

import { useListings } from '@/hooks/useListings';
import { MapContainer } from '@/components/map/MapContainer';

export default function MapPage() {
  const { properties, loading, error } = useListings();

  return (
    <div className="flex-1 flex flex-col relative h-[calc(100vh-64px)]">
      {/* Overlay Filter Panel could be added here later */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg dark:shadow-none border border-mist/50 dark:border-dark-border">
        <h1 className="font-heading font-extrabold text-charcoal dark:text-dark-text text-lg">Property Map</h1>
        <p className="text-xs text-charcoal/60 dark:text-dark-muted">Find properties near Integral University</p>
      </div>

      <div className="flex-1 w-full bg-cream">
        <MapContainer properties={properties} />
      </div>
    </div>
  );
}
