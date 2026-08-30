'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FilterPanelProps {
  onFilterChange: (filters: {
    area?: string;
    maxPrice?: number;
    sharing?: string;
    amenities?: string;
  }) => void;
}

const AMENITIES_LIST = ['WiFi', 'AC', 'Food', 'Laundry', 'PowerBackup', 'Gym'];

export const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [area, setArea] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sharing, setSharing] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const applyFilters = () => {
    onFilterChange({
      ...(area && { area }),
      ...(maxPrice && { maxPrice: Number(maxPrice) }),
      ...(sharing && { sharing }),
      ...(selectedAmenities.length > 0 && { amenities: selectedAmenities.join(',') }),
    });
  };

  const resetFilters = () => {
    setArea('');
    setMaxPrice('');
    setSharing('');
    setSelectedAmenities([]);
    onFilterChange({});
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-mist/30 dark:border-dark-border shadow-sm dark:shadow-none space-y-6 sticky top-24">
      <div>
        <h3 className="font-heading font-bold text-charcoal dark:text-dark-text text-lg mb-4 tracking-tight">Filters</h3>
      </div>
      
      <div className="space-y-3">
        <Label className="text-mocha dark:text-dark-muted uppercase text-xs tracking-wider font-semibold">Area</Label>
        <div className="flex gap-2">
          {['Dasauli', 'Kursi Road'].map(opt => (
            <Button 
              key={opt}
              variant={area === opt ? 'default' : 'outline'}
              size="sm"
              onClick={() => setArea(area === opt ? '' : opt)}
              className={area !== opt ? 'text-charcoal/80 dark:text-dark-text/80' : ''}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-mocha dark:text-dark-muted uppercase text-xs tracking-wider font-semibold">Max Rent (₹)</Label>
        <Input 
          type="number" 
          placeholder="e.g. 8000" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')} 
        />
      </div>

      <div className="space-y-3">
        <Label className="text-mocha dark:text-dark-muted uppercase text-xs tracking-wider font-semibold">Sharing Options</Label>
        <div className="flex flex-wrap gap-2">
          {['1-sharing', '2-sharing', '3-sharing'].map(opt => (
            <Button 
              key={opt}
              variant={sharing === opt ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSharing(sharing === opt ? '' : opt)}
              className={sharing !== opt ? 'text-charcoal/80 dark:text-dark-text/80' : ''}
            >
              {opt.replace('-sharing', ' Sharing')}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-mocha dark:text-dark-muted uppercase text-xs tracking-wider font-semibold">Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {AMENITIES_LIST.map(amenity => (
            <Button 
              key={amenity}
              variant={selectedAmenities.includes(amenity) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleAmenityToggle(amenity)}
              className={!selectedAmenities.includes(amenity) ? 'text-charcoal/80 dark:text-dark-text/80' : ''}
            >
              {amenity}
            </Button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-3 border-t border-mist/30 dark:border-dark-border">
        <Button onClick={applyFilters} className="flex-1 shadow-sm">Apply</Button>
        <Button onClick={resetFilters} variant="ghost" className="flex-1 text-coral hover:text-coral-soft">Reset</Button>
      </div>
    </div>
  );
};
