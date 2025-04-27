# FurniCraft Pro Cleanup and Reorganization Plan

## HTML Files to Keep (Primary Files)
- index.html (Landing page)
- home.html (Main dashboard)
- selection.html (Latest version with translations)
- shop.html (With Maldivian vendors and translations)
- room-calculator.html (With 3D visualization)
- ceiling-calculator.html
- 2d-to-3d-v2.html (Latest version with drag-drop fixes)
- wood-optimizer-v3.html (Latest version)

## HTML Files to Archive (Older Versions)
- selection-v2.html
- selection-fixed.html
- shop-fixed.html
- shop-new.html
- shop-working.html
- 2d-to-3d.html (Older version)
- wood-optimizer.html (Older version)
- wood-optimizer-v2.html (Older version)

## JavaScript Files to Keep
- translations.js (For Maldivian language support)
- language-switcher.js (For language switching)
- direct-language-switcher.js (For floating language switcher)
- common-nav.js (For consistent navigation)
- 3d-viewer-enhanced.js (Improved 3D visualization)
- database.js (Product database)
- mongodb-connect.js (Database connection)
- mongo-data-service.js (Data service)
- server.js (Backend API)
- netlify.js (Deployment helper)

## JavaScript Files to Archive
- improved-nav.js (Replaced by common-nav.js)
- 3d-viewer.js (Replaced by enhanced version)

## CSS Files to Keep
- common-nav.css (For consistent navigation)
- styles.css (Global styles)
- selection.css
- home.css
- 3d-viewer.css
- 2d-to-3d-v2.css

## CSS Files to Archive
- improved-nav.css (Replaced by common-nav.css)

## Consistent Script Loading Order
For all HTML files, use this order:
1. translations.js
2. language-switcher.js
3. direct-language-switcher.js
4. [page-specific JS files]
5. common-nav.js
6. netlify.js

## Consistent CSS Loading Order
For all HTML files, use this order:
1. styles.css
2. common-nav.css
3. [page-specific CSS files]
4. Font Awesome

## Ensure All Pages Have:
- Maldivian language support
- Consistent navigation
- Proper links to all main pages
- Netlify deployment support
