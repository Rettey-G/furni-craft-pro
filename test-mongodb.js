const { connectToDatabase, closeConnection } = require('./mongodb-connect');

async function testMongoDBConnection() {
  try {
    console.log('Testing MongoDB connection...');
    const { db } = await connectToDatabase();
    console.log('Successfully connected to MongoDB!');
    console.log(`Connected to database: ${db.databaseName}`);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    await closeConnection();
    console.log('Connection closed successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

testMongoDBConnection();
