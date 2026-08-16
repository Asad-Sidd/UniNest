import { Request, Response } from 'express';
import Review from '../models/Review';
import Property from '../models/Property';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get reviews for a property
// @route   GET /api/properties/:id/reviews
// @access  Public
export const getPropertyReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ propertyId: req.params.id })
      .populate('studentId', 'name')
      .sort({ createdAt: -1 });

    res.json({ status: 'success', count: reviews.length, data: reviews });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (Student)
export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { propertyId, ratings, comment } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ status: 'error', message: 'Property not found' });
      return;
    }

    // Check if the student has already reviewed this property
    const alreadyReviewed = await Review.findOne({
      propertyId,
      studentId: req.user._id,
    });

    if (alreadyReviewed) {
      res.status(400).json({ status: 'error', message: 'You have already reviewed this property' });
      return;
    }

    const review = new Review({
      propertyId,
      studentId: req.user._id,
      ratings,
      comment,
    });

    const createdReview = await review.save();

    res.status(201).json({ status: 'success', data: createdReview });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
