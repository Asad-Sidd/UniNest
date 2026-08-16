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
    <div className="bg-night-shadow p-6 rounded-sm border border-sand-shadow/30 shadow-sm space-y-6 sticky top-24">
      <div>
        <h3 className="font-heading font-semibold text-sand-tan text-lg mb-4 tracking-widest uppercase">Filters</h3>
      </div>
      
      <div className="space-y-3">
        <Label className="text-papyrus/80 uppercase text-xs tracking-wider">Area</Label>
        <div className="flex gap-2">
          {['Dasauli', 'Kursi Road'].map(opt => (
            <Button 
              key={opt}
              variant={area === opt ? 'default' : 'outline'}
              size="sm"
              onClick={() => setArea(area === opt ? '' : opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-papyrus/80 uppercase text-xs tracking-wider">Max Rent (₹)</Label>
        <Input 
          type="number" 
          placeholder="e.g. 8000" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')} 
        />
      </div>

      <div className="space-y-3">
        <Label className="text-papyrus/80 uppercase text-xs tracking-wider">Sharing Options</Label>
        <div className="flex flex-wrap gap-2">
          {['1-sharing', '2-sharing', '3-sharing'].map(opt => (
            <Button 
              key={opt}
              variant={sharing === opt ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSharing(sharing === opt ? '' : opt)}
            >
              {opt.replace('-sharing', ' Sharing')}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-papyrus/80 uppercase text-xs tracking-wider">Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {AMENITIES_LIST.map(amenity => (
            <Button 
              key={amenity}
              variant={selectedAmenities.includes(amenity) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleAmenityToggle(amenity)}
              className={selectedAmenities.includes(amenity) ? '' : 'text-papyrus/70'}
            >
              {amenity}
            </Button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-3 border-t border-sand-shadow/20">
        <Button onClick={applyFilters} className="flex-1">Apply</Button>
        <Button onClick={resetFilters} variant="outline" className="flex-1">Reset</Button>
      </div>
    </div>
  );
};
