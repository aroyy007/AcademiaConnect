import { Post } from '../models/Post.js';
import { User } from "../models/User.js";

export const postsController = {
  // Create a new post
  async create(req, res) {
    try {
      const { title, content, images } = req.body;
      console.log("create post : ", req.body)
      const post = await Post.create({
        title,
        userId: req.user._id,
        content,
        images
      });

      await post.populate('userId', 'name profileImage isVerified');

      res.status(201).json({
        success: true,
        data: post
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        messsage: "Internal Server Error!"
      })
    }
  },

  // Get all posts with pagination
  async getAll(req, res) {
    try {
      console.log(req.query)
      const { user_id } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const posts = await Post.find({ userId: user_id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name profileImage isVerified')
        .populate('comments.userId', 'name profileImage');

      const total = await Post.countDocuments({ deletedAt: null });

      res.json({
        success: true,
        posts,
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

  // // Like/Unlike a post
  // async toggleLike(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const userId = req.user.id;

  //     const post = await Post.findById(id);
  //     if (!post) {
  //       throw new AppError('Post not found', 404);
  //     }

  //     const liked = post.likes.includes(userId);
  //     if (liked) {
  //       post.likes = post.likes.filter(id => id.toString() !== userId);
  //     } else {
  //       post.likes.push(userId);
  //     }

  //     await post.save();

  //     res.json({
  //       status: 'success',
  //       data: {
  //         liked: !liked,
  //         likesCount: post.likes.length
  //       }
  //     });
  //   } catch (error) {
  //     logger.error('Error toggling like:', error);
  //     throw new AppError('Failed to update like status', 500);
  //   }
  // },

  // // Add a comment
  // async addComment(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { content } = req.body;
  //     const userId = req.user.id;

  //     const post = await Post.findById(id);
  //     if (!post) {
  //       throw new AppError('Post not found', 404);
  //     }

  //     post.comments.push({
  //       userId,
  //       content
  //     });

  //     await post.save();
  //     await post.populate('comments.userId', 'name profileImage');

  //     res.status(201).json({
  //       status: 'success',
  //       data: post.comments[post.comments.length - 1]
  //     });
  //   } catch (error) {
  //     logger.error('Error adding comment:', error);
  //     throw new AppError('Failed to add comment', 500);
  //   }
  // },

  // // Delete a post (soft delete)
  async delete(req, res) {
    try {
      const { post_id } = req.body;
      const userId = req.user._id;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid User Id"
        })
      }

      const post = await Post.findOne({ _id: post_id, userId });
      if (!post) {
        return res.status(400).json({
          success: false,
          message: "Post Not Found!"
        })
      }

      const deletedPost = await Post.findByIdAndDelete(post_id);

      if (!deletedPost) {
        return res.status(400).json({
          success: false,
          message: "Post Delete Failed"
        })
      }

      return res.json({
        success: true,
        message: 'Post deleted successfully'
      });
    } catch (error) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error!"
      })
    }
  }
};
