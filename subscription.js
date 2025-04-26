// Subscription management for FurniCraft Pro
const dataStore = require('./data-store');

// Subscription tiers
const subscriptionTiers = {
  free: {
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
  },
  standard: {
    name: "Standard",
    price: 99.99,
    features: {
      maxProjects: 10,
      maxPartsPerProject: 20,
      maxCuttingOptimizations: 10,
      saveQuotations: true,
      accessToTemplates: true,
      prioritySupport: false
    }
  },
  premium: {
    name: "Premium",
    price: 199.99,
    features: {
      maxProjects: -1, // Unlimited
      maxPartsPerProject: -1, // Unlimited
      maxCuttingOptimizations: -1, // Unlimited
      saveQuotations: true,
      accessToTemplates: true,
      prioritySupport: true
    }
  }
};

// Get subscription tiers
function getSubscriptionTiers() {
  return subscriptionTiers;
}

// Get user subscription
async function getUserSubscription(userId) {
  try {
    const subscription = await dataStore.subscriptions.getByUserId(userId);
    
    if (!subscription) {
      // If no subscription found, return free tier as default
      return {
        userId,
        tier: 'free',
        startDate: new Date(),
        endDate: null, // Free tier has no end date
        ...subscriptionTiers.free
      };
    }
    
    return subscription;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
}

// Update user subscription
async function updateUserSubscription(userId, tier) {
  try {
    const subscription = await getUserSubscription(userId);
    
    // Update subscription data
    const updatedSubscription = {
      ...subscription,
      tier,
      startDate: new Date(),
      endDate: tier === 'free' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days for paid tiers
      ...subscriptionTiers[tier]
    };
    
    // Save updated subscription
    await dataStore.subscriptions.update(userId, updatedSubscription);
    
    return updatedSubscription;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

// Check if user has access to a feature
async function checkUserAccess(userId, feature) {
  try {
    const subscription = await getUserSubscription(userId);
    return subscription.features[feature] !== false;
  } catch (error) {
    console.error('Error checking access:', error);
    throw error;
  }
}

// Get user's remaining usage for a feature
async function getUserRemainingUsage(userId, feature) {
  try {
    const subscription = await getUserSubscription(userId);
    const maxUsage = subscription.features[feature];
    
    if (maxUsage === -1) {
      return 'Unlimited';
    }
    
    // In a real implementation, you would track actual usage
    // For now, we'll just return the max usage
    return maxUsage;
  } catch (error) {
    console.error('Error getting remaining usage:', error);
    throw error;
  }
}

module.exports = {
  getSubscriptionTiers,
  getUserSubscription,
  updateUserSubscription,
  checkUserAccess,
  getUserRemainingUsage
};
