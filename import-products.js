// Import products to MongoDB
const { connectToDatabase, closeConnection } = require('./mongodb-connect');
const config = require('./db-config');

// Parse the product data from the images
// Ensure each product has all 3 Maldivian vendors
const products = [
  // ECO-DOOR Products
  {
    id: "eco-door-fg-1pl-white",
    name: "ECO-DOOR FIBER GLASS DOOR 1PL WHITE",
    description: "High-quality fiber glass door with 1 panel design, ideal for tropical climate",
    category: "doors",
    image: "https://veligaa.com/wp-content/uploads/2023/01/eco-door-fg-1pl.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 3996.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 4150.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 4200.00, logo: "alia-logo" }
    ]
  },
  {
    id: "eco-door-fg-6p-white",
    name: "ECO-DOOR FIBER GLASS DOOR 6P WHITE",
    description: "Premium fiber glass door with 6 panel design, suitable for exterior use",
    category: "doors",
    image: "https://veligaa.com/wp-content/uploads/2023/01/eco-door-fg-6p.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 4100.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 4250.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 4300.00, logo: "alia-logo" }
    ]
  },
  {
    id: "eco-door-wpc-door-4vh",
    name: "ECO-DOOR WPC DOOR 4VH",
    description: "Wood Plastic Composite door with 4 vertical panels, weather resistant",
    category: "doors",
    image: "https://veligaa.com/wp-content/uploads/2023/01/eco-door-wpc-4vh.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 3200.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 3350.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 3400.00, logo: "alia-logo" }
    ]
  },
  {
    id: "eco-door-wpc-door-5vh",
    name: "ECO-DOOR WPC DOOR 5VH",
    description: "Wood Plastic Composite door with 5 vertical panels, durable and moisture resistant",
    category: "doors",
    image: "https://veligaa.com/wp-content/uploads/2023/01/eco-door-wpc-5vh.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 3300.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 3450.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 3500.00, logo: "alia-logo" }
    ]
  },
  
  // SELLEYS Products
  {
    id: "selleys-no-more-cracks",
    name: "SELLEYS NO MORE CRACKS EXTERIOR POWDER 500G",
    description: "Exterior crack filler powder for durable repairs, weather resistant",
    category: "fillers",
    image: "https://veligaa.com/wp-content/uploads/2023/02/selleys-no-more-cracks.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 129.60, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 135.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 140.00, logo: "alia-logo" }
    ]
  },
  {
    id: "selleys-white-for-life-grout-sealer-125ml",
    name: "SELLEYS WHITE FOR LIFE GROUT SEALER SPRAY 125ML",
    description: "Grout sealer spray that keeps grout looking white and clean",
    category: "sealers",
    image: "https://veligaa.com/wp-content/uploads/2023/02/selleys-grout-sealer.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 140.40, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 145.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 150.00, logo: "alia-logo" }
    ]
  },
  {
    id: "selleys-white-for-life-grout-sealer-250ml",
    name: "SELLEYS WHITE FOR LIFE GROUT SEALER SPRAY 250ML",
    description: "Larger size grout sealer spray for bigger projects",
    category: "sealers",
    image: "https://veligaa.com/wp-content/uploads/2023/02/selleys-grout-sealer-250.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 378.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 390.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 395.00, logo: "alia-logo" }
    ]
  },
  {
    id: "selleys-white-for-life-rtu-grout-1-4kg",
    name: "SELLEYS WHITE FOR LIFE RTU GROUT 1.4KG",
    description: "Ready-to-use white grout for tile installations",
    category: "grout",
    image: "https://veligaa.com/wp-content/uploads/2023/02/selleys-rtu-grout.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 129.60, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 135.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 140.00, logo: "alia-logo" }
    ]
  },
  {
    id: "selleys-wood-putty-500g",
    name: "SELLEYS WOOD PUTTY 500G",
    description: "Wood filler putty for repairing cracks and holes in wooden surfaces",
    category: "fillers",
    image: "https://veligaa.com/wp-content/uploads/2023/02/selleys-wood-putty.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 54.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 60.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 65.00, logo: "alia-logo" }
    ]
  },
  
  // HOY Hardware Products
  {
    id: "hoy-magnetic-door-stopper",
    name: "HOY MAGNETIC DOOR STOPPER MAGNETIC SS RB961-DS002",
    description: "Stainless steel magnetic door stopper, prevents door damage",
    category: "hardware",
    image: "https://veligaa.com/wp-content/uploads/2023/03/hoy-door-stopper.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 102.60, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 110.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 115.00, logo: "alia-logo" }
    ]
  },
  {
    id: "hoy-hinges-bearing-2pcs",
    name: "HOY HINGES BEARING (1X2 PCS)",
    description: "High-quality bearing hinges for smooth door operation, pack of 2",
    category: "hardware",
    image: "https://veligaa.com/wp-content/uploads/2023/03/hoy-hinges.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 113.40, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 120.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 125.00, logo: "alia-logo" }
    ]
  },
  {
    id: "hoy-hinges-bearing-4x3-2-5mm",
    name: "HOY HINGES BEARING 4\" X 3\" X 2.5MM (1X2 PCS)",
    description: "Heavy-duty bearing hinges for doors, 4\" x 3\" size",
    category: "hardware",
    image: "https://veligaa.com/wp-content/uploads/2023/03/hoy-hinges-4x3.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 102.60, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 110.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 115.00, logo: "alia-logo" }
    ]
  },
  
  // Additional Products
  {
    id: "amig-pad-lock-brass-no-2",
    name: "AMIG PAD LOCK BRASS NO.2",
    description: "Brass padlock for secure locking, size No.2",
    category: "locks",
    image: "https://veligaa.com/wp-content/uploads/2023/03/amig-padlock.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 120.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 125.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 130.00, logo: "alia-logo" }
    ]
  },
  {
    id: "amig-close-bar-bracket-brass",
    name: "AMIG CLOSE BAR BRACKET BRASS 15-12",
    description: "Brass bracket for close bars, size 15-12",
    category: "hardware",
    image: "https://veligaa.com/wp-content/uploads/2023/03/amig-bracket.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 129.60, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 135.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 140.00, logo: "alia-logo" }
    ]
  },
  {
    id: "round-bar-no-04",
    name: "ROUND BAR NO.04",
    description: "Metal round bar for construction and DIY projects",
    category: "construction",
    image: "https://veligaa.com/wp-content/uploads/2023/03/round-bar.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 85.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 90.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 95.00, logo: "alia-logo" }
    ]
  },
  {
    id: "polycarbonate-connector",
    name: "POLYCARBONATE CONNECTOR",
    description: "Connector for polycarbonate sheets and panels",
    category: "construction",
    image: "https://veligaa.com/wp-content/uploads/2023/03/polycarbonate-connector.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 45.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 50.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 55.00, logo: "alia-logo" }
    ]
  },
  {
    id: "crocodile-turbo-glue",
    name: "CROCODILE TURBO GLUE 60GM",
    description: "Fast-setting adhesive for various materials",
    category: "adhesives",
    image: "https://veligaa.com/wp-content/uploads/2023/03/crocodile-glue.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 129.60, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 135.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 140.00, logo: "alia-logo" }
    ]
  },
  {
    id: "v-tech-wood-putty",
    name: "V TECH WOOD PUTTY 500G",
    description: "Wood putty for filling holes and cracks in wooden surfaces",
    category: "fillers",
    image: "https://veligaa.com/wp-content/uploads/2023/03/vtech-putty.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 54.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 60.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 65.00, logo: "alia-logo" }
    ]
  },
  {
    id: "crocodile-flex-shield",
    name: "CROCODILE FLEX SHIELD WATER PROOFING 2KG",
    description: "Waterproofing compound for protecting surfaces from water damage",
    category: "waterproofing",
    image: "https://veligaa.com/wp-content/uploads/2023/03/crocodile-waterproofing.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 54.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 60.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 65.00, logo: "alia-logo" }
    ]
  },
  {
    id: "conduit-female-adaptor",
    name: "CONDUIT FEMALE ADAPTOR",
    description: "Female adaptor for electrical conduit connections",
    category: "electrical",
    image: "https://veligaa.com/wp-content/uploads/2023/03/conduit-adaptor.jpg",
    vendors: [
      { name: "Veligaa Hardware", price: 54.00, logo: "veligaa-logo" },
      { name: "Sonee Hardware", price: 60.00, logo: "sonee-logo" },
      { name: "Alia Hardware", price: 65.00, logo: "alia-logo" }
    ]
  }
];

