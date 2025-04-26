const fs = require('fs');
const path = require('path');

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SUBSCRIPTIONS_FILE = path.join(DATA_DIR, 'subscriptions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Initialize data files if they don't exist
function initializeDataFiles() {
  const defaultData = {
    products: [],
    users: [],
    subscriptions: []
  };

  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(defaultData.products, null, 2));
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultData.users, null, 2));
  }
  if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(defaultData.subscriptions, null, 2));
  }
}

// Read data from a file
function readData(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Write data to a file
function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
}

// Product operations
const products = {
  getAll: () => readData(PRODUCTS_FILE),
  getById: (id) => {
    const products = readData(PRODUCTS_FILE);
    return products.find(p => p.id === id);
  },
  create: (product) => {
    const products = readData(PRODUCTS_FILE);
    products.push(product);
    writeData(PRODUCTS_FILE, products);
    return product;
  },
  update: (id, updates) => {
    const products = readData(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      writeData(PRODUCTS_FILE, products);
      return products[index];
    }
    return null;
  },
  delete: (id) => {
    const products = readData(PRODUCTS_FILE);
    const filteredProducts = products.filter(p => p.id !== id);
    writeData(PRODUCTS_FILE, filteredProducts);
    return filteredProducts.length !== products.length;
  }
};

// User operations
const users = {
  getAll: () => readData(USERS_FILE),
  getByUsername: (username) => {
    const users = readData(USERS_FILE);
    return users.find(u => u.username === username);
  },
  create: (user) => {
    const users = readData(USERS_FILE);
    users.push(user);
    writeData(USERS_FILE, users);
    return user;
  },
  update: (username, updates) => {
    const users = readData(USERS_FILE);
    const index = users.findIndex(u => u.username === username);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      writeData(USERS_FILE, users);
      return users[index];
    }
    return null;
  },
  delete: (username) => {
    const users = readData(USERS_FILE);
    const filteredUsers = users.filter(u => u.username !== username);
    writeData(USERS_FILE, filteredUsers);
    return filteredUsers.length !== users.length;
  }
};

// Subscription operations
const subscriptions = {
  getAll: () => readData(SUBSCRIPTIONS_FILE),
  getByUserId: (userId) => {
    const subscriptions = readData(SUBSCRIPTIONS_FILE);
    return subscriptions.find(s => s.userId === userId);
  },
  create: (subscription) => {
    const subscriptions = readData(SUBSCRIPTIONS_FILE);
    subscriptions.push(subscription);
    writeData(SUBSCRIPTIONS_FILE, subscriptions);
    return subscription;
  },
  update: (userId, updates) => {
    const subscriptions = readData(SUBSCRIPTIONS_FILE);
    const index = subscriptions.findIndex(s => s.userId === userId);
    if (index !== -1) {
      subscriptions[index] = { ...subscriptions[index], ...updates };
      writeData(SUBSCRIPTIONS_FILE, subscriptions);
      return subscriptions[index];
    }
    return null;
  },
  delete: (userId) => {
    const subscriptions = readData(SUBSCRIPTIONS_FILE);
    const filteredSubscriptions = subscriptions.filter(s => s.userId !== userId);
    writeData(SUBSCRIPTIONS_FILE, filteredSubscriptions);
    return filteredSubscriptions.length !== subscriptions.length;
  }
};

// Initialize data files
initializeDataFiles();

module.exports = {
  products,
  users,
  subscriptions
}; 