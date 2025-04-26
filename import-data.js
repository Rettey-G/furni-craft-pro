const fs = require('fs');
const path = require('path');
const dataStore = require('./data-store');

// Initial data
const initialData = {
  products: [
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
    }
  ],
  users: [
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
  ],
  subscriptions: [
    {
      userId: "admin",
      tier: "premium",
      startDate: new Date(),
      endDate: null,
      name: "Premium",
      price: 199.99,
      features: {
        maxProjects: -1,
        maxPartsPerProject: -1,
        maxCuttingOptimizations: -1,
        saveQuotations: true,
        accessToTemplates: true,
        prioritySupport: true
      }
    },
    {
      userId: "customer",
      tier: "free",
      startDate: new Date(),
      endDate: null,
      name: "Free",
      price: 0,
      features: {
        maxProjects: 2,
        maxPartsPerProject: 5,
        maxCuttingOptimizations: 2,
        saveQuotations: false,
        accessToTemplates: false,
        prioritySupport: false
      }
    }
  ]
};

// Import data
async function importData() {
  try {
    // Import products
    for (const product of initialData.products) {
      await dataStore.products.create(product);
    }
    console.log('Products imported successfully');

    // Import users
    for (const user of initialData.users) {
      await dataStore.users.create(user);
    }
    console.log('Users imported successfully');

    // Import subscriptions
    for (const subscription of initialData.subscriptions) {
      await dataStore.subscriptions.create(subscription);
    }
    console.log('Subscriptions imported successfully');

    console.log('All data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Run the import
importData(); 