// Function to ensure all products have the three Maldivian vendors
function ensureThreeVendors(productsArray) {
  const maldivianVendors = [
    { name: "Veligaa Hardware", logo: "veligaa-logo" },
    { name: "Sonee Hardware", logo: "sonee-logo" },
    { name: "Alia Hardware", logo: "alia-logo" }
  ];

  return productsArray.map(product => {
    // Get existing vendor names
    const existingVendorNames = product.vendors.map(v => v.name);
    
    // Find missing vendors
    const missingVendors = maldivianVendors.filter(v => !existingVendorNames.includes(v.name));
    
    // If there are missing vendors, add them with slightly higher prices
    if (missingVendors.length > 0) {
      // Find the average price of existing vendors
      const avgPrice = product.vendors.reduce((sum, v) => sum + v.price, 0) / product.vendors.length;
      
      // Add missing vendors with slightly different prices
      missingVendors.forEach(vendor => {
        // Add a random variation to the price (5-15% higher)
        const priceVariation = 1 + (Math.random() * 0.1 + 0.05);
        product.vendors.push({
          name: vendor.name,
          price: Math.round(avgPrice * priceVariation * 100) / 100, // Round to 2 decimal places
          logo: vendor.logo
        });
      });
    }
    
    return product;
  });
}

// Function to import products to MongoDB
async function importProducts() {
  try {
    console.log('Connecting to MongoDB...');
    const { db, client, collections } = await connectToDatabase();
    
    // Get the products collection
    const productsCollection = collections.products;
    
    // Check if products already exist
    const existingProducts = await productsCollection.countDocuments();
    if (existingProducts > 0) {
      console.log(`${existingProducts} products already exist in the database.`);
      console.log('Deleting existing products with vendor Veligaa and Alia...');
      await productsCollection.deleteMany({ vendor: { $in: ['Veligaa Hardware', 'Alia Hardware'] } });
    }
    
    // Ensure all products have three Maldivian vendors
    const productsWithThreeVendors = ensureThreeVendors(products);
    
    // Insert products
    const result = await productsCollection.insertMany(productsWithThreeVendors);
    console.log(`${result.insertedCount} products imported successfully.`);
    
    // Close the connection
    await closeConnection();
  } catch (error) {
    console.error('Error importing products:', error);
    await closeConnection();
  }
}

