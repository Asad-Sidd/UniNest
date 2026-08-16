export interface SharingOption {
  type: string;
  price: number;
  _id?: string;
}

export interface Address {
  street: string;
  area: 'Dasauli' | 'Kursi Road' | 'Other';
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Pricing {
  monthlyRent: number;
  securityDeposit: number;
  sharingOptions: SharingOption[];
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  type: 'PG' | 'Hostel';
  address: Address;
  distanceFromCampus: number;
  pricing: Pricing;
  amenities: string[];
  images: string[];
  ownerId: any; // User object or string ID depending on populate
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}
