# Books Store Backend API

A professional RESTful API for a books store application built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based user authentication with role-based access control
- **Book Management**: Complete CRUD operations for books with advanced search and filtering
- **Category Management**: Hierarchical category system with parent-child relationships
- **Order Management**: Full order processing with status tracking
- **User Management**: Profile management, addresses, and wishlist functionality
- **Security**: Rate limiting, CORS, helmet security headers, input validation
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **validator** - Input validation

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:7000/books_store
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   JWT_EXPIRE=7d
   BCRYPT_SALT_ROUNDS=12
   ```

4. Make sure MongoDB is running on your system

5. Start the server:
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Books
- `GET /api/books` - Get all books (with pagination, filtering, sorting)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)
- `GET /api/books/featured` - Get featured books
- `GET /api/books/bestsellers` - Get bestseller books
- `GET /api/books/new-arrivals` - Get new arrival books

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/root` - Get root categories (no parent)
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Users
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist` - Add book to wishlist
- `DELETE /api/users/wishlist/:bookId` - Remove book from wishlist
- `POST /api/users/addresses` - Add address
- `PUT /api/users/addresses/:addressId` - Update address
- `DELETE /api/users/addresses/:addressId` - Delete address

## Query Parameters

### Books API
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `category` - Filter by category ID
- `author` - Filter by author name
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `format` - Filter by format (Hardcover, Paperback, Ebook, Audiobook)
- `search` - Search in title, author, description
- `sort` - Sort options (price, -price, createdAt, -createdAt, rating, -rating)

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes per IP)
- CORS configuration
- Helmet security headers
- Input validation and sanitization
- Role-based access control

## Database Schema

### User Model
- Personal information (name, email, phone)
- Authentication (password, role)
- Addresses (multiple addresses with default selection)
- Wishlist (book references)
- Account status and verification

### Book Model
- Basic info (title, author, ISBN, description)
- Pricing (price, original price, discount)
- Category relationships
- Inventory (stock, sold count)
- Reviews and ratings
- Metadata (format, pages, language, dimensions)

### Category Model
- Hierarchical structure (parent-child relationships)
- SEO-friendly slugs
- Book count tracking
- Sorting and display options

### Order Model
- Order items with pricing
- Shipping and billing addresses
- Payment information
- Order status tracking
- Order numbering system

## Development

The API follows RESTful conventions and includes:
- Proper HTTP status codes
- Consistent response formats
- Comprehensive error handling
- Input validation
- Security best practices
- Scalable architecture

## License

ISC
