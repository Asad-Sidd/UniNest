import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController';
import { getPropertyReviews } from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(protect, authorize('owner', 'admin'), createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(protect, authorize('owner', 'admin'), updateProperty)
  .delete(protect, authorize('owner', 'admin'), deleteProperty);

router.route('/:id/reviews')
  .get(getPropertyReviews);

export default router;
