const { AppError } = require('../middleware/error.js');
const { logger } = require('../config/db.js');
const { Post } = require('../models/Post.js');

const postsController = {
  // Create a new post
  async create(req, res) {
    try {
      const { content, images } = req.body;
      const post = await Post.create({
        userId: req.user.id,
        content,
        images
      });

      await post.populate('userId', 'name profileImage isVerified');
      
      res.status(201).json({
        status: 'success',
        data: post
      });
    } catch (error) {
      logger.error('Error creating post:', error);
      throw new AppError('Failed to create post', 500);
    }
  },

  // Get all posts with pagination
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const posts = await Post.find({ deletedAt: null })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name profileImage isVerified')
        .populate('comments.userId', 'name profileImage');

      const total = await Post.countDocuments({ deletedAt: null });

      res.json({
        status: 'success',
        data: posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      logger.error('Error fetching posts:', error);
      throw new AppError('Failed to fetch posts', 500);
    }
  },

  // Like/Unlike a post
  async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findById(id);
      if (!post) {
        throw new AppError('Post not found', 404);
      }

      const liked = post.likes.includes(userId);
      if (liked) {
        post.likes = post.likes.filter(id => id.toString() !== userId);
      } else {
        post.likes.push(userId);
      }

      await post.save();

      res.json({
        status: 'success',
        data: {
          liked: !liked,
          likesCount: post.likes.length
        }
      });
    } catch (error) {
      logger.error('Error toggling like:', error);
      throw new AppError('Failed to update like status', 500);
    }
  },

  // Add a comment
  async addComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      const post = await Post.findById(id);
      if (!post) {
        throw new AppError('Post not found', 404);
      }

      post.comments.push({
        userId,
        content
      });

      await post.save();
      await post.populate('comments.userId', 'name profileImage');

      res.status(201).json({
        status: 'success',
        data: post.comments[post.comments.length - 1]
      });
    } catch (error) {
      logger.error('Error adding comment:', error);
      throw new AppError('Failed to add comment', 500);
    }
  },

  // Delete a post (soft delete)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findOne({ _id: id, userId });
      if (!post) {
        throw new AppError('Post not found or unauthorized', 404);
      }

      post.deletedAt = new Date();
      await post.save();

      res.json({
        status: 'success',
        message: 'Post deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting post:', error);
      throw new AppError('Failed to delete post', 500);
    }
  }
};

module.exports = { postsController };