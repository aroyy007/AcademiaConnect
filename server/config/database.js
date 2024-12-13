import mongoose from 'mongoose';
import config from './config.js';
import { logger } from './logger.js';

const database = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Add event listeners for connection issues
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    throw error;
  }
};

export default database;
