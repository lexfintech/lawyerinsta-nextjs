import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local',
  );
}

export async function connectDb(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully!');
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
