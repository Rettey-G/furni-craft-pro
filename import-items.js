// Import products from the provided list to MongoDB
const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB connection string
const uri = "mongodb+srv://Rettey:Adhu1447@cluster0.hriuovn.mongodb.net/";
const dbName = "furnicraft";
const collectionName = "products";

// Product data from the images
const products = [
  // ECO-DOOR Products
  {
    name: "ECO-DOOR FIBER GLASS DOOR 1PL WHITE",
    description: "High-quality fiber glass door with 1PL white finish",
    category: "doors",
    image: "assets/products/eco-door-fiber-glass.jpg",
    vendors: [
      { name: "Veligaa", price: 3996.00 },
      { name: "Sonee", price: 4100.00 },
      { name: "Alia Hardware", price: 4050.00 }
    ]
  },
  {
    name: "ECO-DOOR FIBER GLASS DOOR 6P WHITE",
    description: "Premium fiber glass door with 6P white design",
    category: "doors",
    image: "assets/products/eco-door-fiber-glass-6p.jpg",
    vendors: [
      { name: "Veligaa", price: 4200.00 },
      { name: "Sonee", price: 4150.00 },
      { name: "Alia Hardware", price: 4250.00 }
    ]
  },
  {
    name: "ECO-DOOR WPC DOOR WPC 4 VH",
    description: "Wood plastic composite door with 4 VH design",
    category: "doors",
    image: "assets/products/eco-door-wpc.jpg",
    vendors: [
      { name: "Veligaa", price: 3200.00 },
      { name: "Sonee", price: 3250.00 },
      { name: "Alia Hardware", price: 3180.00 }
    ]
  },
  {
    name: "ECO-DOOR WPC DOOR WPC 5 VH",
    description: "Wood plastic composite door with 5 VH design",
    category: "doors",
    image: "assets/products/eco-door-wpc-5vh.jpg",
    vendors: [
      { name: "Veligaa", price: 3300.00 },
      { name: "Sonee", price: 3350.00 },
      { name: "Alia Hardware", price: 3280.00 }
    ]
  },
  {
    name: "ECO-DOOR 4DF DOOR 4F615",
    description: "Eco-door 4DF model with 4F615 design",
    category: "doors",
    image: "assets/products/eco-door-4df.jpg",
    vendors: [
      { name: "Veligaa", price: 2800.00 },
      { name: "Sonee", price: 2850.00 },
      { name: "Alia Hardware", price: 2780.00 }
    ]
  },
  
  // SELLEYS Products
  {
    name: "SELLEYS NO MORE CRACKS EXTERIOR POWDER 500G",
    description: "Exterior crack filler powder for durable repairs",
    category: "sealants",
    image: "assets/products/selleys-no-more-cracks.jpg",
    vendors: [
      { name: "Veligaa", price: 129.60 },
      { name: "Sonee", price: 135.00 },
      { name: "Alia Hardware", price: 130.00 }
    ]
  },
  {
    name: "SELLEYS WHITE FOR LIFE GROUT SEALER SPRAY 125ML",
    description: "White grout sealer spray for long-lasting protection",
    category: "sealants",
    image: "assets/products/selleys-grout-sealer.jpg",
    vendors: [
      { name: "Veligaa", price: 140.40 },
      { name: "Sonee", price: 145.00 },
      { name: "Alia Hardware", price: 142.00 }
    ]
  },
  {
    name: "SELLEYS WHITE FOR LIFE GROUT 1.4KG",
    description: "Premium white grout for tile installations",
    category: "sealants",
    image: "assets/products/selleys-grout.jpg",
    vendors: [
      { name: "Veligaa", price: 378.00 },
      { name: "Sonee", price: 385.00 },
      { name: "Alia Hardware", price: 380.00 }
    ]
  },
  {
    name: "SELLEYS WHITE FOR LIFE RTU GROUT TUBE 410G",
    description: "Ready-to-use white grout in convenient tube packaging",
    category: "sealants",
    image: "assets/products/selleys-rtu-grout.jpg",
    vendors: [
      { name: "Veligaa", price: 229.60 },
      { name: "Sonee", price: 235.00 },
      { name: "Alia Hardware", price: 230.00 }
    ]
  },
  {
    name: "SELLEYS WOOD PUTTY 500G",
    description: "Wood putty for filling holes and imperfections in wood",
    category: "wood",
    image: "assets/products/selleys-wood-putty.jpg",
    vendors: [
      { name: "Veligaa", price: 54.00 },
      { name: "Sonee", price: 58.00 },
      { name: "Alia Hardware", price: 55.00 }
    ]
  },
  {
    name: "SELLEYS GROUT STAIN WHITENER 280G",
    description: "Grout stain whitener for refreshing tile appearance",
    category: "sealants",
    image: "assets/products/selleys-grout-whitener.jpg",
    vendors: [
      { name: "Veligaa", price: 140.40 },
      { name: "Sonee", price: 145.00 },
      { name: "Alia Hardware", price: 142.00 }
    ]
  },
  {
    name: "SELLEYS WHITE FOR LIFE GROUT & TILE CLEANER 500ML",
    description: "Specialized cleaner for grout and tile surfaces",
    category: "cleaners",
    image: "assets/products/selleys-grout-cleaner.jpg",
    vendors: [
      { name: "Veligaa", price: 140.40 },
      { name: "Sonee", price: 145.00 },
      { name: "Alia Hardware", price: 142.00 }
    ]
  },
  
  // AMIG Products
  {
    name: "AMIG PAD LOCK BRASS NO.2",
    description: "Brass padlock for secure locking",
    category: "hardware",
    image: "assets/products/amig-pad-lock.jpg",
    vendors: [
      { name: "Veligaa", price: 129.60 },
      { name: "Sonee", price: 135.00 },
      { name: "Alia Hardware", price: 130.00 }
    ]
  },
  {
    name: "AMIG CLOSET BAR BRACKET BRASS 15-12",
    description: "Brass closet bar bracket for hanging clothes",
    category: "hardware",
    image: "assets/products/amig-closet-bracket.jpg",
    vendors: [
      { name: "Veligaa", price: 129.60 },
      { name: "Sonee", price: 135.00 },
      { name: "Alia Hardware", price: 130.00 }
    ]
  },
  {
    name: "AMIG SINGLE EFFECT HINGE 3036",
    description: "Single effect hinge for doors and cabinets",
    category: "hardware",
    image: "assets/products/amig-hinge.jpg",
    vendors: [
      { name: "Veligaa", price: 113.40 },
      { name: "Sonee", price: 118.00 },
      { name: "Alia Hardware", price: 115.00 }
    ]
  },
  {
    name: "AMIG T-HINGE 550",
    description: "T-shaped hinge for heavy doors",
    category: "hardware",
    image: "assets/products/amig-t-hinge.jpg",
    vendors: [
      { name: "Veligaa", price: 102.60 },
      { name: "Sonee", price: 108.00 },
      { name: "Alia Hardware", price: 105.00 }
    ]
  },
  {
    name: "AMIG FURNITURE HINGE ROD-7",
    description: "Specialized furniture hinge with rod design",
    category: "hardware",
    image: "assets/products/amig-furniture-hinge.jpg",
    vendors: [
      { name: "Veligaa", price: 102.60 },
      { name: "Sonee", price: 108.00 },
      { name: "Alia Hardware", price: 105.00 }
    ]
  },
  {
    name: "AMIG DOOR STOPPER 3053",
    description: "Door stopper to prevent wall damage",
    category: "hardware",
    image: "assets/products/amig-door-stopper.jpg",
    vendors: [
      { name: "Veligaa", price: 54.00 },
      { name: "Sonee", price: 58.00 },
      { name: "Alia Hardware", price: 55.00 }
    ]
  },
  
  // HOY Products
  {
    name: "HOY MAGNETIC DOOR STOPPER MAGNETIC SS RB961-DS002",
    description: "Magnetic door stopper with stainless steel finish",
    category: "hardware",
    image: "assets/products/hoy-magnetic-stopper.jpg",
    vendors: [
      { name: "Veligaa", price: 102.60 },
      { name: "Sonee", price: 108.00 },
      { name: "Alia Hardware", price: 105.00 }
    ]
  },
  {
    name: "HOY HINGES BEARING (1X2 PCS)",
    description: "Bearing hinges for smooth door operation (pack of 2)",
    category: "hardware",
    image: "assets/products/hoy-hinges.jpg",
    vendors: [
      { name: "Veligaa", price: 113.40 },
      { name: "Sonee", price: 118.00 },
      { name: "Alia Hardware", price: 115.00 }
    ]
  },
  {
    name: "HOY HINGES BEARING 4\" X 3\" X 2MM (1X2 PCS) HQ448-00325",
    description: "Precision bearing hinges 4\" x 3\" with 2mm thickness",
    category: "hardware",
    image: "assets/products/hoy-hinges-bearing.jpg",
    vendors: [
      { name: "Veligaa", price: 113.40 },
      { name: "Sonee", price: 118.00 },
      { name: "Alia Hardware", price: 115.00 }
    ]
  },
  
  // Other Products
  {
    name: "POLYCARBONATE CONNECTOR",
    description: "Connector for polycarbonate sheets and panels",
    category: "hardware",
    image: "assets/products/polycarbonate-connector.jpg",
    vendors: [
      { name: "Veligaa", price: 129.60 },
      { name: "Sonee", price: 135.00 },
      { name: "Alia Hardware", price: 130.00 }
    ]
  },
  {
    name: "ROUND BAR NO.04 SS",
    description: "Stainless steel round bar for various applications",
    category: "hardware",
    image: "assets/products/round-bar.jpg",
    vendors: [
      { name: "Veligaa", price: 129.60 },
      { name: "Sonee", price: 135.00 },
      { name: "Alia Hardware", price: 130.00 }
    ]
  },
  {
    name: "V-TECH WOOD PUTTY 500G",
    description: "Wood putty for filling and repairing wood surfaces",
    category: "wood",
    image: "assets/products/vtech-wood-putty.jpg",
    vendors: [
      { name: "Veligaa", price: 54.00 },
      { name: "Sonee", price: 58.00 },
      { name: "Alia Hardware", price: 55.00 }
    ]
  },
  {
    name: "CROCODILE TURPENTINE 1LTR ODOU",
    description: "Turpentine for paint thinning and cleaning",
    category: "paint",
    image: "assets/products/crocodile-turpentine.jpg",
    vendors: [
      { name: "Veligaa", price: 129.60 },
      { name: "Sonee", price: 135.00 },
      { name: "Alia Hardware", price: 130.00 }
    ]
  },
  {
    name: "CROCODILE FLX SHIELD WATER PROOFING 2KG",
    description: "Water proofing compound for protection against moisture",
    category: "sealants",
    image: "assets/products/crocodile-waterproofing.jpg",
    vendors: [
      { name: "Veligaa", price: 54.00 },
      { name: "Sonee", price: 58.00 },
      { name: "Alia Hardware", price: 55.00 }
    ]
  },
  {
    name: "COCONUT FEMALE ADAPTOR",
    description: "Female adaptor for plumbing connections",
    category: "plumbing",
    image: "assets/products/coconut-adaptor.jpg",
    vendors: [
      { name: "Veligaa", price: 54.00 },
      { name: "Sonee", price: 58.00 },
      { name: "Alia Hardware", price: 55.00 }
    ]
  },
  {
    name: "FOLDING PVC DOOR 1.2 X 7FT",
    description: "Folding PVC door for space-saving installations",
    category: "doors",
    image: "assets/products/folding-pvc-door.jpg",
    vendors: [
      { name: "Veligaa", price: 102.60 },
      { name: "Sonee", price: 108.00 },
      { name: "Alia Hardware", price: 105.00 }
    ]
  },
  {
    name: "TALON RAT & MOUSE KILLER 1KG (WAX BLOCKS)",
    description: "Rat and mouse killer in wax block form",
    category: "safety",
    image: "assets/products/talon-rat-killer.jpg",
    vendors: [
      { name: "Veligaa", price: 113.40 },
      { name: "Sonee", price: 118.00 },
      { name: "Alia Hardware", price: 115.00 }
    ]
  },
  {
    name: "SS MINI HINGE 3\" (MIRROR) 2PCS",
    description: "Stainless steel mini hinges for mirrors and small cabinets",
    category: "hardware",
    image: "assets/products/ss-mini-hinge.jpg",
    vendors: [
      { name: "Veligaa", price: 102.60 },
      { name: "Sonee", price: 108.00 },
      { name: "Alia Hardware", price: 105.00 }
    ]
  },
  {
    name: "BRASS HINGES",
    description: "Classic brass hinges for doors and furniture",
    category: "hardware",
    image: "assets/products/brass-hinges.jpg",
    vendors: [
      { name: "Veligaa", price: 108.00 },
      { name: "Sonee", price: 112.00 },
      { name: "Alia Hardware", price: 110.00 }
    ]
  },
  {
    name: "VRH SS304 HINGES BEARING 4\" X 3\" X 2.5MM RB961-4-SUS",
    description: "High-quality stainless steel bearing hinges",
    category: "hardware",
    image: "assets/products/vrh-hinges.jpg",
    vendors: [
      { name: "Veligaa", price: 108.00 },
      { name: "Sonee", price: 112.00 },
      { name: "Alia Hardware", price: 110.00 }
    ]
  }
];

