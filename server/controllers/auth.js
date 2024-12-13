// controllers/auth.js
import { User } from '../models/User.js';
import { AppError } from '../middleware/error.js';
import { logger } from '../config/logger.js';

export const authController = {
  async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      const token = user.getSignedJwtToken();

      res.status(201).json({
        success: true,
        token,
        data: user
      });
    } catch (error) {
      logger.error('Registration error:', error);
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
      }

      const token = user.getSignedJwtToken();
      res.json({
        success: true,
        token,
        data: user
      });
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }
};
