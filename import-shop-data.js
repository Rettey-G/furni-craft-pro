const { connectToDatabase, closeConnection } = require('./mongodb-connect');
const fs = require('fs');
const path = require('path');

// Parse the product data
function parseProductData(data) {
  const lines = data.split('\n').filter(line => line.trim() !== '');
  const products = [];

  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 7) {
      const product = {
        productId: parts[0].trim(),
        name: parts[1].trim(),
        relatedProduct: parts[2].trim(),
        description: parts[3].trim(),
        imageUrl: parts[4].trim().replace('/Home/Image/', 'https://sonee.com.mv/cdn/shop/products/'),
        price: parts[5].trim(),
        shippingCost: parts[6].trim(),
        stock: parseInt(parts[7].trim()) || 200,
        vendor: 'Sonee',
        category: 'hardware',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      products.push(product);
    }
  }

  return products;
}

// Import products to MongoDB
async function importProducts(products) {
  try {
    console.log('Connecting to MongoDB...');
    const { collections } = await connectToDatabase();
    
    console.log(`Importing ${products.length} products to MongoDB...`);
    
    // Create a new collection for shop products if it doesn't exist
    const shopCollection = collections.products;
    
    // Clear existing shop products
    await shopCollection.deleteMany({ vendor: 'Sonee' });
    
    // Insert new products
    if (products.length > 0) {
      const result = await shopCollection.insertMany(products);
      console.log(`Successfully imported ${result.insertedCount} products to MongoDB`);
    }
    
    console.log('Import completed successfully');
  } catch (error) {
    console.error('Error importing products:', error);
  } finally {
    await closeConnection();
  }
}

// Main function
async function main() {
  try {
    // Read the product data from a file
    const dataFilePath = path.join(__dirname, 'shop-data.txt');
    
    // Check if file exists, if not create it with sample data
    if (!fs.existsSync(dataFilePath)) {
      console.log('Data file not found. Please create shop-data.txt with your product data.');
      return;
    }
    
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const products = parseProductData(data);
    
    console.log(`Parsed ${products.length} products from data file`);
    
    // Import products to MongoDB
    await importProducts(products);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the main function
main();
