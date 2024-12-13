import express from 'express';
import { body } from 'express-validator';
import { postsController } from '../controllers/posts';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Validation rules
const createPostValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content must be less than 1000 characters'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
    .custom((images) => {
      return images.every(url => /^https?:\/\/.+/.test(url));
    })
    .withMessage('Invalid image URL format')
];

const commentValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 500 })
    .withMessage('Comment must be less than 500 characters')
];

// Routes
router.post('/', validate(createPostValidation), postsController.create);
router.get('/', postsController.getAll);
router.get('/:id', postsController.getById);
router.put('/:id', validate(createPostValidation), postsController.update);
router.delete('/:id', postsController.delete);
router.post('/:id/like', postsController.toggleLike);
router.post('/:id/comments', validate(commentValidation), postsController.addComment);

export default router;