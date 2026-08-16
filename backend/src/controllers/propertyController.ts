import { Request, Response } from 'express';
import Property from '../models/Property';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all properties with filters
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { area, maxPrice, sharing, amenities, sort } = req.query;

    let query: any = {};

    if (area) query['address.area'] = area;
    if (maxPrice) query['pricing.monthlyRent'] = { $lte: Number(maxPrice) };
    if (sharing) query['pricing.sharingOptions.type'] = sharing;
    if (amenities) {
      const amenitiesList = (amenities as string).split(',');
      query.amenities = { $all: amenitiesList };
    }

    let mongooseQuery = Property.find(query);

    if (sort) {
      if (sort === 'price_asc') mongooseQuery = mongooseQuery.sort({ 'pricing.monthlyRent': 1 });
      if (sort === 'price_desc') mongooseQuery = mongooseQuery.sort({ 'pricing.monthlyRent': -1 });
      if (sort === 'distance') mongooseQuery = mongooseQuery.sort({ distanceFromCampus: 1 });
    } else {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }

    const properties = await mongooseQuery;

    res.json({ status: 'success', count: properties.length, data: properties });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id).populate('ownerId', 'name email phone');

    if (!property) {
      res.status(404).json({ status: 'error', message: 'Property not found' });
      return;
    }

    res.json({ status: 'success', data: property });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private (Owner/Admin)
export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // In a real app, distance would be calculated via Google Maps API here
    const distance = req.body.distanceFromCampus || Math.random() * 5 + 0.5; // Mock distance

    const property = new Property({
      ...req.body,
      ownerId: req.user._id,
      distanceFromCampus: distance,
    });

    const createdProperty = await property.save();
    res.status(201).json({ status: 'success', data: createdProperty });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
export const updateProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).json({ status: 'error', message: 'Property not found' });
      return;
    }

    // Ensure the user is the owner or an admin
    if (property.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403).json({ status: 'error', message: 'User not authorized to update this property' });
      return;
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ status: 'success', data: updatedProperty });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
export const deleteProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).json({ status: 'error', message: 'Property not found' });
      return;
    }

    if (property.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403).json({ status: 'error', message: 'User not authorized to delete this property' });
      return;
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ status: 'success', message: 'Property removed' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
