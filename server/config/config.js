import dotenv from 'dotenv';
import path from 'path';

// Load env vars based on NODE_ENV
dotenv.config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`)
});

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100 // 100 requests per window
};

export default config;
