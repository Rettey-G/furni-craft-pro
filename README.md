# FurniCraft Pro

FurniCraft Pro is a comprehensive furniture design and calculation web application that helps users plan room layouts, calculate materials needed, and visualize furniture in 3D.

## Features

- Room planning and layout design
- Materials calculation with images
- Enhanced 3D visualization of furniture
- 2D to 3D conversion with drag and drop functionality
- Shop page with items from Maldivian vendors (Sonee, Veligaa, Alia Hardware)
- Cost estimation in Maldivian Rufiya (MVR)
- Project management

## Deployment Guide

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- GitHub account
- Netlify account
- Render account

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Add your IP address to the IP whitelist
5. Get your MongoDB connection string

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string
4. Seed the database: `npm run seed`
5. Start the server: `npm run dev`
6. Open `http://localhost:3001` in your browser

### GitHub Deployment

1. Create a new GitHub repository
2. Initialize Git in your local project: `git init`
3. Add all files: `git add .`
4. Commit changes: `git commit -m "Initial commit"`
5. Add remote repository: `git remote add origin https://github.com/yourusername/furnicraft-pro.git`
6. Push to GitHub: `git push -u origin main`

### Render Dashboard Setup

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the following settings:
   - Name: `furnicraft-pro-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables from your `.env` file
5. Click "Create Web Service"

### Netlify Deployment

1. Create a Netlify account at https://netlify.com
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: leave empty (or use `echo 'No build command needed'`)
   - Publish directory: `.`
5. Add environment variables if needed
6. Click "Deploy site"
7. Configure custom domain if desired

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `GET /api/users` - Get all users
- `GET /api/users/:username` - Get user by username
- `POST /api/users` - Create a new user
- `PUT /api/users/:username` - Update a user
- `DELETE /api/users/:username` - Delete a user
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/users/:userId/orders` - Get orders by user ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

## License

This project is licensed under the MIT License.