import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  type: 'PG' | 'Hostel';
  address: {
    street: string;
    area: 'Dasauli' | 'Kursi Road' | 'Other';
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  distanceFromCampus: number;
  pricing: {
    monthlyRent: number;
    securityDeposit: number;
    sharingOptions: {
      type: string;
      price: number;
    }[];
  };
  amenities: string[];
  images: string[];
  ownerId: Types.ObjectId;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['PG', 'Hostel'], required: true },
    address: {
      street: { type: String, required: true },
      area: { type: String, enum: ['Dasauli', 'Kursi Road', 'Other'], required: true },
      city: { type: String, default: 'Lucknow' },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    distanceFromCampus: { type: Number, required: true },
    pricing: {
      monthlyRent: { type: Number, required: true },
      securityDeposit: { type: Number, required: true },
      sharingOptions: [
        {
          type: { type: String, required: true }, // '1-sharing', '2-sharing', etc.
          price: { type: Number, required: true },
        },
      ],
    },
    amenities: [{ type: String }],
    images: [{ type: String }],
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
propertySchema.index({ 'address.area': 1 });
propertySchema.index({ verificationStatus: 1 });
propertySchema.index({ 'pricing.monthlyRent': 1 });
propertySchema.index({ type: 1 });

const Property = mongoose.model<IProperty>('Property', propertySchema);

export default Property;
