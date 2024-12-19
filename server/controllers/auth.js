// controllers/auth.js
import { User } from '../models/User.js';
import { AppError } from '../middleware/error.js';
// import { logger } from '../config/logger.js';

export const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password, department, section, semester } = req.body;
      console.log(req.body)
      const user = await User.findOne({ email: email })

      if (user) {
        return res.status(400).json({
          success: false,
          message: "Email already used"
        })
      }


      const newUser = await User.create(req.body);
      const token = newUser.getSignedJwtToken();
      const _ = { ...newUser, password: null }

      return res.status(201).json({
        success: true,
        token,
        data: _
      });
    } catch (error) {
      // logger.error('Registration error:', error);
      // next(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and Password Fields are required!"
        })
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not exists!"
        })
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Password wrong!"
        })
      }

      const token = user.getSignedJwtToken();

      return res.json({
        success: true,
        token,
        data: {...user?._doc, password : null}
      });
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }
};
