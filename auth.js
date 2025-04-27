// Authentication System for FurniCraft Pro
const dataStore = require('./data-store');

// Function to authenticate a user
async function authenticateUser(username, password) {
  try {
    // Find the user
    const user = await dataStore.users.getByUsername(username);
    
    // Check if user exists and password matches
    // Note: In a real application, passwords should be hashed
    if (user && user.password === password) {
      // Create a user object without the password
      const { password, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'Invalid username or password' };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'An error occurred during authentication' };
  }
}

// Function to register a new user
async function registerUser(userData) {
  try {
    // Check if username already exists
    const existingUser = await dataStore.users.getByUsername(userData.username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }
    
    // Create new user
    const newUser = {
      ...userData,
      createdAt: new Date(),
      role: 'customer' // Default role
    };
    
    // Save user to data store
    const createdUser = await dataStore.users.create(newUser);
    
    // Create a user object without the password
    const { password, ...userWithoutPassword } = createdUser;
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
}

// Function to get user profile
async function getUserProfile(username) {
  try {
    // Find the user
    const user = await dataStore.users.getByUsername(username);
    
    if (user) {
      // Create a user object without the password
      const { password, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'User not found' };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { success: false, message: 'An error occurred while getting user profile' };
  }
}

// Function to update user profile
async function updateUserProfile(username, userData) {
  try {
    // Update the user
    const updatedUser = await dataStore.users.update(username, userData);
    
    if (updatedUser) {
      // Create a user object without the password
      const { password, ...userWithoutPassword } = updatedUser;
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'Failed to update profile' };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, message: 'An error occurred while updating user profile' };
  }
}

// Export the functions
module.exports = {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile
};
