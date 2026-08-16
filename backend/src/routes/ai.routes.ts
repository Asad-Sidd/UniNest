import express from 'express';
import { searchWithAI } from '../controllers/aiController';

const router = express.Router();

router.post('/search', searchWithAI);

export default router;
