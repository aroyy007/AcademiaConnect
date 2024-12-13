import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from './config/config.js';
import database from './config/database.js';
import { logger } from './config/logger';
import { errorHandler } from './middleware/error';

// Route imports
import authRoutes from './routes/auth';
import postsRoutes from './routes/posts';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.clientUrl,
    credentials: true
  }
});

// Connect to database
try {
  await database();
  logger.info('Database connected successfully');
} catch (error) {
  logger.error('Database connection failed:', error);
  process.exit(1);
}

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindow,
  max: config.rateLimitMax,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// Routes
app.use('/routes/auth', authRoutes);
app.use('/routes/posts', postsRoutes);

// Socket.io events
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('post:create', (postId) => {
    socket.broadcast.emit('post:created', postId);
  });

  socket.on('post:like', ({ postId, userId }) => {
    socket.broadcast.emit('post:liked', { postId, userId });
  });

  socket.on('post:comment', ({ postId, comment }) => {
    socket.broadcast.emit('post:commented', { postId, comment });
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling
app.use(errorHandler);

const PORT = config.port;
httpServer.listen(PORT, () => {
  logger.info(`Server running in ${config.env} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  httpServer.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  httpServer.close(() => process.exit(1));
});