import { Request, Response } from 'express';
import { parseUserQuery, executeSearch } from '../services/aiService';

// @desc    Natural language search
// @route   POST /api/ai/search
// @access  Public
export const searchWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({ status: 'error', message: 'Query is required' });
      return;
    }

    const { filter, explanation, isConversational } = await parseUserQuery(query);

    if (isConversational) {
      res.json({
        status: 'success',
        data: {
          explanation,
          results: [],
          aiResponse: explanation
        },
      });
      return;
    }

    const results = await executeSearch(filter);

    res.json({
      status: 'success',
      data: {
        explanation,
        results,
        aiResponse: `I found ${results.length} properties matching your criteria: ${explanation}`
      },
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
