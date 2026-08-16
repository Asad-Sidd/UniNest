import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IReview extends Document {
  propertyId: Types.ObjectId;
  studentId: Types.ObjectId;
  ratings: {
    landlordBehavior: number;
    hygiene: number;
    safety: number;
    overall: number;
  };
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: {
      landlordBehavior: { type: Number, required: true, min: 1, max: 5 },
      hygiene: { type: Number, required: true, min: 1, max: 5 },
      safety: { type: Number, required: true, min: 1, max: 5 },
      overall: { type: Number, required: true, min: 1, max: 5 },
    },
    comment: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

// A student can only review a property once
reviewSchema.index({ propertyId: 1, studentId: 1 }, { unique: true });

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
