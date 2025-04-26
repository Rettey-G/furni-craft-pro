const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Import MongoDB connection and data service
const { connectToDatabase, closeConnection } = require('./mongodb-connect');
const dataService = require('./mongo-data-service');
const auth = require('./auth');
const subscription = require('./subscription');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'furnicraft-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Authentication routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await auth.authenticateUser(username, password);
  if (result.success) {
    req.session.user = result.user;
    res.json({ success: true, user: result.user });
  } else {
    res.status(401).json({ success: false, message: result.message });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await dataService.products.getAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await dataService.products.getById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = await dataService.products.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await dataService.products.update(req.params.id, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await dataService.products.delete(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// User routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await dataService.users.getAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await dataService.users.getByUsername(req.params.username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = await dataService.users.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:username', async (req, res) => {
  try {
    const updatedUser = await dataService.users.update(req.params.username, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:username', async (req, res) => {
  try {
    const deleted = await dataService.users.delete(req.params.username);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Order routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await dataService.orders.getAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await dataService.orders.getById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.get('/api/users/:userId/orders', async (req, res) => {
  try {
    const orders = await dataService.orders.getByUserId(req.params.userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = await dataService.orders.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await dataService.orders.update(req.params.id, req.body);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const deleted = await dataService.orders.delete(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Database connection and server startup
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
      console.log(`Press Ctrl+C to stop the server`);
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      await closeConnection();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('Shutting down server...');
      await closeConnection();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
