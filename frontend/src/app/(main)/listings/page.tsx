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
    <div className="flex-1 bg-warm-white dark:bg-dark-void py-8 relative transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-mist/30 dark:border-dark-border pb-6">
          <div>
            <h1 className="text-3xl font-heading font-extrabold text-charcoal dark:text-dark-text tracking-tight mb-2">Find Your Space</h1>
            <p className="text-charcoal/60 dark:text-dark-muted font-medium mt-2">
              {properties.length} properties available near campus
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-semibold text-mocha dark:text-dark-muted whitespace-nowrap uppercase tracking-wider">Sort by:</span>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-dark-surface border-mist dark:border-dark-border text-charcoal dark:text-dark-text shadow-sm dark:shadow-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-dark-surface border-mist dark:border-dark-border text-charcoal dark:text-dark-text">
                <SelectItem value="newest" className="hover:bg-coral/5 dark:hover:bg-coral/10 focus:bg-coral/5 dark:focus:bg-coral/10 cursor-pointer">Newest First</SelectItem>
                <SelectItem value="price_asc" className="hover:bg-coral/5 dark:hover:bg-coral/10 focus:bg-coral/5 dark:focus:bg-coral/10 cursor-pointer">Price: Low to High</SelectItem>
                <SelectItem value="price_desc" className="hover:bg-coral/5 dark:hover:bg-coral/10 focus:bg-coral/5 dark:focus:bg-coral/10 cursor-pointer">Price: High to Low</SelectItem>
                <SelectItem value="distance" className="hover:bg-coral/5 dark:hover:bg-coral/10 focus:bg-coral/5 dark:focus:bg-coral/10 cursor-pointer">Distance to Campus</SelectItem>
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
              <div className="bg-coral/10 dark:bg-coral/20 text-coral p-4 rounded-lg mb-6 border border-coral/20 dark:border-coral/30">
                {error}
              </div>
            )}
            
            <div className="mb-4 text-sm font-semibold text-mocha uppercase tracking-wider">
              Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'}
            </div>
            
            <PropertyGrid properties={properties} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
