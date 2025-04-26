// MongoDB Connection Configuration
const MONGODB_URI = "mongodb+srv://Rettey:Adhu1447@cluster0.hriuovn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "furnicraft";
const COLLECTIONS = {
  PRODUCTS: "products",
  USERS: "users",
  ORDERS: "orders"
};

// Export the configuration
module.exports = {
  MONGODB_URI,
  DB_NAME,
  COLLECTIONS
};
