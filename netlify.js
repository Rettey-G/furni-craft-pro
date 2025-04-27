// Netlify deployment helper
// This file helps ensure that Netlify properly deploys the site

// Log deployment information
console.log('Netlify deployment helper loaded');

// Add a meta tag to indicate this is a Netlify site
document.addEventListener('DOMContentLoaded', function() {
  const meta = document.createElement('meta');
  meta.name = 'netlify-deployment';
  meta.content = 'true';
  document.head.appendChild(meta);
  
  console.log('Netlify deployment meta tag added');
});
