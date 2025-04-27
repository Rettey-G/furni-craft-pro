# FurniCraft Pro

A comprehensive web application for furniture design, calculation, and 3D visualization.

## Features

- **3D Visualization**: View and customize furniture in real-time 3D
- **Material Calculation**: Estimate materials needed for furniture projects
- **Vendor Comparison**: Compare prices from different vendors
- **Project Management**: Save and manage furniture projects
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript, Three.js
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON-based file storage
- **3D Rendering**: Three.js with GLTFLoader and OrbitControls

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/FurniCraft-Pro.git
   cd FurniCraft-Pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Import initial data:
   ```bash
   npm run import-data
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

## Project Structure

- `/public` - Static assets and client-side code
  - `/js` - JavaScript files
    - `/3d` - 3D visualization components
  - `/css` - Stylesheets
  - `/images` - Images and textures
  - `/models` - 3D models in GLB format
- `/data` - JSON data storage
- `/server.js` - Express server
- `/data-store.js` - Data storage operations
- `/auth.js` - Authentication handling
- `/subscription.js` - Subscription management

## 3D Visualization

The application features a powerful 3D visualization system that allows users to:

- View furniture in 3D
- Rotate, zoom, and pan the view
- Change materials and colors
- Take screenshots
- View in fullscreen mode

## Data Management

Data is stored in JSON files in the `/data` directory:
- `products.json` - Product catalog
- `users.json` - User information
- `subscriptions.json` - User subscription data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for 3D rendering
- Express.js for the server framework
- GLTFLoader for 3D model loading