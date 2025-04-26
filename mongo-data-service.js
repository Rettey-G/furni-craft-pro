const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./mongodb-connect');

// Initialize database connection
let dbConnection = null;

async function getDbConnection() {
  if (!dbConnection) {
    dbConnection = await connectToDatabase();
  }
  return dbConnection;
}

// Product operations
const products = {
  getAll: async () => {
    const { collections } = await getDbConnection();
    return await collections.products.find({}).toArray();
  },
  
  getById: async (id) => {
    const { collections } = await getDbConnection();
    return await collections.products.findOne({ _id: new ObjectId(id) });
  },
  
  create: async (product) => {
    const { collections } = await getDbConnection();
    const result = await collections.products.insertOne(product);
    return { ...product, _id: result.insertedId };
  },
  
  update: async (id, updates) => {
    const { collections } = await getDbConnection();
    await collections.products.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return await collections.products.findOne({ _id: new ObjectId(id) });
  },
  
  delete: async (id) => {
    const { collections } = await getDbConnection();
    const result = await collections.products.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
};

// User operations
const users = {
  getAll: async () => {
    const { collections } = await getDbConnection();
    return await collections.users.find({}).toArray();
  },
  
  getByUsername: async (username) => {
    const { collections } = await getDbConnection();
    return await collections.users.findOne({ username });
  },
  
  create: async (user) => {
    const { collections } = await getDbConnection();
    const result = await collections.users.insertOne(user);
    return { ...user, _id: result.insertedId };
  },
  
  update: async (username, updates) => {
    const { collections } = await getDbConnection();
    await collections.users.updateOne(
      { username },
      { $set: updates }
    );
    return await collections.users.findOne({ username });
  },
  
  delete: async (username) => {
    const { collections } = await getDbConnection();
    const result = await collections.users.deleteOne({ username });
    return result.deletedCount === 1;
  }
};

// Order operations
const orders = {
  getAll: async () => {
    const { collections } = await getDbConnection();
    return await collections.orders.find({}).toArray();
  },
  
  getById: async (id) => {
    const { collections } = await getDbConnection();
    return await collections.orders.findOne({ _id: new ObjectId(id) });
  },
  
  getByUserId: async (userId) => {
    const { collections } = await getDbConnection();
    return await collections.orders.find({ userId }).toArray();
  },
  
  create: async (order) => {
    const { collections } = await getDbConnection();
    const result = await collections.orders.insertOne(order);
    return { ...order, _id: result.insertedId };
  },
  
  update: async (id, updates) => {
    const { collections } = await getDbConnection();
    await collections.orders.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return await collections.orders.findOne({ _id: new ObjectId(id) });
  },
  
  delete: async (id) => {
    const { collections } = await getDbConnection();
    const result = await collections.orders.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
};

module.exports = {
  products,
  users,
  orders
};
