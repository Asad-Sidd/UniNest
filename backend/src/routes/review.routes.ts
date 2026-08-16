import express from 'express';
import { createReview, getPropertyReviews } from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/', protect, authorize('student'), createReview);
// The GET /api/properties/:id/reviews route is handled by mounting this differently or adding a specific route
// But to keep it modular: we can expose it here as well, but the path from app.ts will be /api/reviews
// Let's add the property review fetch to the property routes instead.

export default router;
