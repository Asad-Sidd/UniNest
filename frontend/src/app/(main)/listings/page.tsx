'use client';

import { useState } from 'react';
import { useListings } from '@/hooks/useListings';
import { PropertyGrid } from '@/components/listings/PropertyGrid';
import { FilterPanel } from '@/components/listings/FilterPanel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ListingsPage() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('');
  
  const { properties, loading, error, fetchProperties } = useListings({ ...filters, sort });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    fetchProperties({ ...newFilters, sort });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    fetchProperties({ ...filters, sort: value });
  };

  return (
    <div className="flex-1 bg-desert-dark py-8 relative">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-sand-shadow/20 pb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-sand-tan tracking-widest uppercase">Explore Properties</h1>
            <p className="text-papyrus/70 mt-2">Find your perfect stay near Integral University</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-medium text-papyrus/60 whitespace-nowrap uppercase tracking-wider">Sort by:</span>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] bg-night-shadow border-sand-shadow/30 text-papyrus">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>
              <SelectContent className="bg-night-shadow border-sand-shadow/30 text-papyrus">
                <SelectItem value="newest" className="hover:bg-night-blue focus:bg-night-blue">Newest First</SelectItem>
                <SelectItem value="price_asc" className="hover:bg-night-blue focus:bg-night-blue">Price: Low to High</SelectItem>
                <SelectItem value="price_desc" className="hover:bg-night-blue focus:bg-night-blue">Price: High to Low</SelectItem>
                <SelectItem value="distance" className="hover:bg-night-blue focus:bg-night-blue">Distance to Campus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {error && (
              <div className="bg-red-900/20 text-red-400 p-4 rounded-sm mb-6 border border-red-900/50">
                {error}
              </div>
            )}
            
            <div className="mb-4 text-sm font-medium text-sand-tan/80 uppercase tracking-wider">
              Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'}
            </div>
            
            <PropertyGrid properties={properties} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
