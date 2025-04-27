const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Import JSON data store and modules
const dataStore = require('./data-store');
const auth = require('./auth');
const subscription = require('./subscription');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Expose node_modules/three for Three.js to work
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
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
    const products = await dataStore.products.getAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await dataStore.products.getById(req.params.id);
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
    const newProduct = await dataStore.products.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await dataStore.products.update(req.params.id, req.body);
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
    const deleted = await dataStore.products.delete(req.params.id);
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
    const users = await dataStore.users.getAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await dataStore.users.getByUsername(req.params.username);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
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
    const result = await auth.registerUser(req.body);
    if (result.success) {
      res.status(201).json(result.user);
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:username', async (req, res) => {
  try {
    const updatedUser = await dataStore.users.update(req.params.username, req.body);
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
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
    const deleted = await dataStore.users.delete(req.params.username);
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

// Subscription routes
app.get('/api/subscription/tiers', (req, res) => {
  const tiers = subscription.getSubscriptionTiers();
  res.json(tiers);
});

app.get('/api/subscription/user/:userId', async (req, res) => {
  try {
    const userSubscription = await subscription.getUserSubscription(req.params.userId);
    res.json(userSubscription);
  } catch (error) {
    console.error('Error getting subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription' });
  }
});

app.post('/api/subscription/update', async (req, res) => {
  try {
    const { userId, tier } = req.body;
    if (!userId || !tier) {
      return res.status(400).json({ error: 'User ID and tier are required' });
    }
    const updated = await subscription.updateUserSubscription(userId, tier);
    res.json(updated);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
});

// Fallback route to serve the single page application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server`);
});
