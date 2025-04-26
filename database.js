const furnitureData = {
    office: {
      file_cabinet: {
        small: {
          dimensions: { width: 40, height: 70, depth: 50 }, // 40x70x50 cm, 2-drawer
          items: [
            { name: "Cabinet Body", wood: "Steel/MDF", size: "40x70x50 cm", pieces: 1, price: "MVR 1200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawers", wood: "Steel", size: "35x15x45 cm", pieces: 2, price: "MVR 400", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 2, price: "MVR 250", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "MVR 150", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Lock Set", wood: "-", size: "Standard", pieces: 1, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        medium: {
          dimensions: { width: 45, height: 100, depth: 55 }, // 45x100x55 cm, 3-drawer
          items: [
            { name: "Cabinet Body", wood: "Steel/MDF", size: "45x100x55 cm", pieces: 1, price: "MVR 1500", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawers", wood: "Steel", size: "40x20x50 cm", pieces: 3, price: "MVR 600", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawer Slides", wood: "-", size: "50 cm", pieces: 3, price: "MVR 375", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Handles", wood: "-", size: "12 cm", pieces: 3, price: "MVR 225", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Lock Set", wood: "-", size: "Standard", pieces: 1, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Dividers", wood: "Steel", size: "40x15 cm", pieces: 3, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        large: {
          dimensions: { width: 50, height: 130, depth: 60 }, // 50x130x60 cm, 4-drawer
          items: [
            { name: "Cabinet Body", wood: "Steel/MDF", size: "50x130x60 cm", pieces: 1, price: "MVR 1800", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawers", wood: "Steel", size: "45x25x55 cm", pieces: 4, price: "MVR 800", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawer Slides", wood: "-", size: "55 cm", pieces: 4, price: "MVR 500", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Handles", wood: "-", size: "15 cm", pieces: 4, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Lock Set", wood: "-", size: "Standard", pieces: 1, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Dividers", wood: "Steel", size: "45x20 cm", pieces: 4, price: "MVR 400", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Anti-tipping Kit", wood: "-", size: "Standard", pieces: 1, price: "MVR 150", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
      },
      shoe_rack: {
        small: {
          dimensions: { width: 60, height: 45, depth: 30 }, // 60x45x30 cm, 2-tier
          items: [
            { name: "Frame", wood: "Steel/Bamboo", size: "60x45x30 cm", pieces: 1, price: "MVR 450", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelves", wood: "Bamboo", size: "60x30 cm", pieces: 2, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Screws", wood: "-", size: "Various", pieces: 12, price: "MVR 60", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Non-slip Feet", wood: "-", size: "2 cm", pieces: 4, price: "MVR 40", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        medium: {
          dimensions: { width: 80, height: 70, depth: 30 }, // 80x70x30 cm, 3-tier
          items: [
            { name: "Frame", wood: "Steel/Bamboo", size: "80x70x30 cm", pieces: 1, price: "MVR 650", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelves", wood: "Bamboo", size: "80x30 cm", pieces: 3, price: "MVR 450", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Screws", wood: "-", size: "Various", pieces: 18, price: "MVR 90", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Non-slip Feet", wood: "-", size: "2 cm", pieces: 4, price: "MVR 40", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        large: {
          dimensions: { width: 100, height: 90, depth: 30 }, // 100x90x30 cm, 4-tier
          items: [
            { name: "Frame", wood: "Steel/Bamboo", size: "100x90x30 cm", pieces: 1, price: "MVR 850", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelves", wood: "Bamboo", size: "100x30 cm", pieces: 4, price: "MVR 600", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Screws", wood: "-", size: "Various", pieces: 24, price: "MVR 120", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Non-slip Feet", wood: "-", size: "2 cm", pieces: 4, price: "MVR 40", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Support Brackets", wood: "Steel", size: "25 cm", pieces: 4, price: "MVR 100", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
      },
      side_drawer: {
        small: {
          dimensions: { width: 40, height: 60, depth: 45 }, // 40x60x45 cm, 2-drawer
          items: [
            { name: "Cabinet Body", wood: "MDF/Plywood", size: "40x60x45 cm", pieces: 1, price: "MVR 550", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawers", wood: "MDF", size: "35x20x40 cm", pieces: 2, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawer Slides", wood: "-", size: "40 cm", pieces: 2, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "MVR 100", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Casters", wood: "-", size: "5 cm", pieces: 4, price: "MVR 120", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        medium: {
          dimensions: { width: 45, height: 65, depth: 50 }, // 45x65x50 cm, 3-drawer
          items: [
            { name: "Cabinet Body", wood: "MDF/Plywood", size: "45x65x50 cm", pieces: 1, price: "MVR 650", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawers", wood: "MDF", size: "40x15x45 cm", pieces: 3, price: "MVR 450", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 3, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Handles", wood: "-", size: "12 cm", pieces: 3, price: "MVR 150", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Casters", wood: "-", size: "5 cm", pieces: 4, price: "MVR 120", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        large: {
          dimensions: { width: 50, height: 70, depth: 55 }, // 50x70x55 cm, 4-drawer
          items: [
            { name: "Cabinet Body", wood: "MDF/Plywood", size: "50x70x55 cm", pieces: 1, price: "MVR 750", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawers", wood: "MDF", size: "45x12x50 cm", pieces: 4, price: "MVR 600", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Drawer Slides", wood: "-", size: "50 cm", pieces: 4, price: "MVR 400", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Handles", wood: "-", size: "15 cm", pieces: 4, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Casters", wood: "-", size: "6 cm", pieces: 4, price: "MVR 160", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Dividers", wood: "MDF", size: "45x10 cm", pieces: 2, price: "MVR 100", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
      },
      bookshelf: {
        small: {
          dimensions: { width: 60, height: 120, depth: 30 }, // 60x120x30 cm, 3-shelf
          items: [
            { name: "Side Panels", wood: "MDF/Plywood", size: "120x30x2 cm", pieces: 2, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelves", wood: "MDF/Plywood", size: "60x30x2 cm", pieces: 3, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Back Panel", wood: "Thin Plywood", size: "60x120x0.5 cm", pieces: 1, price: "MVR 150", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Screws and Dowels", wood: "-", size: "Various", pieces: 20, price: "MVR 100", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelf Supports", wood: "-", size: "Standard", pieces: 12, price: "MVR 60", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        medium: {
          dimensions: { width: 80, height: 160, depth: 35 }, // 80x160x35 cm, 4-shelf
          items: [
            { name: "Side Panels", wood: "MDF/Plywood", size: "160x35x2 cm", pieces: 2, price: "MVR 400", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelves", wood: "MDF/Plywood", size: "80x35x2 cm", pieces: 4, price: "MVR 480", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Back Panel", wood: "Thin Plywood", size: "80x160x0.5 cm", pieces: 1, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Screws and Dowels", wood: "-", size: "Various", pieces: 30, price: "MVR 150", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelf Supports", wood: "-", size: "Standard", pieces: 16, price: "MVR 80", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Wall Mounting Kit", wood: "-", size: "Standard", pieces: 1, price: "MVR 50", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
        large: {
          dimensions: { width: 100, height: 200, depth: 40 }, // 100x200x40 cm, 5-shelf
          items: [
            { name: "Side Panels", wood: "MDF/Plywood", size: "200x40x2.5 cm", pieces: 2, price: "MVR 600", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelves", wood: "MDF/Plywood", size: "100x40x2.5 cm", pieces: 5, price: "MVR 750", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Back Panel", wood: "Thin Plywood", size: "100x200x0.5 cm", pieces: 1, price: "MVR 300", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Screws and Dowels", wood: "-", size: "Various", pieces: 40, price: "MVR 200", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Shelf Supports", wood: "-", size: "Standard", pieces: 20, price: "MVR 100", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Wall Mounting Kit", wood: "-", size: "Standard", pieces: 1, price: "MVR 50", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
            { name: "Dividers", wood: "MDF/Plywood", size: "40x40x1.5 cm", pieces: 2, price: "MVR 120", image: "https://sonee.com.mv/cdn/shop/products/WhatsAppImage2021-10-25at10.35.14AM_1_800x.jpg" },
          ],
        },
      },
      table: {
        small: {
          items: [
            { name: "Tabletop", wood: "Birch Plywood", size: "122x61x1.8 cm", pieces: 1, price: "$20", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "76x5x5 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "100-200 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 2, price: "$3", image: "assets/items/sandpaper.jpg" },
            { name: "Finishing Oil", wood: "-", size: "250 ml", pieces: 1, price: "$8", image: "assets/items/finish.jpg" },
          ],
        },
        medium: {
          items: [
            { name: "Tabletop", wood: "Birch Plywood", size: "152x76x1.8 cm", pieces: 1, price: "$30", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "76x5x5 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "100-200 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 3, price: "$4", image: "assets/items/sandpaper.jpg" },
            { name: "Finishing Oil", wood: "-", size: "350 ml", pieces: 1, price: "$10", image: "assets/items/finish.jpg" },
            { name: "Corner Brackets", wood: "-", size: "5x5 cm", pieces: 4, price: "$6", image: "assets/items/brackets.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Tabletop", wood: "Birch Plywood", size: "183x91x1.8 cm", pieces: 1, price: "$40", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "76x5x5 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "100-200 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 4, price: "$5", image: "assets/items/sandpaper.jpg" },
            { name: "Finishing Oil", wood: "-", size: "500 ml", pieces: 1, price: "$15", image: "assets/items/finish.jpg" },
            { name: "Corner Brackets", wood: "-", size: "5x5 cm", pieces: 8, price: "$12", image: "assets/items/brackets.jpg" },
            { name: "Table Felt Pads", wood: "-", size: "3x3 cm", pieces: 4, price: "$3", image: "assets/items/felt.jpg" },
          ],
        },
      },
      chair: {
        small: {
          items: [
            { name: "Seat", wood: "Pine", size: "40x40x2 cm", pieces: 1, price: "$15", image: "assets/items/seat.jpg" },
            { name: "Legs", wood: "Pine", size: "45x5x5 cm", pieces: 4, price: "$20", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "2-3 cm", pieces: 10, price: "$3", image: "assets/items/screws.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 1, price: "$2", image: "assets/items/sandpaper.jpg" },
            { name: "Wood Glue", wood: "-", size: "50 ml", pieces: 1, price: "$3", image: "assets/items/glue.jpg" },
            { name: "Chair Felt Pads", wood: "-", size: "2x2 cm", pieces: 4, price: "$2", image: "assets/items/felt.jpg" },
          ],
        },
        medium: {
          items: [
            { name: "Seat", wood: "Pine", size: "45x45x2 cm", pieces: 1, price: "$20", image: "assets/items/seat.jpg" },
            { name: "Legs", wood: "Pine", size: "50x5x5 cm", pieces: 4, price: "$25", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "2-3 cm", pieces: 12, price: "$3", image: "assets/items/screws.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 2, price: "$3", image: "assets/items/sandpaper.jpg" },
            { name: "Wood Glue", wood: "-", size: "100 ml", pieces: 1, price: "$4", image: "assets/items/glue.jpg" },
            { name: "Chair Felt Pads", wood: "-", size: "2x2 cm", pieces: 4, price: "$2", image: "assets/items/felt.jpg" },
            { name: "Finishing Oil", wood: "-", size: "100 ml", pieces: 1, price: "$5", image: "assets/items/finish.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Seat", wood: "Pine", size: "50x50x2.5 cm", pieces: 1, price: "$25", image: "assets/items/seat.jpg" },
            { name: "Legs", wood: "Pine", size: "55x6x6 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Backrest", wood: "Pine", size: "50x30x2 cm", pieces: 1, price: "$15", image: "assets/items/backrest.jpg" },
            { name: "Wood Screws", wood: "-", size: "2-3 cm", pieces: 16, price: "$4", image: "assets/items/screws.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 3, price: "$4", image: "assets/items/sandpaper.jpg" },
            { name: "Wood Glue", wood: "-", size: "150 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
            { name: "Chair Felt Pads", wood: "-", size: "2x2 cm", pieces: 4, price: "$2", image: "assets/items/felt.jpg" },
            { name: "Finishing Oil", wood: "-", size: "200 ml", pieces: 1, price: "$8", image: "assets/items/finish.jpg" },
            { name: "Corner Brackets", wood: "-", size: "3x3 cm", pieces: 4, price: "$4", image: "assets/items/brackets.jpg" },
          ],
        },
      },
    },
    bedroom: {
      bed: {
        small: { // Twin (42" x 80" x 24")
          dimensions: { width: 107, height: 61, depth: 203 }, // 42" x 24" x 80"
          items: [
            { name: "Bed Frame", wood: "Oak", size: "190x90x20 cm", pieces: 1, price: "$100", image: "assets/items/bed-frame.jpg" },
            { name: "Legs", wood: "Oak", size: "20x5x5 cm", pieces: 4, price: "$20", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "4-5 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 3, price: "$4", image: "assets/items/sandpaper.jpg" },
            { name: "Wood Glue", wood: "-", size: "200 ml", pieces: 1, price: "$6", image: "assets/items/glue.jpg" },
            { name: "Finishing Oil", wood: "-", size: "300 ml", pieces: 1, price: "$12", image: "assets/items/finish.jpg" },
            { name: "Corner Brackets", wood: "-", size: "5x5 cm", pieces: 4, price: "$6", image: "assets/items/brackets.jpg" },
          ],
        },
        medium: { // Queen (60" x 80" x 24")
          dimensions: { width: 152, height: 61, depth: 203 }, // 60" x 24" x 80"
          items: [
            { name: "Bed Frame", wood: "Oak", size: "190x140x20 cm", pieces: 1, price: "$150", image: "assets/items/bed-frame.jpg" },
            { name: "Legs", wood: "Oak", size: "20x5x5 cm", pieces: 4, price: "$20", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "4-5 cm", pieces: 25, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 4, price: "$5", image: "assets/items/sandpaper.jpg" },
            { name: "Wood Glue", wood: "-", size: "300 ml", pieces: 1, price: "$8", image: "assets/items/glue.jpg" },
            { name: "Finishing Oil", wood: "-", size: "400 ml", pieces: 1, price: "$15", image: "assets/items/finish.jpg" },
            { name: "Corner Brackets", wood: "-", size: "5x5 cm", pieces: 6, price: "$9", image: "assets/items/brackets.jpg" },
            { name: "Support Beams", wood: "Oak", size: "140x10x5 cm", pieces: 2, price: "$25", image: "assets/items/beams.jpg" },
          ],
        },
        large: { // King (76" x 80" x 24")
          dimensions: { width: 193, height: 61, depth: 203 }, // 76" x 24" x 80"
          items: [
            { name: "Bed Frame", wood: "Oak", size: "200x180x20 cm", pieces: 1, price: "$200", image: "assets/items/bed-frame.jpg" },
            { name: "Legs", wood: "Oak", size: "25x6x6 cm", pieces: 6, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "4-5 cm", pieces: 30, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 5, price: "$6", image: "assets/items/sandpaper.jpg" },
            { name: "Wood Glue", wood: "-", size: "400 ml", pieces: 1, price: "$10", image: "assets/items/glue.jpg" },
            { name: "Finishing Oil", wood: "-", size: "500 ml", pieces: 1, price: "$18", image: "assets/items/finish.jpg" },
            { name: "Corner Brackets", wood: "-", size: "6x6 cm", pieces: 8, price: "$12", image: "assets/items/brackets.jpg" },
            { name: "Support Beams", wood: "Oak", size: "180x10x5 cm", pieces: 3, price: "$40", image: "assets/items/beams.jpg" },
            { name: "Headboard", wood: "Oak", size: "180x60x2 cm", pieces: 1, price: "$45", image: "assets/items/headboard.jpg" },
          ],
        },
      },
      nightstand: {
        small: { // Slim (18" x 12" x 20")
          dimensions: { width: 46, height: 51, depth: 30 }, // 18" x 20" x 12"
          items: [
            { name: "Top Panel", wood: "Oak", size: "46x30x2 cm", pieces: 1, price: "$15", image: "assets/items/panel.jpg" },
            { name: "Side Panels", wood: "Oak", size: "51x30x2 cm", pieces: 2, price: "$20", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "46x51x1 cm", pieces: 1, price: "$10", image: "assets/items/panel.jpg" },
            { name: "Drawer", wood: "Oak", size: "42x26x15 cm", pieces: 1, price: "$25", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handle", wood: "-", size: "10 cm", pieces: 1, price: "$5", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 12, price: "$3", image: "assets/items/screws.jpg" },
            { name: "Drawer Slides", wood: "-", size: "30 cm", pieces: 2, price: "$10", image: "assets/items/slides.jpg" },
          ],
        },
        medium: { // Standard (24" x 18" x 24")
          dimensions: { width: 61, height: 61, depth: 46 }, // 24" x 24" x 18"
          items: [
            { name: "Top Panel", wood: "Oak", size: "61x46x2 cm", pieces: 1, price: "$20", image: "assets/items/panel.jpg" },
            { name: "Side Panels", wood: "Oak", size: "61x46x2 cm", pieces: 2, price: "$25", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "61x61x1 cm", pieces: 1, price: "$15", image: "assets/items/panel.jpg" },
            { name: "Drawers", wood: "Oak", size: "57x42x15 cm", pieces: 2, price: "$40", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handles", wood: "-", size: "10 cm", pieces: 2, price: "$8", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 16, price: "$4", image: "assets/items/screws.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 4, price: "$20", image: "assets/items/slides.jpg" },
          ],
        },
        large: { // Wide (30" x 22" x 26") – Extra storage
          dimensions: { width: 76, height: 66, depth: 56 }, // 30" x 26" x 22"
          items: [
            { name: "Top Panel", wood: "Oak", size: "76x56x2 cm", pieces: 1, price: "$25", image: "assets/items/panel.jpg" },
            { name: "Side Panels", wood: "Oak", size: "66x56x2 cm", pieces: 2, price: "$30", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "76x66x1 cm", pieces: 1, price: "$20", image: "assets/items/panel.jpg" },
            { name: "Drawers", wood: "Oak", size: "72x52x15 cm", pieces: 3, price: "$60", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handles", wood: "-", size: "12 cm", pieces: 3, price: "$12", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Drawer Slides", wood: "-", size: "55 cm", pieces: 6, price: "$30", image: "assets/items/slides.jpg" },
            { name: "Shelf", wood: "Oak", size: "74x54x2 cm", pieces: 1, price: "$15", image: "assets/items/shelf.jpg" },
          ],
        },
      },
      dresser: {
        small: { // 3-Drawer (36" x 18" x 32")
          dimensions: { width: 91, height: 81, depth: 46 }, // 36" x 32" x 18"
          items: [
            { name: "Top Panel", wood: "Oak", size: "91x46x2 cm", pieces: 1, price: "$25", image: "assets/items/panel.jpg" },
            { name: "Side Panels", wood: "Oak", size: "81x46x2 cm", pieces: 2, price: "$30", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "91x81x1 cm", pieces: 1, price: "$20", image: "assets/items/panel.jpg" },
            { name: "Bottom Panel", wood: "Oak", size: "91x46x2 cm", pieces: 1, price: "$25", image: "assets/items/panel.jpg" },
            { name: "Drawers", wood: "Oak", size: "87x42x15 cm", pieces: 3, price: "$60", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handles", wood: "-", size: "15 cm", pieces: 3, price: "$15", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 6, price: "$30", image: "assets/items/slides.jpg" },
          ],
        },
        medium: { // 6-Drawer (60" x 20" x 32")
          dimensions: { width: 152, height: 81, depth: 51 }, // 60" x 32" x 20"
          items: [
            { name: "Top Panel", wood: "Oak", size: "152x51x2 cm", pieces: 1, price: "$35", image: "assets/items/panel.jpg" },
            { name: "Side Panels", wood: "Oak", size: "81x51x2 cm", pieces: 2, price: "$40", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "152x81x1 cm", pieces: 1, price: "$30", image: "assets/items/panel.jpg" },
            { name: "Bottom Panel", wood: "Oak", size: "152x51x2 cm", pieces: 1, price: "$35", image: "assets/items/panel.jpg" },
            { name: "Center Divider", wood: "Oak", size: "81x51x2 cm", pieces: 1, price: "$20", image: "assets/items/panel.jpg" },
            { name: "Drawers", wood: "Oak", size: "74x47x15 cm", pieces: 6, price: "$120", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handles", wood: "-", size: "15 cm", pieces: 6, price: "$24", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 35, price: "$8", image: "assets/items/screws.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 12, price: "$60", image: "assets/items/slides.jpg" },
          ],
        },
        large: { // 8-Drawer (72" x 24" x 36")
          dimensions: { width: 183, height: 91, depth: 61 }, // 72" x 36" x 24"
          items: [
            { name: "Top Panel", wood: "Oak", size: "183x61x3 cm", pieces: 1, price: "$45", image: "assets/items/panel.jpg" },
            { name: "Side Panels", wood: "Oak", size: "91x61x3 cm", pieces: 2, price: "$50", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "183x91x1.5 cm", pieces: 1, price: "$40", image: "assets/items/panel.jpg" },
            { name: "Bottom Panel", wood: "Oak", size: "183x61x3 cm", pieces: 1, price: "$45", image: "assets/items/panel.jpg" },
            { name: "Center Dividers", wood: "Oak", size: "91x61x3 cm", pieces: 3, price: "$60", image: "assets/items/panel.jpg" },
            { name: "Drawers", wood: "Oak", size: "44x57x15 cm", pieces: 8, price: "$160", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handles", wood: "-", size: "15 cm", pieces: 8, price: "$32", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 45, price: "$10", image: "assets/items/screws.jpg" },
            { name: "Drawer Slides", wood: "-", size: "55 cm", pieces: 16, price: "$80", image: "assets/items/slides.jpg" },
            { name: "Corner Brackets", wood: "-", size: "5x5 cm", pieces: 8, price: "$12", image: "assets/items/brackets.jpg" },
          ],
        },
      },
      wardrobe: {
        small: {
          items: [
            { name: "Doors", wood: "Plywood", size: "180x60x2 cm", pieces: 2, price: "$50", image: "assets/items/doors.jpg" },
            { name: "Shelves", wood: "Plywood", size: "60x40x2 cm", pieces: 4, price: "$30", image: "assets/items/shelves.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Hinges", wood: "-", size: "7.5 cm", pieces: 4, price: "$8", image: "assets/items/hinges.jpg" },
            { name: "Door Handles", wood: "-", size: "10 cm", pieces: 2, price: "$6", image: "assets/items/handles.jpg" },
            { name: "Wood Glue", wood: "-", size: "200 ml", pieces: 1, price: "$6", image: "assets/items/glue.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 3, price: "$4", image: "assets/items/sandpaper.jpg" },
          ],
        },
        medium: {
          items: [
            { name: "Doors", wood: "Plywood", size: "190x70x2 cm", pieces: 2, price: "$60", image: "assets/items/doors.jpg" },
            { name: "Shelves", wood: "Plywood", size: "70x40x2 cm", pieces: 5, price: "$35", image: "assets/items/shelves.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 35, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Hinges", wood: "-", size: "7.5 cm", pieces: 4, price: "$8", image: "assets/items/hinges.jpg" },
            { name: "Door Handles", wood: "-", size: "10 cm", pieces: 2, price: "$6", image: "assets/items/handles.jpg" },
            { name: "Wood Glue", wood: "-", size: "250 ml", pieces: 1, price: "$7", image: "assets/items/glue.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 4, price: "$5", image: "assets/items/sandpaper.jpg" },
            { name: "Drawer Slides", wood: "-", size: "40 cm", pieces: 2, price: "$12", image: "assets/items/drawer-slides.jpg" },
            { name: "Drawer", wood: "Plywood", size: "60x35x15 cm", pieces: 1, price: "$20", image: "assets/items/drawer.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Doors", wood: "Plywood", size: "200x80x2 cm", pieces: 2, price: "$70", image: "assets/items/doors.jpg" },
            { name: "Shelves", wood: "Plywood", size: "80x40x2 cm", pieces: 6, price: "$40", image: "assets/items/shelves.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 40, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Hinges", wood: "-", size: "7.5 cm", pieces: 6, price: "$12", image: "assets/items/hinges.jpg" },
            { name: "Door Handles", wood: "-", size: "12 cm", pieces: 2, price: "$8", image: "assets/items/handles.jpg" },
            { name: "Wood Glue", wood: "-", size: "300 ml", pieces: 1, price: "$8", image: "assets/items/glue.jpg" },
            { name: "Sandpaper", wood: "-", size: "120 grit", pieces: 5, price: "$6", image: "assets/items/sandpaper.jpg" },
            { name: "Drawer Slides", wood: "-", size: "40 cm", pieces: 4, price: "$24", image: "assets/items/drawer-slides.jpg" },
            { name: "Drawers", wood: "Plywood", size: "70x35x15 cm", pieces: 2, price: "$40", image: "assets/items/drawer.jpg" },
            { name: "Clothes Rail", wood: "-", size: "75 cm", pieces: 1, price: "$10", image: "assets/items/clothes-rail.jpg" },
            { name: "Corner Brackets", wood: "-", size: "5x5 cm", pieces: 8, price: "$12", image: "assets/items/brackets.jpg" },
          ],
        },
      },
    },
    kitchen: {
      kitchen_hood_with_cupboard: {
        small: {
          items: [
            { name: "Hood Body", wood: "-", size: "60x50x30 cm", pieces: 1, price: "$80", image: "assets/items/hood.jpg" },
            { name: "Filter", wood: "-", size: "40x30 cm", pieces: 1, price: "$15", image: "assets/items/filter.jpg" },
            { name: "Mounting Brackets", wood: "-", size: "10x5 cm", pieces: 4, price: "$10", image: "assets/items/brackets.jpg" },
            { name: "Screws", wood: "-", size: "3-4 cm", pieces: 8, price: "$3", image: "assets/items/screws.jpg" },
            { name: "Vent Pipe", wood: "-", size: "15 cm diameter, 1 m", pieces: 1, price: "$20", image: "assets/items/pipe.jpg" },
            { name: "Upper Cabinet Box", wood: "Plywood", size: "60x30x60 cm", pieces: 1, price: "$35", image: "assets/items/cabinet.jpg" },
            { name: "Cabinet Doors", wood: "MDF", size: "30x60x1.8 cm", pieces: 2, price: "$30", image: "assets/items/door.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "$16", image: "assets/items/handle.jpg" },
          ],
        },
        medium: {
          items: [
            { name: "Hood Body", wood: "-", size: "75x60x35 cm", pieces: 1, price: "$120", image: "assets/items/hood.jpg" },
            { name: "Filter", wood: "-", size: "50x40 cm", pieces: 1, price: "$25", image: "assets/items/filter.jpg" },
            { name: "Mounting Brackets", wood: "-", size: "12x6 cm", pieces: 4, price: "$15", image: "assets/items/brackets.jpg" },
            { name: "Screws", wood: "-", size: "3-4 cm", pieces: 12, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Vent Pipe", wood: "-", size: "15 cm diameter, 1.5 m", pieces: 1, price: "$30", image: "assets/items/pipe.jpg" },
            { name: "Upper Cabinet Box", wood: "Plywood", size: "75x35x70 cm", pieces: 1, price: "$50", image: "assets/items/cabinet.jpg" },
            { name: "Cabinet Doors", wood: "MDF", size: "37x70x1.8 cm", pieces: 2, price: "$45", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "73x33x1.8 cm", pieces: 1, price: "$15", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "$16", image: "assets/items/handle.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Hood Body", wood: "-", size: "90x70x40 cm", pieces: 1, price: "$180", image: "assets/items/hood.jpg" },
            { name: "Filter", wood: "-", size: "60x50 cm", pieces: 1, price: "$35", image: "assets/items/filter.jpg" },
            { name: "Mounting Brackets", wood: "-", size: "15x8 cm", pieces: 4, price: "$20", image: "assets/items/brackets.jpg" },
            { name: "Screws", wood: "-", size: "3-4 cm", pieces: 16, price: "$8", image: "assets/items/screws.jpg" },
            { name: "Vent Pipe", wood: "-", size: "20 cm diameter, 2 m", pieces: 1, price: "$45", image: "assets/items/pipe.jpg" },
            { name: "Upper Cabinet Box", wood: "Plywood", size: "90x40x80 cm", pieces: 1, price: "$70", image: "assets/items/cabinet.jpg" },
            { name: "Cabinet Doors", wood: "MDF", size: "45x80x1.8 cm", pieces: 2, price: "$60", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "88x38x1.8 cm", pieces: 2, price: "$30", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "$16", image: "assets/items/handle.jpg" },
          ],
        },
      },
      cupboard: {
        small: {
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "60x30x70 cm", pieces: 1, price: "$40", image: "assets/items/cabinet.jpg" },
            { name: "Door", wood: "MDF", size: "60x70x1.8 cm", pieces: 1, price: "$25", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "58x28x1.8 cm", pieces: 2, price: "$15", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 2, price: "$5", image: "assets/items/hinges.jpg" },
            { name: "Handle", wood: "-", size: "10 cm", pieces: 1, price: "$8", image: "assets/items/handle.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "100 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
          ],
        },
        medium: {
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "80x40x90 cm", pieces: 1, price: "$60", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "40x90x1.8 cm", pieces: 2, price: "$40", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "78x38x1.8 cm", pieces: 3, price: "$30", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "$16", image: "assets/items/handle.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 30, price: "$8", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "200 ml", pieces: 1, price: "$8", image: "assets/items/glue.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "120x50x100 cm", pieces: 1, price: "$90", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "40x100x1.8 cm", pieces: 3, price: "$75", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "118x48x1.8 cm", pieces: 4, price: "$60", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 6, price: "$15", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 3, price: "$24", image: "assets/items/handle.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 45, price: "$12", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "300 ml", pieces: 1, price: "$12", image: "assets/items/glue.jpg" },
          ],
        },
      },
      washbasin: {
        small: {
          items: [
            { name: "Basin", wood: "-", size: "40x30x15 cm", pieces: 1, price: "$50", image: "assets/items/basin.jpg" },
            { name: "Cabinet", wood: "Plywood", size: "40x30x50 cm", pieces: 1, price: "$40", image: "assets/items/cabinet.jpg" },
            { name: "Door", wood: "MDF", size: "40x50x1.8 cm", pieces: 1, price: "$20", image: "assets/items/door.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 2, price: "$5", image: "assets/items/hinges.jpg" },
            { name: "Handle", wood: "-", size: "10 cm", pieces: 1, price: "$8", image: "assets/items/handle.jpg" },
            { name: "Faucet", wood: "-", size: "Standard", pieces: 1, price: "$35", image: "assets/items/faucet.jpg" },
            { name: "Drain Pipe", wood: "-", size: "40 cm", pieces: 1, price: "$10", image: "assets/items/pipe.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 15, price: "$4", image: "assets/items/screws.jpg" },
            { name: "Silicone Sealant", wood: "-", size: "100 ml", pieces: 1, price: "$8", image: "assets/items/sealant.jpg" },
          ],
        },
        medium: {
          items: [
            { name: "Basin", wood: "-", size: "60x40x15 cm", pieces: 1, price: "$80", image: "assets/items/basin.jpg" },
            { name: "Cabinet", wood: "Plywood", size: "60x40x60 cm", pieces: 1, price: "$60", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "30x60x1.8 cm", pieces: 2, price: "$35", image: "assets/items/door.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 2, price: "$16", image: "assets/items/handle.jpg" },
            { name: "Faucet", wood: "-", size: "Standard", pieces: 1, price: "$50", image: "assets/items/faucet.jpg" },
            { name: "Drain Pipe", wood: "-", size: "50 cm", pieces: 1, price: "$15", image: "assets/items/pipe.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Silicone Sealant", wood: "-", size: "200 ml", pieces: 1, price: "$12", image: "assets/items/sealant.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Double Basin", wood: "-", size: "120x50x15 cm", pieces: 1, price: "$150", image: "assets/items/basin.jpg" },
            { name: "Cabinet", wood: "Plywood", size: "120x50x70 cm", pieces: 1, price: "$100", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "40x70x1.8 cm", pieces: 3, price: "$60", image: "assets/items/door.jpg" },
            { name: "Drawer Fronts", wood: "MDF", size: "40x20x1.8 cm", pieces: 2, price: "$30", image: "assets/items/drawer.jpg" },
            { name: "Drawer Boxes", wood: "Plywood", size: "38x48x18 cm", pieces: 2, price: "$40", image: "assets/items/drawer-box.jpg" },
            { name: "Hinges", wood: "-", size: "5 cm", pieces: 6, price: "$15", image: "assets/items/hinges.jpg" },
            { name: "Handles", wood: "-", size: "10 cm", pieces: 5, price: "$40", image: "assets/items/handle.jpg" },
            { name: "Faucets", wood: "-", size: "Standard", pieces: 2, price: "$120", image: "assets/items/faucet.jpg" },
            { name: "Drain Pipes", wood: "-", size: "50 cm", pieces: 2, price: "$30", image: "assets/items/pipe.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 2, price: "$30", image: "assets/items/slides.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 40, price: "$10", image: "assets/items/screws.jpg" },
            { name: "Silicone Sealant", wood: "-", size: "300 ml", pieces: 1, price: "$18", image: "assets/items/sealant.jpg" },
          ],
        },
      },
      cooker: {
        small: {
          dimensions: { width: 60, height: 10, depth: 50 }, // 60x50 cm, 2 burners
          items: [
            { name: "Cooktop", wood: "-", size: "60x50 cm, 2 burners", pieces: 1, price: "$150", image: "assets/items/cooktop.jpg" },
            { name: "Gas Connection Kit", wood: "-", size: "Standard", pieces: 1, price: "$25", image: "assets/items/gas-kit.jpg" },
            { name: "Mounting Brackets", wood: "-", size: "5x5 cm", pieces: 4, price: "$10", image: "assets/items/brackets.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 8, price: "$3", image: "assets/items/screws.jpg" },
            { name: "Silicone Sealant", wood: "-", size: "100 ml", pieces: 1, price: "$8", image: "assets/items/sealant.jpg" },
          ],
        },
        medium: {
          dimensions: { width: 75, height: 10, depth: 50 }, // 75x50 cm, 4 burners
          items: [
            { name: "Cooktop", wood: "-", size: "75x50 cm, 4 burners", pieces: 1, price: "$250", image: "assets/items/cooktop.jpg" },
            { name: "Gas Connection Kit", wood: "-", size: "Standard", pieces: 1, price: "$30", image: "assets/items/gas-kit.jpg" },
            { name: "Mounting Brackets", wood: "-", size: "5x5 cm", pieces: 4, price: "$10", image: "assets/items/brackets.jpg" },
            { name: "Screws", wood: "-", size: "2-3 cm", pieces: 10, price: "$4", image: "assets/items/screws.jpg" },
            { name: "Silicone Sealant", wood: "-", size: "150 ml", pieces: 1, price: "$10", image: "assets/items/sealant.jpg" },
          ],
        },
        large: {
          dimensions: { width: 90, height: 85, depth: 60 }, // 90x60x85 cm, 5 burners + oven
          items: [
            { name: "Range Cooker", wood: "-", size: "90x60 cm, 5 burners + oven", pieces: 1, price: "$500", image: "assets/items/range.jpg" },
            { name: "Gas Connection Kit", wood: "-", size: "Standard", pieces: 1, price: "$40", image: "assets/items/gas-kit.jpg" },
            { name: "Electrical Connection", wood: "-", size: "Standard", pieces: 1, price: "$30", image: "assets/items/electrical.jpg" },
            { name: "Anti-Tip Bracket", wood: "-", size: "20x10 cm", pieces: 1, price: "$15", image: "assets/items/anti-tip.jpg" },
            { name: "Screws", wood: "-", size: "3-4 cm", pieces: 12, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Silicone Sealant", wood: "-", size: "200 ml", pieces: 1, price: "$15", image: "assets/items/sealant.jpg" },
          ],
        },
      },
      dining_table: {
        small: { // Bistro Table (30" x 30" x 30") - For 2
          dimensions: { width: 76, height: 76, depth: 76 }, // 30" x 30" x 30"
          items: [
            { name: "Tabletop", wood: "Oak", size: "76 cm diameter x 2 cm", pieces: 1, price: "$45", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "75x5x5 cm", pieces: 4, price: "$35", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 16, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "100 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
          ],
        },
        medium: { // 4-Seater (48" x 36" x 30")
          dimensions: { width: 122, height: 76, depth: 91 }, // 48" x 30" x 36"
          items: [
            { name: "Tabletop", wood: "Oak", size: "122x91x2 cm", pieces: 1, price: "$70", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "75x5x5 cm", pieces: 4, price: "$40", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "150 ml", pieces: 1, price: "$7", image: "assets/items/glue.jpg" },
          ],
        },
        large: { // Farmhouse Table (72" x 42" x 30") - Seats 6-8
          dimensions: { width: 183, height: 76, depth: 107 }, // 72" x 30" x 42"
          items: [
            { name: "Tabletop", wood: "Oak", size: "183x107x3 cm", pieces: 1, price: "$120", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "75x8x8 cm", pieces: 4, price: "$60", image: "assets/items/legs.jpg" },
            { name: "Support Beam", wood: "Oak", size: "160x10x5 cm", pieces: 1, price: "$30", image: "assets/items/beam.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$8", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "250 ml", pieces: 1, price: "$10", image: "assets/items/glue.jpg" },
          ],
        },
      },
      bar_stool: {
        small: { // Backless (15" x 15" x 30")
          dimensions: { width: 38, height: 76, depth: 38 }, // 15" x 30" x 15"
          items: [
            { name: "Seat", wood: "Maple", size: "38 cm diameter x 3 cm", pieces: 1, price: "$25", image: "assets/items/seat.jpg" },
            { name: "Legs", wood: "Maple", size: "75x4x4 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Support Braces", wood: "Maple", size: "20x3x3 cm", pieces: 4, price: "$15", image: "assets/items/braces.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        medium: { // With Back (18" x 18" x 42")
          dimensions: { width: 46, height: 107, depth: 46 }, // 18" x 42" x 18"
          items: [
            { name: "Seat", wood: "Maple", size: "46 cm diameter x 3 cm", pieces: 1, price: "$30", image: "assets/items/seat.jpg" },
            { name: "Back Support", wood: "Maple", size: "46x30x2 cm", pieces: 1, price: "$20", image: "assets/items/back.jpg" },
            { name: "Legs", wood: "Maple", size: "105x4x4 cm", pieces: 4, price: "$40", image: "assets/items/legs.jpg" },
            { name: "Support Braces", wood: "Maple", size: "25x3x3 cm", pieces: 4, price: "$20", image: "assets/items/braces.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
          ],
        },
        large: { // Swivel (24" x 24" x 42") – Padded seat
          dimensions: { width: 61, height: 107, depth: 61 }, // 24" x 42" x 24"
          items: [
            { name: "Seat", wood: "Maple", size: "61 cm diameter x 3 cm", pieces: 1, price: "$35", image: "assets/items/seat.jpg" },
            { name: "Padding", wood: "-", size: "61 cm diameter x 5 cm", pieces: 1, price: "$25", image: "assets/items/padding.jpg" },
            { name: "Fabric", wood: "-", size: "1 yard", pieces: 1, price: "$20", image: "assets/items/fabric.jpg" },
            { name: "Back Support", wood: "Maple", size: "61x35x2 cm", pieces: 1, price: "$25", image: "assets/items/back.jpg" },
            { name: "Swivel Mechanism", wood: "-", size: "Standard", pieces: 1, price: "$30", image: "assets/items/swivel.jpg" },
            { name: "Legs", wood: "Maple", size: "90x5x5 cm", pieces: 4, price: "$45", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$7", image: "assets/items/screws.jpg" },
          ],
        },
      },
      kitchen_island: {
        small: { // Compact (48" x 24" x 36") – Minimalist
          dimensions: { width: 122, height: 91, depth: 61 }, // 48" x 36" x 24"
          items: [
            { name: "Countertop", wood: "Butcher Block", size: "122x61x4 cm", pieces: 1, price: "$120", image: "assets/items/countertop.jpg" },
            { name: "Cabinet Box", wood: "Plywood", size: "Various", pieces: 1, price: "$80", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "Various", pieces: 2, price: "$40", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "Various", pieces: 1, price: "$20", image: "assets/items/shelves.jpg" },
            { name: "Legs", wood: "Maple", size: "10 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$25", image: "assets/items/hardware.jpg" },
          ],
        },
        medium: { // Standard (72" x 36" x 36")
          dimensions: { width: 183, height: 91, depth: 91 }, // 72" x 36" x 36"
          items: [
            { name: "Countertop", wood: "Butcher Block", size: "183x91x4 cm", pieces: 1, price: "$180", image: "assets/items/countertop.jpg" },
            { name: "Cabinet Box", wood: "Plywood", size: "Various", pieces: 1, price: "$120", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "Various", pieces: 3, price: "$60", image: "assets/items/door.jpg" },
            { name: "Drawers", wood: "Plywood", size: "Various", pieces: 2, price: "$40", image: "assets/items/drawer.jpg" },
            { name: "Shelves", wood: "Plywood", size: "Various", pieces: 2, price: "$30", image: "assets/items/shelves.jpg" },
            { name: "Legs", wood: "Maple", size: "10 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$35", image: "assets/items/hardware.jpg" },
          ],
        },
        large: { // Extended (96" x 48" x 36") – With sink/storage
          dimensions: { width: 244, height: 91, depth: 122 }, // 96" x 36" x 48"
          items: [
            { name: "Countertop", wood: "Butcher Block", size: "244x122x4 cm", pieces: 1, price: "$280", image: "assets/items/countertop.jpg" },
            { name: "Sink", wood: "-", size: "60x45x20 cm", pieces: 1, price: "$120", image: "assets/items/sink.jpg" },
            { name: "Faucet", wood: "-", size: "Standard", pieces: 1, price: "$80", image: "assets/items/faucet.jpg" },
            { name: "Cabinet Box", wood: "Plywood", size: "Various", pieces: 1, price: "$180", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "Various", pieces: 4, price: "$80", image: "assets/items/door.jpg" },
            { name: "Drawers", wood: "Plywood", size: "Various", pieces: 4, price: "$80", image: "assets/items/drawer.jpg" },
            { name: "Shelves", wood: "Plywood", size: "Various", pieces: 3, price: "$45", image: "assets/items/shelves.jpg" },
            { name: "Legs", wood: "Maple", size: "10 cm", pieces: 6, price: "$45", image: "assets/items/legs.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$50", image: "assets/items/hardware.jpg" },
            { name: "Plumbing Kit", wood: "-", size: "Standard", pieces: 1, price: "$60", image: "assets/items/plumbing.jpg" },
          ],
        },
      },
      cabinet: {
        small: { // Small Cabinet
          dimensions: { width: 60, height: 80, depth: 30 }, // 60x80x30 cm
          items: [
            { name: "Doors", wood: "Plywood", size: "60x40x2 cm", pieces: 2, price: "$30", image: "assets/items/doors.jpg" },
            { name: "Shelves", wood: "Plywood", size: "60x30x2 cm", pieces: 3, price: "$20", image: "assets/items/shelves.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        medium: { // Medium Cabinet
          dimensions: { width: 70, height: 100, depth: 35 }, // 70x100x35 cm
          items: [
            { name: "Doors", wood: "Plywood", size: "70x45x2 cm", pieces: 2, price: "$35", image: "assets/items/doors.jpg" },
            { name: "Shelves", wood: "Plywood", size: "70x35x2 cm", pieces: 4, price: "$22", image: "assets/items/shelves.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 22, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        large: { // Large Cabinet
          dimensions: { width: 80, height: 120, depth: 40 }, // 80x120x40 cm
          items: [
            { name: "Doors", wood: "Plywood", size: "80x50x2 cm", pieces: 2, price: "$40", image: "assets/items/doors.jpg" },
            { name: "Shelves", wood: "Plywood", size: "80x30x2 cm", pieces: 4, price: "$25", image: "assets/items/shelves.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
      },
    },
    living_room: {
      sofa: {
        small: { // Loveseat
          dimensions: { width: 152, height: 86, depth: 91 }, // 60" x 36" x 34"
          items: [
            { name: "Frame", wood: "Pine", size: "Various", pieces: 1, price: "$120", image: "assets/items/frame.jpg" },
            { name: "Cushions", wood: "-", size: "Seat & Back", pieces: 3, price: "$80", image: "assets/items/cushions.jpg" },
            { name: "Fabric", wood: "-", size: "5 yards", pieces: 1, price: "$75", image: "assets/items/fabric.jpg" },
            { name: "Legs", wood: "Oak", size: "4 inches", pieces: 4, price: "$40", image: "assets/items/legs.jpg" },
          ],
        },
        medium: { // 3-Seater
          dimensions: { width: 213, height: 86, depth: 91 }, // 84" x 36" x 34"
          items: [
            { name: "Frame", wood: "Pine", size: "Various", pieces: 1, price: "$180", image: "assets/items/frame.jpg" },
            { name: "Cushions", wood: "-", size: "Seat & Back", pieces: 5, price: "$140", image: "assets/items/cushions.jpg" },
            { name: "Fabric", wood: "-", size: "8 yards", pieces: 1, price: "$120", image: "assets/items/fabric.jpg" },
            { name: "Legs", wood: "Oak", size: "4 inches", pieces: 4, price: "$40", image: "assets/items/legs.jpg" },
          ],
        },
        large: { // Sectional
          dimensions: { width: 305, height: 86, depth: 229 }, // 120" x 36" x 90"
          items: [
            { name: "Frame", wood: "Pine", size: "Various", pieces: 1, price: "$320", image: "assets/items/frame.jpg" },
            { name: "Cushions", wood: "-", size: "Seat & Back", pieces: 8, price: "$240", image: "assets/items/cushions.jpg" },
            { name: "Fabric", wood: "-", size: "15 yards", pieces: 1, price: "$225", image: "assets/items/fabric.jpg" },
            { name: "Legs", wood: "Oak", size: "4 inches", pieces: 8, price: "$80", image: "assets/items/legs.jpg" },
          ],
        },
      },
      coffee_table: {
        small: { // Round Table (30" diameter x 18" H)
          dimensions: { width: 76, height: 46, depth: 76 }, // 30" diameter x 18"H
          items: [
            { name: "Tabletop", wood: "Walnut", size: "76 cm diameter x 2 cm", pieces: 1, price: "$40", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Walnut", size: "45x5x5 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 15, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        medium: { // Rectangular (48" x 24" x 18")
          dimensions: { width: 122, height: 46, depth: 61 }, // 48" x 18" x 24"
          items: [
            { name: "Tabletop", wood: "Walnut", size: "122x61x2 cm", pieces: 1, price: "$50", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Walnut", size: "45x5x5 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 18, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        large: { // Oversized (60" x 30" x 20")
          dimensions: { width: 152, height: 51, depth: 76 }, // 60" x 20" x 30"
          items: [
            { name: "Tabletop", wood: "Walnut", size: "152x76x2 cm", pieces: 1, price: "$60", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Walnut", size: "50x5x5 cm", pieces: 4, price: "$35", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
      },
      accent_chair: {
        small: { // Compact Armchair (28" x 30" x 30")
          dimensions: { width: 71, height: 76, depth: 76 }, // 28" x 30" x 30"
          items: [
            { name: "Frame", wood: "Beech", size: "Various", pieces: 1, price: "$70", image: "assets/items/frame.jpg" },
            { name: "Cushion", wood: "-", size: "Seat & Back", pieces: 2, price: "$50", image: "assets/items/cushions.jpg" },
            { name: "Fabric", wood: "-", size: "3 yards", pieces: 1, price: "$45", image: "assets/items/fabric.jpg" },
            { name: "Legs", wood: "Beech", size: "10 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
          ],
        },
        medium: { // Standard Armchair (32" x 34" x 32")
          dimensions: { width: 81, height: 86, depth: 81 }, // 32" x 34" x 32"
          items: [
            { name: "Frame", wood: "Beech", size: "Various", pieces: 1, price: "$90", image: "assets/items/frame.jpg" },
            { name: "Cushion", wood: "-", size: "Seat & Back", pieces: 2, price: "$60", image: "assets/items/cushions.jpg" },
            { name: "Fabric", wood: "-", size: "4 yards", pieces: 1, price: "$60", image: "assets/items/fabric.jpg" },
            { name: "Legs", wood: "Beech", size: "10 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
          ],
        },
        large: { // Oversized Lounge Chair (40" x 40" x 34")
          dimensions: { width: 102, height: 86, depth: 102 }, // 40" x 34" x 40"
          items: [
            { name: "Frame", wood: "Beech", size: "Various", pieces: 1, price: "$120", image: "assets/items/frame.jpg" },
            { name: "Cushion", wood: "-", size: "Seat & Back", pieces: 2, price: "$80", image: "assets/items/cushions.jpg" },
            { name: "Fabric", wood: "-", size: "6 yards", pieces: 1, price: "$90", image: "assets/items/fabric.jpg" },
            { name: "Legs", wood: "Beech", size: "10 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
          ],
        },
      },
      entertainment_center: {
        small: { // Narrow TV Stand (40" x 24" x 16")
          dimensions: { width: 102, height: 61, depth: 41 }, // 40" x 24" x 16"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "Various", pieces: 1, price: "$80", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "Various", pieces: 2, price: "$40", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "Various", pieces: 2, price: "$30", image: "assets/items/shelves.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$20", image: "assets/items/hardware.jpg" },
          ],
        },
        medium: { // Standard (60" x 24" x 20")
          dimensions: { width: 152, height: 61, depth: 51 }, // 60" x 24" x 20"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "Various", pieces: 1, price: "$120", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "Various", pieces: 2, price: "$60", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "Various", pieces: 3, price: "$45", image: "assets/items/shelves.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$25", image: "assets/items/hardware.jpg" },
          ],
        },
        large: { // Wall Unit (80" x 72" x 24")
          dimensions: { width: 203, height: 183, depth: 61 }, // 80" x 72" x 24"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "Various", pieces: 1, price: "$220", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "Various", pieces: 4, price: "$120", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "Various", pieces: 6, price: "$90", image: "assets/items/shelves.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$40", image: "assets/items/hardware.jpg" },
          ],
        },
      },
    },
    restaurant: {
      dining_table: {
        small: {
          items: [
            { name: "Tabletop", wood: "Teak", size: "120x80x2 cm", pieces: 1, price: "$70", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Teak", size: "75x5x5 cm", pieces: 4, price: "$50", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Tabletop", wood: "Teak", size: "180x90x2 cm", pieces: 1, price: "$100", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Teak", size: "75x5x5 cm", pieces: 4, price: "$50", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
      },
      bar_stool: {
        small: {
          items: [
            { name: "Seat", wood: "Oak", size: "30x30x2 cm", pieces: 1, price: "$20", image: "assets/items/seat.jpg" },
            { name: "Legs", wood: "Oak", size: "75x5x5 cm", pieces: 4, price: "$30", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 10, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
      },
    },
    lobby: {
      reception_desk: {
        small: {
          items: [
            { name: "Tabletop", wood: "Mahogany", size: "150x60x2 cm", pieces: 1, price: "$100", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Mahogany", size: "75x5x5 cm", pieces: 4, price: "$60", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        large: {
          items: [
            { name: "Tabletop", wood: "Mahogany", size: "200x80x2 cm", pieces: 1, price: "$150", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Mahogany", size: "75x5x5 cm", pieces: 4, price: "$60", image: "assets/items/legs.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
      },
    },
    bathroom: {
      vanity_cabinet: {
        small: { // Single Sink (36" x 21" x 34")
          dimensions: { width: 91, height: 86, depth: 53 }, // 36" x 34" x 21"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "91x53x86 cm", pieces: 1, price: "$120", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "45x70x2 cm", pieces: 2, price: "$60", image: "assets/items/door.jpg" },
            { name: "Countertop", wood: "Marble/Granite", size: "91x53x2 cm", pieces: 1, price: "$150", image: "assets/items/countertop.jpg" },
            { name: "Sink", wood: "-", size: "50x40x15 cm", pieces: 1, price: "$80", image: "assets/items/sink.jpg" },
            { name: "Faucet", wood: "-", size: "Standard", pieces: 1, price: "$60", image: "assets/items/faucet.jpg" },
            { name: "Drawer", wood: "MDF", size: "40x45x15 cm", pieces: 1, price: "$30", image: "assets/items/drawer.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$25", image: "assets/items/hardware.jpg" },
            { name: "Plumbing Kit", wood: "-", size: "Standard", pieces: 1, price: "$40", image: "assets/items/plumbing.jpg" },
          ],
        },
        medium: { // Double Sink (60" x 21" x 34")
          dimensions: { width: 152, height: 86, depth: 53 }, // 60" x 34" x 21"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "152x53x86 cm", pieces: 1, price: "$180", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "45x70x2 cm", pieces: 4, price: "$120", image: "assets/items/door.jpg" },
            { name: "Countertop", wood: "Marble/Granite", size: "152x53x2 cm", pieces: 1, price: "$250", image: "assets/items/countertop.jpg" },
            { name: "Sinks", wood: "-", size: "50x40x15 cm", pieces: 2, price: "$160", image: "assets/items/sink.jpg" },
            { name: "Faucets", wood: "-", size: "Standard", pieces: 2, price: "$120", image: "assets/items/faucet.jpg" },
            { name: "Drawers", wood: "MDF", size: "40x45x15 cm", pieces: 2, price: "$60", image: "assets/items/drawer.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$40", image: "assets/items/hardware.jpg" },
            { name: "Plumbing Kit", wood: "-", size: "Standard", pieces: 1, price: "$60", image: "assets/items/plumbing.jpg" },
          ],
        },
        large: { // Triple Sink (72" x 24" x 34") – Luxury option
          dimensions: { width: 183, height: 86, depth: 61 }, // 72" x 34" x 24"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "183x61x86 cm", pieces: 1, price: "$240", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "45x70x2 cm", pieces: 6, price: "$180", image: "assets/items/door.jpg" },
            { name: "Countertop", wood: "Marble/Granite", size: "183x61x2 cm", pieces: 1, price: "$350", image: "assets/items/countertop.jpg" },
            { name: "Sinks", wood: "-", size: "50x40x15 cm", pieces: 3, price: "$240", image: "assets/items/sink.jpg" },
            { name: "Faucets", wood: "-", size: "Standard", pieces: 3, price: "$180", image: "assets/items/faucet.jpg" },
            { name: "Drawers", wood: "MDF", size: "40x45x15 cm", pieces: 3, price: "$90", image: "assets/items/drawer.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$60", image: "assets/items/hardware.jpg" },
            { name: "Plumbing Kit", wood: "-", size: "Standard", pieces: 1, price: "$80", image: "assets/items/plumbing.jpg" },
          ],
        },
      },
      storage_shelf: {
        small: { // Wall-Mounted (24" x 12" x 36")
          dimensions: { width: 61, height: 91, depth: 30 }, // 24" x 36" x 12"
          items: [
            { name: "Shelves", wood: "Oak", size: "61x30x2 cm", pieces: 3, price: "$45", image: "assets/items/shelves.jpg" },
            { name: "Wall Brackets", wood: "-", size: "30 cm", pieces: 6, price: "$30", image: "assets/items/brackets.jpg" },
            { name: "Wall Anchors", wood: "-", size: "Standard", pieces: 6, price: "$10", image: "assets/items/anchors.jpg" },
            { name: "Screws", wood: "-", size: "Various", pieces: 12, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        medium: { // Freestanding (36" x 18" x 48")
          dimensions: { width: 91, height: 122, depth: 46 }, // 36" x 48" x 18"
          items: [
            { name: "Shelves", wood: "Oak", size: "91x46x2 cm", pieces: 4, price: "$80", image: "assets/items/shelves.jpg" },
            { name: "Side Panels", wood: "Oak", size: "122x46x2 cm", pieces: 2, price: "$60", image: "assets/items/panel.jpg" },
            { name: "Back Panel", wood: "Plywood", size: "91x122x1 cm", pieces: 1, price: "$30", image: "assets/items/panel.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$20", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
          ],
        },
        large: { // Tiered Ladder Shelf (48" x 24" x 72")
          dimensions: { width: 122, height: 183, depth: 61 }, // 48" x 72" x 24"
          items: [
            { name: "Shelves", wood: "Oak", size: "Various", pieces: 5, price: "$120", image: "assets/items/shelves.jpg" },
            { name: "Side Frames", wood: "Oak", size: "183x61x3 cm", pieces: 2, price: "$80", image: "assets/items/frame.jpg" },
            { name: "Support Bars", wood: "Oak", size: "120x5x5 cm", pieces: 3, price: "$45", image: "assets/items/bars.jpg" },
            { name: "Hardware", wood: "-", size: "Various", pieces: 1, price: "$30", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Wall Anchors", wood: "-", size: "Standard", pieces: 2, price: "$5", image: "assets/items/anchors.jpg" },
          ],
        },
      },
    },
    entryway: {
      console_table: {
        small: { // Narrow (36" x 12" x 30")
          dimensions: { width: 91, height: 76, depth: 30 }, // 36" x 30" x 12"
          items: [
            { name: "Tabletop", wood: "Oak", size: "91x30x2 cm", pieces: 1, price: "$35", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "75x5x5 cm", pieces: 4, price: "$40", image: "assets/items/legs.jpg" },
            { name: "Support Rails", wood: "Oak", size: "85x5x2 cm", pieces: 2, price: "$15", image: "assets/items/rails.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 16, price: "$4", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "100 ml", pieces: 1, price: "$5", image: "assets/items/glue.jpg" },
          ],
        },
        medium: { // Standard (48" x 16" x 32")
          dimensions: { width: 122, height: 81, depth: 41 }, // 48" x 32" x 16"
          items: [
            { name: "Tabletop", wood: "Oak", size: "122x41x2 cm", pieces: 1, price: "$45", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "80x6x6 cm", pieces: 4, price: "$50", image: "assets/items/legs.jpg" },
            { name: "Support Rails", wood: "Oak", size: "116x6x2 cm", pieces: 2, price: "$20", image: "assets/items/rails.jpg" },
            { name: "Drawer", wood: "Oak", size: "40x35x12 cm", pieces: 1, price: "$25", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handle", wood: "-", size: "10 cm", pieces: 1, price: "$5", image: "assets/items/handle.jpg" },
            { name: "Drawer Slides", wood: "-", size: "35 cm", pieces: 2, price: "$10", image: "assets/items/slides.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "150 ml", pieces: 1, price: "$7", image: "assets/items/glue.jpg" },
          ],
        },
        large: { // Extended (60" x 20" x 34") – With drawers
          dimensions: { width: 152, height: 86, depth: 51 }, // 60" x 34" x 20"
          items: [
            { name: "Tabletop", wood: "Oak", size: "152x51x3 cm", pieces: 1, price: "$60", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Oak", size: "85x7x7 cm", pieces: 4, price: "$60", image: "assets/items/legs.jpg" },
            { name: "Support Rails", wood: "Oak", size: "146x7x3 cm", pieces: 2, price: "$25", image: "assets/items/rails.jpg" },
            { name: "Drawers", wood: "Oak", size: "50x45x15 cm", pieces: 2, price: "$50", image: "assets/items/drawer.jpg" },
            { name: "Drawer Handles", wood: "-", size: "12 cm", pieces: 2, price: "$10", image: "assets/items/handle.jpg" },
            { name: "Drawer Slides", wood: "-", size: "45 cm", pieces: 4, price: "$20", image: "assets/items/slides.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Wood Glue", wood: "-", size: "200 ml", pieces: 1, price: "$8", image: "assets/items/glue.jpg" },
            { name: "Lower Shelf", wood: "Oak", size: "146x45x2 cm", pieces: 1, price: "$30", image: "assets/items/shelf.jpg" },
          ],
        },
      },
      shoe_cabinet: {
        small: { // 2-Tier (24" x 12" x 24")
          dimensions: { width: 61, height: 61, depth: 30 }, // 24" x 24" x 12"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "61x30x61 cm", pieces: 1, price: "$40", image: "assets/items/cabinet.jpg" },
            { name: "Door", wood: "MDF", size: "61x61x1.8 cm", pieces: 1, price: "$25", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "59x28x1.5 cm", pieces: 2, price: "$15", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "Standard", pieces: 2, price: "$5", image: "assets/items/hinges.jpg" },
            { name: "Door Handle", wood: "-", size: "10 cm", pieces: 1, price: "$5", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 15, price: "$4", image: "assets/items/screws.jpg" },
          ],
        },
        medium: { // 4-Tier (36" x 15" x 34")
          dimensions: { width: 91, height: 86, depth: 38 }, // 36" x 34" x 15"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "91x38x86 cm", pieces: 1, price: "$60", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "45x86x1.8 cm", pieces: 2, price: "$40", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "89x36x1.5 cm", pieces: 4, price: "$30", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "Standard", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Door Handles", wood: "-", size: "10 cm", pieces: 2, price: "$8", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Adjustable Feet", wood: "-", size: "5 cm", pieces: 4, price: "$8", image: "assets/items/feet.jpg" },
          ],
        },
        large: { // 6-Tier (48" x 18" x 48")
          dimensions: { width: 122, height: 122, depth: 46 }, // 48" x 48" x 18"
          items: [
            { name: "Cabinet Box", wood: "Plywood", size: "122x46x122 cm", pieces: 1, price: "$80", image: "assets/items/cabinet.jpg" },
            { name: "Doors", wood: "MDF", size: "60x122x1.8 cm", pieces: 2, price: "$60", image: "assets/items/door.jpg" },
            { name: "Shelves", wood: "Plywood", size: "120x44x1.5 cm", pieces: 6, price: "$45", image: "assets/items/shelves.jpg" },
            { name: "Hinges", wood: "-", size: "Standard", pieces: 4, price: "$10", image: "assets/items/hinges.jpg" },
            { name: "Door Handles", wood: "-", size: "12 cm", pieces: 2, price: "$10", image: "assets/items/handle.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$7", image: "assets/items/screws.jpg" },
            { name: "Adjustable Feet", wood: "-", size: "5 cm", pieces: 4, price: "$8", image: "assets/items/feet.jpg" },
            { name: "Center Divider", wood: "Plywood", size: "122x44x1.8 cm", pieces: 1, price: "$15", image: "assets/items/panel.jpg" },
          ],
        },
      },
    },
    outdoor: {
      outdoor_sofa: {
        small: { // 2-Seater (60" x 36" x 34")
          dimensions: { width: 152, height: 86, depth: 91 }, // 60" x 34" x 36"
          items: [
            { name: "Frame", wood: "Teak", size: "Various", pieces: 1, price: "$180", image: "assets/items/frame.jpg" },
            { name: "Weather-Resistant Cushions", wood: "-", size: "Seat & Back", pieces: 3, price: "$120", image: "assets/items/cushions.jpg" },
            { name: "Outdoor Fabric", wood: "-", size: "5 yards", pieces: 1, price: "$100", image: "assets/items/fabric.jpg" },
            { name: "Stainless Steel Hardware", wood: "-", size: "Various", pieces: 1, price: "$30", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Weather Sealant", wood: "-", size: "500 ml", pieces: 1, price: "$25", image: "assets/items/sealant.jpg" },
          ],
        },
        medium: { // 3-Seater (84" x 36" x 34")
          dimensions: { width: 213, height: 86, depth: 91 }, // 84" x 34" x 36"
          items: [
            { name: "Frame", wood: "Teak", size: "Various", pieces: 1, price: "$240", image: "assets/items/frame.jpg" },
            { name: "Weather-Resistant Cushions", wood: "-", size: "Seat & Back", pieces: 4, price: "$160", image: "assets/items/cushions.jpg" },
            { name: "Outdoor Fabric", wood: "-", size: "7 yards", pieces: 1, price: "$140", image: "assets/items/fabric.jpg" },
            { name: "Stainless Steel Hardware", wood: "-", size: "Various", pieces: 1, price: "$40", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 30, price: "$7", image: "assets/items/screws.jpg" },
            { name: "Weather Sealant", wood: "-", size: "750 ml", pieces: 1, price: "$35", image: "assets/items/sealant.jpg" },
          ],
        },
        large: { // Sectional (120" x 90" x 34")
          dimensions: { width: 305, height: 86, depth: 229 }, // 120" x 34" x 90"
          items: [
            { name: "Frame", wood: "Teak", size: "Various", pieces: 1, price: "$350", image: "assets/items/frame.jpg" },
            { name: "Weather-Resistant Cushions", wood: "-", size: "Seat & Back", pieces: 6, price: "$240", image: "assets/items/cushions.jpg" },
            { name: "Outdoor Fabric", wood: "-", size: "12 yards", pieces: 1, price: "$240", image: "assets/items/fabric.jpg" },
            { name: "Stainless Steel Hardware", wood: "-", size: "Various", pieces: 1, price: "$60", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 40, price: "$10", image: "assets/items/screws.jpg" },
            { name: "Weather Sealant", wood: "-", size: "1000 ml", pieces: 1, price: "$45", image: "assets/items/sealant.jpg" },
            { name: "Corner Connector", wood: "Teak", size: "Standard", pieces: 1, price: "$35", image: "assets/items/connector.jpg" },
          ],
        },
      },
      outdoor_dining_table: {
        small: { // Foldable (48" x 30" x 30")
          dimensions: { width: 122, height: 76, depth: 76 }, // 48" x 30" x 30"
          items: [
            { name: "Tabletop", wood: "Teak", size: "122x76x3 cm", pieces: 1, price: "$80", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Teak", size: "75x5x5 cm", pieces: 4, price: "$60", image: "assets/items/legs.jpg" },
            { name: "Folding Mechanism", wood: "-", size: "Standard", pieces: 2, price: "$40", image: "assets/items/mechanism.jpg" },
            { name: "Stainless Steel Hardware", wood: "-", size: "Various", pieces: 1, price: "$25", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 20, price: "$5", image: "assets/items/screws.jpg" },
            { name: "Weather Sealant", wood: "-", size: "500 ml", pieces: 1, price: "$25", image: "assets/items/sealant.jpg" },
          ],
        },
        medium: { // Standard (72" x 36" x 30")
          dimensions: { width: 183, height: 76, depth: 91 }, // 72" x 30" x 36"
          items: [
            { name: "Tabletop", wood: "Teak", size: "183x91x3 cm", pieces: 1, price: "$120", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Teak", size: "75x6x6 cm", pieces: 4, price: "$80", image: "assets/items/legs.jpg" },
            { name: "Support Beam", wood: "Teak", size: "170x8x4 cm", pieces: 1, price: "$40", image: "assets/items/beam.jpg" },
            { name: "Stainless Steel Hardware", wood: "-", size: "Various", pieces: 1, price: "$35", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 25, price: "$6", image: "assets/items/screws.jpg" },
            { name: "Weather Sealant", wood: "-", size: "750 ml", pieces: 1, price: "$35", image: "assets/items/sealant.jpg" },
          ],
        },
        large: { // Picnic-Style (96" x 48" x 30")
          dimensions: { width: 244, height: 76, depth: 122 }, // 96" x 30" x 48"
          items: [
            { name: "Tabletop", wood: "Teak", size: "244x122x4 cm", pieces: 1, price: "$180", image: "assets/items/tabletop.jpg" },
            { name: "Legs", wood: "Teak", size: "75x8x8 cm", pieces: 4, price: "$100", image: "assets/items/legs.jpg" },
            { name: "Support Beams", wood: "Teak", size: "230x10x5 cm", pieces: 2, price: "$80", image: "assets/items/beam.jpg" },
            { name: "Bench Seats", wood: "Teak", size: "244x30x4 cm", pieces: 2, price: "$120", image: "assets/items/bench.jpg" },
            { name: "Bench Legs", wood: "Teak", size: "45x8x8 cm", pieces: 8, price: "$120", image: "assets/items/legs.jpg" },
            { name: "Stainless Steel Hardware", wood: "-", size: "Various", pieces: 1, price: "$50", image: "assets/items/hardware.jpg" },
            { name: "Wood Screws", wood: "-", size: "3-4 cm", pieces: 40, price: "$10", image: "assets/items/screws.jpg" },
            { name: "Weather Sealant", wood: "-", size: "1000 ml", pieces: 1, price: "$45", image: "assets/items/sealant.jpg" },
          ],
        },
      },
    },
  };