// routes/auth.js
import express from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/auth.js'; // Import using ES Module syntax
import { validate } from '../middleware/validate.js';

const router = express.Router();

const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please add a valid email')
    .matches(/^[\w-]+(\.[\w-]+)*@eastdelta\.edu\.bd$/)
    .withMessage('Please use your EDU email'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('department').notEmpty().withMessage('Please add a department'),
  body('semester')
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1 and 8'),
  body('section').notEmpty().withMessage('Please add a section')
];

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', authController.login);


export default router; // Export using ES Module syntax