// Function to ensure each product has all three Maldivian vendors
function ensureThreeVendors(products) {
  const vendors = ['Veligaa', 'Sonee', 'Alia Hardware'];
  
  return products.map(product => {
    // Check if all three vendors exist
    const existingVendors = product.vendors.map(v => v.name);
    
    vendors.forEach(vendor => {
      if (!existingVendors.includes(vendor)) {
        // Calculate an average price based on existing vendors
        const avgPrice = product.vendors.reduce((sum, v) => sum + v.price, 0) / product.vendors.length;
        // Add a slight variation for the missing vendor
        const variation = (Math.random() * 0.1 + 0.95) * avgPrice;
        
        product.vendors.push({
          name: vendor,
          price: parseFloat(variation.toFixed(2))
        });
      }
    });
    
    return product;
  });
}

// Connect to MongoDB and import products
async function importProducts() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    // Ensure all products have three vendors
    const productsWithVendors = ensureThreeVendors(products);
    
    // Check if products already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`${existingCount} products already exist in the database`);
      
      // Option to clear existing products
      await collection.deleteMany({});
      console.log('Existing products cleared');
    }
    
    // Insert products
    const result = await collection.insertMany(productsWithVendors);
    console.log(`${result.insertedCount} products successfully imported to MongoDB`);
    
  } catch (error) {
    console.error('Error importing products:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the import function
importProducts();
