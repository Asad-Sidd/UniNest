import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/api-client';
import { Property } from '../types/listing';

interface UseListingsOptions {
  area?: string;
  maxPrice?: number;
  sharing?: string;
  amenities?: string;
  sort?: string;
}

export const useListings = (initialOptions?: UseListingsOptions) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async (options?: UseListingsOptions) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options?.area) params.append('area', options.area);
      if (options?.maxPrice) params.append('maxPrice', options.maxPrice.toString());
      if (options?.sharing) params.append('sharing', options.sharing);
      if (options?.amenities) params.append('amenities', options.amenities);
      if (options?.sort) params.append('sort', options.sort);

      const response = await apiClient.get(`/properties?${params.toString()}`);
      if (response.data.status === 'success') {
        setProperties(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(initialOptions);
  }, [fetchProperties]);

  return { properties, loading, error, fetchProperties };
};