// Create user schema
const users = [
  {
    username: "admin",
    password: "admin123", // In a real application, this would be hashed
    email: "admin@furnicraft.com",
    role: "admin",
    name: "Admin User",
    createdAt: new Date()
  },
  {
    username: "customer",
    password: "customer123", // In a real application, this would be hashed
    email: "customer@example.com",
    role: "customer",
    name: "Regular Customer",
    createdAt: new Date()
  }
];

// Function to import users to MongoDB
async function importUsers() {
  try {
    console.log('Connecting to MongoDB for users import...');
    const { db, client, collections } = await connectToDatabase();
    
    // Get the users collection
    const usersCollection = collections.users;
    
    // Check if users already exist
    const existingUsers = await usersCollection.countDocuments();
    if (existingUsers > 0) {
      console.log(`${existingUsers} users already exist in the database.`);
      // We'll keep existing users
      console.log('Keeping existing users...');
    } else {
      // Insert users only if none exist
      const result = await usersCollection.insertMany(users);
      console.log(`${result.insertedCount} users imported successfully.`);
    }
    
    // Close the connection
    await closeConnection();
  } catch (error) {
    console.error('Error importing users:', error);
    await closeConnection();
  }
}

// Run the import functions
importProducts();
importUsers();

module.exports = {
  products,
  users
};
