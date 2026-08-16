import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Property from '../models/Property';
import Review from '../models/Review';
import connectDB from '../config/database';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@uninest.com',
    password: 'password123',
    role: 'admin',
    phone: '9876543210',
  },
  {
    name: 'Owner One',
    email: 'owner1@uninest.com',
    password: 'password123',
    role: 'owner',
    phone: '9876543211',
  },
  {
    name: 'Owner Two',
    email: 'owner2@uninest.com',
    password: 'password123',
    role: 'owner',
    phone: '9876543212',
  },
  {
    name: 'Student One',
    email: 'student1@uninest.com',
    password: 'password123',
    role: 'student',
    phone: '9876543213',
  },
];

const properties = [
  {
    title: 'Sunrise Boys Hostel',
    description: 'A comfortable hostel for boys with all modern amenities.',
    type: 'Hostel',
    address: {
      street: '123 Dasauli Main Road',
      area: 'Dasauli',
      city: 'Lucknow',
      coordinates: { lat: 26.9601, lng: 80.9351 },
    },
    distanceFromCampus: 1.2,
    pricing: {
      monthlyRent: 5000,
      securityDeposit: 5000,
      sharingOptions: [
        { type: '1-sharing', price: 7000 },
        { type: '2-sharing', price: 5000 },
        { type: '3-sharing', price: 4000 },
      ],
    },
    amenities: ['WiFi', 'Food', 'Laundry', 'PowerBackup', 'WaterCooler'],
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'],
    verificationStatus: 'verified',
    isAvailable: true,
  },
  {
    title: 'Cozy Girls PG',
    description: 'Safe and secure PG for girls near Kursi Road.',
    type: 'PG',
    address: {
      street: '45 Kursi Road Avenue',
      area: 'Kursi Road',
      city: 'Lucknow',
      coordinates: { lat: 26.9555, lng: 80.9400 },
    },
    distanceFromCampus: 2.5,
    pricing: {
      monthlyRent: 6000,
      securityDeposit: 6000,
      sharingOptions: [
        { type: '1-sharing', price: 8000 },
        { type: '2-sharing', price: 6000 },
      ],
    },
    amenities: ['WiFi', 'AC', 'Food', 'SecurityGuard', 'PowerBackup'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'],
    verificationStatus: 'verified',
    isAvailable: true,
  },
  {
    title: 'Elite Boys PG',
    description: 'Premium PG accommodation for boys with AC rooms.',
    type: 'PG',
    address: {
      street: '78 Dasauli Link Road',
      area: 'Dasauli',
      city: 'Lucknow',
      coordinates: { lat: 26.9620, lng: 80.9320 },
    },
    distanceFromCampus: 0.8,
    pricing: {
      monthlyRent: 8000,
      securityDeposit: 8000,
      sharingOptions: [
        { type: '1-sharing', price: 10000 },
        { type: '2-sharing', price: 8000 },
      ],
    },
    amenities: ['WiFi', 'AC', 'Food', 'Gym', 'Laundry'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1e5250ce07?auto=format&fit=crop&q=80&w=800'],
    verificationStatus: 'verified',
    isAvailable: true,
  },
  {
    title: 'Comfort Girls Hostel',
    description: 'Affordable girls hostel with basic amenities.',
    type: 'Hostel',
    address: {
      street: '90 Kursi Road Ext',
      area: 'Kursi Road',
      city: 'Lucknow',
      coordinates: { lat: 26.9510, lng: 80.9420 },
    },
    distanceFromCampus: 3.5,
    pricing: {
      monthlyRent: 4000,
      securityDeposit: 4000,
      sharingOptions: [
        { type: '2-sharing', price: 5000 },
        { type: '4-sharing', price: 4000 },
      ],
    },
    amenities: ['WiFi', 'Food', 'WaterCooler'],
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'],
    verificationStatus: 'verified',
    isAvailable: true,
  },
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Property.deleteMany();
    await Review.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);

    const owner1 = createdUsers[1]._id;
    const owner2 = createdUsers[2]._id;
    const student1 = createdUsers[3]._id;

    const sampleProperties = properties.map((property, index) => {
      return {
        ...property,
        ownerId: index % 2 === 0 ? owner1 : owner2,
      };
    });

    const createdProperties = await Property.insertMany(sampleProperties);

    const sampleReviews = [
      {
        propertyId: createdProperties[0]._id,
        studentId: student1,
        ratings: {
          landlordBehavior: 4,
          hygiene: 5,
          safety: 4,
          overall: 4.5,
        },
        comment: 'Great place to stay, very near to campus and food is good.',
      },
      {
        propertyId: createdProperties[1]._id,
        studentId: student1,
        ratings: {
          landlordBehavior: 5,
          hygiene: 4,
          safety: 5,
          overall: 4.8,
        },
        comment: 'Very safe and clean PG.',
      },
    ];

    await Review.insertMany(sampleReviews);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Property.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
