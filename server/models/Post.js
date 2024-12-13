import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    trim: true,
    maxlength: [1000, 'Content cannot be more than 1000 characters']
  },
  images: [{
    type: String,
    validate: {
      validator: function(url) {
        return /^https?:\/\/.+/.test(url);
      },
      message: 'Invalid image URL format'
    }
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  editHistory: [{
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  deletedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for metrics
postSchema.virtual('metrics').get(function() {
  return {
    likes: this.likes.length,
    reactions: [],
    comments: this.comments.length,
    shares: 0
  };
});

// Indexes
postSchema.index({ userId: 1, createdAt: -1 });
postSchema.index({ content: 'text' });
postSchema.index({ deletedAt: 1 });

export const Post = mongoose.model('Post', postSchema);