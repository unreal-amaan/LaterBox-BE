# LaterBox Backend API

🌐 **Live Application**:    [LaterBox](https://laterbox-fe.netlify.app) | 
                            [Frontend Repository](https://github.com/unreal-amaan/LaterBox-FE)

## 📋 Overview

LaterBox Backend is a robust Node.js API built with TypeScript, Express, and Prisma that powers a modern link management and bookmarking platform. It provides secure authentication, category management, and link organization features with a clean, RESTful API design.

## ✨ Key Features

- **🔐 Secure Authentication**: Google OAuth 2.0 integration with JWT tokens
- **📁 Category Management**: Create, organize, and share link categories
- **🔗 Link Management**: Save, categorize, and tag important links
- **👥 Public Sharing**: Share categories publicly with unique share links
- **🛡️ Ownership Verification**: Secure middleware ensuring users can only access their own data
- **🔄 Token Refresh**: Automatic access token refresh for seamless user experience

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with Google OAuth 2.0
- **Security**: JWT tokens, CORS, HTTP-only cookies
- **Validation**: Zod for request validation

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Google OAuth 2.0 credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/unreal-amaan/LaterBox-BE.git
   cd LaterBox-BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
    ```env
   DATABASE_URL=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   ACCESS_TOKEN_EXPIRESIN=
   REFRESH_TOKEN_EXPIRESIN=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GOOGLE_CALLBACK_URL="http://localhost:3000/api/auth/google/callback"
   PORT=3000
   DOMAIN="localhost"
   CLIENT_ADDRESS="http://localhost:5173"
   NODE_ENV="development"
    ```

4. **Database Setup**

   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   ```

5. **Start the server**

   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/signin` | Initiate Google OAuth login |
| GET | `/api/auth/google/callback` | Handle OAuth callback |
| POST | `/api/auth/refreshtoken` | Refresh access token |
| POST | `/api/auth/signout` | Logout user |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/category/add` | Create new category | ✅ |
| GET | `/api/category/get` | Get user's categories | ✅ |
| PUT | `/api/category/update/:id` | Update category | ✅ |
| DELETE | `/api/category/delete/:id` | Delete category | ✅ |
| GET | `/api/category/public/:id` | Get public category | ❌ |

### Link Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/link/add` | Add new link | ✅ |
| GET | `/api/link/get/:id` | Get links by category | ✅ |
| PUT | `/api/link/update/:id` | Update link | ✅ |
| DELETE | `/api/link/delete/:id` | Delete link | ✅ |

### Request/Response Examples

#### Create Category
```json
POST /api/category/add
{
  "title": "Web Development",
  "description": "Useful web dev resources",
  "isPinned": false,
  "isPublic": true
}
```

#### Add Link
```json
POST /api/link/add
{
  "title": "React Documentation",
  "link": "https://react.dev",
  "note": "Official React docs",
  "tags": ["react", "documentation"],
  "categoryId": "category_id_here"
}
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/          # OAuth configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication & validation
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   └── validation/     # Zod schemas
├── prisma/             # Database schema & migrations
├── dist/              # Compiled JavaScript
└── package.json
```

## 👨‍💻 Author

**Syed Amaanuddin**
- GitHub: [@unreal-amaan](https://github.com/unreal-amaan)
- Project: [LaterBox](https://laterbox-fe.netlify.app)

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/unreal-amaan/LaterBox-BE/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

⭐ **Star this repository if you found it helpful!**