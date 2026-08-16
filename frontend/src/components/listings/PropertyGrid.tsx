import { Property } from '@/types/listing';
import { PropertyCard } from './PropertyCard';
import { Home } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
}

export const PropertyGrid = ({ properties, loading }: PropertyGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-96 rounded-xl bg-gray-200 animate-pulse border border-gray-100"></div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-night-shadow rounded-sm border border-dashed border-sand-shadow/30">
        <div className="w-16 h-16 bg-night-blue rounded-sm flex items-center justify-center mb-4 text-sand-tan">
          <Home className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-heading font-bold text-papyrus mb-2 tracking-widest uppercase">No sanctuaries found</h3>
        <p className="text-papyrus/60 max-w-sm">
          We couldn&apos;t find any properties matching your current filters. Try consulting the oracle with different parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};
