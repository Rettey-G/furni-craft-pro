const { MongoClient } = require('mongodb');
const dbConfig = require('./db-config');

// Connection URL
const url = dbConfig.MONGODB_URI;
const dbName = dbConfig.DB_NAME;

// Create a new MongoClient
const client = new MongoClient(url);

// Connection function
async function connectToDatabase() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    
    // Get the database
    const db = client.db(dbName);
    
    return {
      client,
      db,
      collections: {
        products: db.collection(dbConfig.COLLECTIONS.PRODUCTS),
        users: db.collection(dbConfig.COLLECTIONS.USERS),
        orders: db.collection(dbConfig.COLLECTIONS.ORDERS)
      }
    };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Close connection function
async function closeConnection() {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

module.exports = {
  connectToDatabase,
  closeConnection
};
