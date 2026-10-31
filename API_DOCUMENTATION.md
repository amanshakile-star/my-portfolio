# API Documentation — Abdushekur Aman Portfolio

The backend API is a strongly typed RESTful service written in **Express.js** and **TypeScript**, using **Zod** for schema validation and **Prisma ORM** for PostgreSQL data access.

---

## Base URL
- **Local Development**: `http://localhost:5000/api`
- **Production**: `https://abdushekur-portfolio-api.onrender.com/api`

---

## Authentication
Protected administrative endpoints require an `Authorization` header containing a valid JSON Web Token (JWT):
```http
Authorization: Bearer <jwt_token>
```
Tokens are issued upon calling `POST /api/auth/login` and expire in 7 days by default.

---

## Public Endpoints

### 1. Health Check
`GET /api/health`
- **Description**: Verifies API operational status and database connection state.
- **Response `200 OK`**:
```json
{
  "status": "healthy",
  "timestamp": "2026-10-31T13:04:37.819Z",
  "database": "connected"
}
```

### 2. List Projects
`GET /api/projects`
- **Query Parameters**:
  - `category` *(string, optional)*: Filter by category slug (e.g. `web-development`).
  - `search` *(string, optional)*: Search across title, summary, description, and technologies.
  - `featured` *(boolean, optional)*: Set to `true` to return only featured projects.
- **Response `200 OK`**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "proj-1",
      "title": "Harmony Hotel",
      "slug": "harmony-hotel",
      "summary": "A premium digital hospitality web platform...",
      "status": "COMPLETED",
      "featured": true,
      "categoryName": "Web Development / Hospitality",
      "technologies": ["React", "TypeScript", "Vite", "Tailwind CSS"],
      "links": [
        { "label": "Live Demo", "url": "https://harmonyhotelhub.vercel.app/", "type": "DEMO" }
      ]
    }
  ]
}
```

### 3. Get Project Details
`GET /api/projects/:slug`
- **Response `200 OK`**: Full project object with architecture details, problem, solution, links, images, and technologies.
- **Response `404 Not Found`**: If the slug does not exist.

### 4. Submit Contact Message
`POST /api/contact`
- **Rate Limit**: Max 5 submissions per 15 minutes per IP address.
- **Request Body**:
```json
{
  "name": "Alex Mercer",
  "email": "alex@company.com",
  "subject": "Full-Stack Project Discussion",
  "message": "Hello Abdushekur, we would like to discuss an opportunity.",
  "honeypot": ""
}
```
- **Validation Rules**:
  - `name`: 2 to 100 characters, required.
  - `email`: valid email format, max 150 characters, required.
  - `subject`: 3 to 200 characters, required.
  - `message`: 10 to 5000 characters, required.
  - `honeypot`: Must remain empty. If filled, the request is rejected as automated spam.
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Thank you for your message! Abdushekur will review your message and respond promptly.",
  "data": {
    "id": "msg-12345",
    "createdAt": "2026-10-31T13:00:00.000Z"
  }
}
```

### 5. Get Portfolio Settings
`GET /api/settings`
- **Response `200 OK`**: Key-value pairs for portfolio owner information, bio, tagline, and verified social URLs.

### 6. Admin Login
`POST /api/auth/login`
- **Rate Limit**: Max 10 attempts per 15 minutes per IP address.
- **Request Body**:
```json
{
  "email": "admin@abdushekur.dev",
  "password": "AdminSecurePass2026!"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "admin-1",
      "email": "admin@abdushekur.dev",
      "name": "Abdushekur Aman",
      "role": "ADMIN"
    }
  }
}
```

---

## Protected Administrative Endpoints

Requires `Authorization: Bearer <token>` header.

### 1. Create New Project
`POST /api/projects`
- **Body**: Complete project object (title, slug, summary, description, categoryName, status, technologies array, links array).
- **Response `201 Created`**.

### 2. Update Project
`PUT /api/projects/:id`
- **Body**: Partial project updates.
- **Response `200 OK`**.

### 3. Delete Project
`DELETE /api/projects/:id`
- **Response `200 OK`**.

### 4. List All Contact Inquiries
`GET /api/messages`
- **Response `200 OK`**: All messages in descending order of creation date, including sender IP and `isRead` status.

### 5. Toggle Message Read Status
`PATCH /api/messages/:id/read`
- **Body**: `{ "isRead": true }`
- **Response `200 OK`**.

### 6. Delete Contact Message
`DELETE /api/messages/:id`
- **Response `200 OK`**.

### 7. Update Settings
`PUT /api/settings`
- **Body**: Key-value mapping of updated settings.
- **Response `200 OK`**.
