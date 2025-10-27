# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This project demonstrates seamless integration between front-end and back-end components, featuring user authentication, CRUD operations, image uploads, and commenting functionality.

## 🚀 Features

### Core Features

- ✅ **User Authentication & Authorization**

  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Protected routes for authenticated users
  - Role-based access control (user/admin)

- ✅ **Blog Post Management**

  - Create, read, update, and delete blog posts
  - Rich text content with excerpts
  - Featured image uploads
  - Post categorization and tagging
  - Draft and publish functionality
  - View count tracking

- ✅ **Category Management**

  - Admin-only category creation
  - Category filtering
  - Post count per category

- ✅ **Comments System**

  - Authenticated users can comment on posts
  - Real-time comment display
  - User avatars in comments

- ✅ **Search & Filter**

  - Search posts by title, content, or tags
  - Filter posts by category
  - Pagination for large datasets

- ✅ **Responsive Design**
  - Mobile-friendly interface
  - Clean and modern UI
  - Smooth animations and transitions

## 📂 Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── Layout.css
│   │   │   ├── PostCard.jsx
│   │   │   └── PostCard.css
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── PostDetail.jsx
│   │   │   ├── PostDetail.css
│   │   │   ├── PostForm.jsx
│   │   │   ├── PostForm.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Auth.css
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── usePosts.js
│   │   │   └── useCategories.js
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── context/        # React context providers
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   ├── package.json        # Client dependencies
│   └── .env.example        # Environment variables template
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   │   └── database.js
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── categoryController.js
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Category.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── categories.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── validation.js
│   │   └── upload.js
│   ├── uploads/            # Uploaded files directory
│   ├── server.js           # Main server file
│   ├── package.json        # Server dependencies
│   └── .env.example        # Environment variables template
└── README.md               # Project documentation
```

## 🛠️ Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **Context API** - State management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mern-stack-integration-RockieRaheem
```

### 2. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/mern-blog
# JWT_SECRET=your_jwt_secret_key_here

# Start the server
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Client Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your API URL
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The client will run on `http://localhost:3000`

### 4. Create Initial Admin User and Categories

After starting the server, you can create an admin user using MongoDB Compass or mongo shell:

```javascript
// Create admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // Use bcrypt to hash a password
  role: "admin",
  avatar: "default-avatar.png",
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Or register through the app and manually update the role to 'admin'
```

To create categories, login as admin and use the API endpoints or create them directly in MongoDB.

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Post Endpoints

#### Get All Posts

```http
GET /api/posts?page=1&limit=10&category=<categoryId>
```

#### Get Single Post

```http
GET /api/posts/:id
```

#### Create Post (Protected)

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Brief description",
  "category": "<categoryId>",
  "tags": ["tag1", "tag2"],
  "featuredImage": <file>,
  "isPublished": true
}
```

#### Update Post (Protected)

```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Post (Protected)

```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment (Protected)

```http
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Comment text"
}
```

#### Search Posts

```http
GET /api/posts/search?q=<query>
```

### Category Endpoints

#### Get All Categories

```http
GET /api/categories
```

#### Get Single Category

```http
GET /api/categories/:id
```

#### Create Category (Admin Only)

```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology",
  "description": "Tech related posts"
}
```

#### Update Category (Admin Only)

```http
PUT /api/categories/:id
Authorization: Bearer <token>
```

#### Delete Category (Admin Only)

```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

## 🎨 Features Showcase

### 1. User Authentication

- Secure registration and login system
- JWT token-based authentication
- Password encryption with bcrypt
- Protected routes for authenticated users

### 2. Blog Post Management

- Full CRUD operations for blog posts
- Rich text editor for content creation
- Image upload for featured images
- Draft and publish functionality
- Real-time view count tracking

### 3. Comments System

- Authenticated users can add comments
- Display user information with comments
- Real-time comment updates

### 4. Search & Filter

- Search posts by title, content, or tags
- Filter posts by categories
- Pagination for better performance

### 5. Responsive Design

- Mobile-first responsive design
- Clean and intuitive user interface
- Smooth animations and transitions

## 📸 Screenshot

### Home Page
<img width="1317" height="848" alt="Image" src="https://github.com/user-attachments/assets/ccda2245-ec00-420a-b883-a19f42bea758" />
## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration works correctly
- [ ] User login works correctly
- [ ] Create new post works
- [ ] Edit post works
- [ ] Delete post works
- [ ] Add comment works
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Pagination works
- [ ] Image upload works
- [ ] Protected routes redirect to login
- [ ] Responsive design works on mobile

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Error handling middleware
- File upload validation (size and type)

## 🚧 Known Issues & Future Improvements

### Planned Features

- [ ] Rich text editor (WYSIWYG)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile pages
- [ ] Like/favorite posts
- [ ] Social media sharing
- [ ] Comment replies (nested comments)
- [ ] Admin dashboard
- [ ] Analytics and statistics
- [ ] SEO optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Your Name**

- GitHub: [@RockieRaheem](https://github.com/RockieRaheem)

## 🙏 Acknowledgments

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

---

**Note**: This project was created as part of the MERN Stack Integration Assignment for Week 4.
