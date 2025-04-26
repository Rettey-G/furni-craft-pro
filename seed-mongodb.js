const { connectToDatabase, closeConnection } = require('./mongodb-connect');
const furnitureData = require('./database');

async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    // Connect to MongoDB
    const { db, collections } = await connectToDatabase();
    
    // Clear existing collections
    console.log('Clearing existing collections...');
    await collections.products.deleteMany({});
    
    // Prepare products from furniture data
    const products = [];
    
    // Process furniture data and convert to product format
    for (const category in furnitureData) {
      for (const itemType in furnitureData[category]) {
        for (const size in furnitureData[category][itemType]) {
          const furnitureItem = furnitureData[category][itemType][size];
          const dimensions = furnitureItem.dimensions || { width: 0, height: 0, depth: 0 };
          
          // Create a product for each furniture item
          const product = {
            category,
            type: itemType,
            size,
            name: `${size.charAt(0).toUpperCase() + size.slice(1)} ${itemType.replace('_', ' ')}`,
            dimensions,
            materials: furnitureItem.items || [],
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          products.push(product);
        }
      }
    }
    
    // Insert products into MongoDB
    if (products.length > 0) {
      console.log(`Inserting ${products.length} products...`);
      await collections.products.insertMany(products);
      console.log('Products inserted successfully');
    }
    
    // Create sample users
    const users = [
      {
        username: 'admin',
        password: 'admin123', // In production, this should be hashed
        email: 'admin@furnicraft.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        password: 'user123', // In production, this should be hashed
        email: 'user@example.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Clear and insert users
    await collections.users.deleteMany({});
    await collections.users.insertMany(users);
    console.log('Users inserted successfully');
    
    // Create sample orders
    const orders = [
      {
        userId: users[1].username, // user
        items: [
          { productName: "Small file cabinet", quantity: 1 },
          { productName: "Medium bookshelf", quantity: 2 }
        ],
        totalPrice: 2500,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Clear and insert orders
    await collections.orders.deleteMany({});
    await collections.orders.insertMany(orders);
    console.log('Orders inserted successfully');
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await closeConnection();
  }
}

// Run the seed function
seedDatabase();
