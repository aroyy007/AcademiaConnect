# AcademiaConnect

AcademiaConnect is a university social media platform designed specifically for East Delta University (EDU). This platform facilitates communication and collaboration among EDU students while providing university-specific features such as semester-based routine management and notifications.

## 🎯 Features

### General Features:
- **Sign Up and Login**: Users can sign up using their EDU email ending with `@eastdelta.edu.bd`. Admin approval is required for account activation.
- **Posting**: Users can post updates, images, or messages visible to other approved users.
- **Friend Requests**: Users can send friend requests to connect with others on the platform.

### Specialized Features:
- **Routine Page**: Displays class routines based on the user’s semester and section.
- **Notifications**: A dedicated page for receiving updates and notifications related to university events and activities.

## 🛠️ Technology Stack

### Frontend:
- **React**: For building dynamic and interactive user interfaces.
- **TypeScript**: Ensures type safety and reduces runtime errors.
- **Vite**: Used as the frontend build tool for faster development.

### Backend:
- **Express.js**: A Node.js web application framework for handling server-side logic.
- **MongoDB**: A NoSQL database for efficient data storage and retrieval.

## Project Structure

The project is organized into the following main directories:

### Server:
- **Config**: Configuration files for environment variables and database connections.
- **Controllers**: Contains logic for handling requests and responses.
- **Middleware**: Custom middleware for tasks like authentication and validation.
- **Models**: Database schemas for MongoDB collections.
- **Routes**: API endpoints for interacting with the frontend.

### Src:
- **Components**: Reusable React components.
- **Lib**: Utility functions and libraries.
- **Pages**: Main application pages (e.g., Home, Notifications, Routine).
- **Store**: State management files.
- **Styles**: CSS and styling configurations.
- **Types**: TypeScript type definitions.

## 📂 Project Structure

```
AcademiaConnect/
├── server/                 # Backend server
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── src/                   # Frontend client
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components
│   ├── store/           # State management
│   ├── styles/          # CSS/SCSS files
│   └── App.tsx          # Root component
└── README.md
```

## 🔒 Security

- Email verification required for signup
- Admin approval system for new accounts
- JWT-based authentication
- Protected API endpoints

## 📥 Installation and Setup

Follow the steps below to set up the project locally:

### Prerequisites:
- Node.js (LTS version recommended)
- MongoDB (installed locally or use a cloud service like MongoDB Atlas)
- Git

### Clone the Repository:
- HTTPS: `https://github.com/aroyy007/AcademiaConnect.git`
- SSH: `git@github.com:aroyy007/AcademiaConnect.git`
- GitHub CLI: `gh repo clone aroyy007/AcademiaConnect`

### Install Dependencies:
Navigate to the project directory and install dependencies for both the frontend and backend:
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Navigate to src directory
cd ../src

# Install frontend dependencies
npm install
```

### Set Up Environment Variables:
Create a `.env` file in the `server` directory and include the following variables:
```
MONGO_URI=<your-mongodb-uri>
PORT=<backend-server-port>
JWT_SECRET=<your-jwt-secret>
```

### Run the Application:
Start both the backend and frontend servers:
```bash
# Start backend
cd server
npm start

# Start frontend
cd ../src
npm run dev
```

### Access the Application:
- Frontend: Open your browser and navigate to `http://localhost:3000` (or the port configured by Vite).
- Backend: Ensure the backend is running on the specified port in your `.env` file.

## 🤝 Contributing

Contributions are welcome! Follow the standard Git workflow:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your message here'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🌟 Show your support

Give a ⭐️ if this project helped you!

---

Thank you for using AcademiaConnect! Let’s make university life more connected and collaborative.

