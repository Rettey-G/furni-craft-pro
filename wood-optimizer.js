// Wood Cutting Optimizer for FurniCraft Pro
document.addEventListener('DOMContentLoaded', function() {
  // Constants
  const SHEET_WIDTH = 2440; // Standard plywood width in cm
  const SHEET_HEIGHT = 1220; // Standard plywood height in cm
  const CUT_COST = 10; // Cost per cut in MVR
  const TEAK_COST = 20; // Cost per teak finish in MVR
  const PLYWOOD_COST = 450; // Cost per plywood sheet in MVR

  // DOM Elements
  const addPartButton = document.getElementById('add-part-button');
  const partsTableBody = document.getElementById('parts-table-body');
  const optimizationCanvas = document.getElementById('optimization-canvas');
  const optimizeButton = document.getElementById('optimize-button');
  const saveQuotationButton = document.getElementById('save-quotation-button');
  const printQuotationButton = document.getElementById('print-quotation-button');
  const subscriptionBadge = document.getElementById('subscription-badge');
  const usageInfo = document.getElementById('usage-info');
  const showSubscriptionModal = document.getElementById('show-subscription-modal');
  const closeSubscriptionModal = document.getElementById('close-subscription-modal');
  const subscriptionModal = document.getElementById('subscription-modal');
  const freePlan = document.getElementById('free-plan');
  const standardPlan = document.getElementById('standard-plan');
  const premiumPlan = document.getElementById('premium-plan');
  
  // Canvas context
  const ctx = optimizationCanvas.getContext('2d');
  
  // State variables
  let parts = [];
  let currentSubscription = 'free';
  let remainingOptimizations = 2;
  let optimizationResult = null;
  
  // Initialize
  updateSubscriptionDisplay();
  drawEmptySheet();
  
  // Event Listeners
  addPartButton.addEventListener('click', addPart);
  optimizeButton.addEventListener('click', optimizeCutting);
  saveQuotationButton.addEventListener('click', saveQuotation);
  printQuotationButton.addEventListener('click', printQuotation);
  showSubscriptionModal.addEventListener('click', openSubscriptionModal);
  closeSubscriptionModal.addEventListener('click', closeModal);
  
  // Add click handlers for subscription plan buttons
  document.querySelectorAll('.select-plan-button').forEach(button => {
    button.addEventListener('click', function() {
      const plan = this.getAttribute('data-plan');
      if (plan !== currentSubscription) {
        updateSubscription(plan);
        closeModal();
      }
    });
  });
  
  // Add part to the list
  function addPart() {
    const nameInput = document.getElementById('part-name');
    const widthInput = document.getElementById('part-width');
    const heightInput = document.getElementById('part-height');
    const quantityInput = document.getElementById('part-quantity');
    const teakSelect = document.getElementById('part-teak');
    
    const name = nameInput.value.trim();
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const quantity = parseInt(quantityInput.value);
    const teak = teakSelect.value === 'yes';
    
    // Validate inputs
    if (!name || isNaN(width) || isNaN(height) || isNaN(quantity) || width <= 0 || height <= 0 || quantity <= 0) {
      alert('Please enter valid values for all fields.');
      return;
    }
    
    // Check if dimensions are within sheet size
    if (width > SHEET_WIDTH || height > SHEET_HEIGHT) {
      alert(`Part dimensions must be within sheet size (${SHEET_WIDTH}cm x ${SHEET_HEIGHT}cm).`);
      return;
    }
    
    // Check subscription limits
    if (currentSubscription === 'free' && parts.length >= 5) {
      alert('Free plan is limited to 5 parts per project. Please upgrade to add more parts.');
      openSubscriptionModal();
      return;
    }
    
    if (currentSubscription === 'standard' && parts.length >= 20) {
      alert('Standard plan is limited to 20 parts per project. Please upgrade to add more parts.');
      openSubscriptionModal();
      return;
    }
    
    // Add part to the list
    const part = {
      id: Date.now(), // Unique ID
      name,
      width,
      height,
      quantity,
      teak,
      area: width * height * quantity
    };
    
    parts.push(part);
    renderPartsTable();
    clearPartForm();
    
    // Reset optimization when parts change
    optimizationResult = null;
    drawEmptySheet();
    updateQuotation();
  }
  
  // Render parts table
  function renderPartsTable() {
    partsTableBody.innerHTML = '';
    
    if (parts.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="6" style="text-align: center;">No parts added yet</td>';
      partsTableBody.appendChild(row);
      return;
    }
    
    parts.forEach(part => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${part.name}</td>
        <td>${part.width}</td>
        <td>${part.height}</td>
        <td>${part.quantity}</td>
        <td>${part.teak ? 'Yes' : 'No'}</td>
        <td><i class="fas fa-trash remove-part" data-id="${part.id}"></i></td>
      `;
      partsTableBody.appendChild(row);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-part').forEach(button => {
      button.addEventListener('click', function() {
        const partId = parseInt(this.getAttribute('data-id'));
        removePart(partId);
      });
    });
  }
  
  // Remove part from the list
  function removePart(partId) {
    parts = parts.filter(part => part.id !== partId);
    renderPartsTable();
    
    // Reset optimization when parts change
    optimizationResult = null;
    drawEmptySheet();
    updateQuotation();
  }
  
  // Clear part form
  function clearPartForm() {
    document.getElementById('part-name').value = '';
    document.getElementById('part-width').value = '';
    document.getElementById('part-height').value = '';
    document.getElementById('part-quantity').value = '1';
    document.getElementById('part-teak').value = 'no';
    document.getElementById('part-name').focus();
  }
  
  // Draw empty sheet
  function drawEmptySheet() {
    // Clear canvas
    ctx.clearRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
    
    // Calculate scale factor to fit sheet in canvas
    const scaleX = optimizationCanvas.width / SHEET_WIDTH;
    const scaleY = optimizationCanvas.height / SHEET_HEIGHT;
    
    // Draw sheet outline
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines (every 100cm)
    for (let x = 100; x < SHEET_WIDTH; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x * scaleX, 0);
      ctx.lineTo(x * scaleX, optimizationCanvas.height);
      ctx.stroke();
    }
    
    // Horizontal grid lines (every 100cm)
    for (let y = 100; y < SHEET_HEIGHT; y += 100) {
      ctx.beginPath();
      ctx.moveTo(0, y * scaleY);
      ctx.lineTo(optimizationCanvas.width, y * scaleY);
      ctx.stroke();
    }
    
    // Draw dimensions
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText(`${SHEET_WIDTH}cm`, optimizationCanvas.width / 2, optimizationCanvas.height - 5);
    ctx.fillText(`${SHEET_HEIGHT}cm`, 5, optimizationCanvas.height / 2);
    
    // Update utilization info
    document.getElementById('utilization-percentage').textContent = '0%';
    document.getElementById('waste-area').textContent = `${SHEET_WIDTH * SHEET_HEIGHT} cm²`;
  }
  
  // Optimize cutting layout
  function optimizeCutting() {
    if (parts.length === 0) {
      alert('Please add at least one part to optimize.');
      return;
    }
    
    // Check remaining optimizations
    if (currentSubscription === 'free' && remainingOptimizations <= 0) {
      alert('You have used all your free optimizations. Please upgrade to continue.');
      openSubscriptionModal();
      return;
    }
    
    if (currentSubscription === 'standard' && remainingOptimizations <= 0) {
      alert('You have used all your optimizations. Please upgrade to continue.');
      openSubscriptionModal();
      return;
    }
    
    // Decrement remaining optimizations if not premium
    if (currentSubscription !== 'premium') {
      remainingOptimizations--;
      updateSubscriptionDisplay();
    }
    
    // Show loading indicator
    const optimizationCanvas = document.getElementById('optimization-canvas');
    if (optimizationCanvas) {
      const ctx = optimizationCanvas.getContext('2d');
      ctx.clearRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
      ctx.fillStyle = '#333';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Optimizing cutting layout...', optimizationCanvas.width/2, optimizationCanvas.height/2);
    }
    
    // Use setTimeout to allow the UI to update before heavy computation
    setTimeout(() => {
      // Prepare parts for optimization (expand quantities)
      const expandedParts = [];
      parts.forEach(part => {
        for (let i = 0; i < part.quantity; i++) {
          expandedParts.push({
            id: part.id,
            name: part.name,
            width: part.width,
            height: part.height,
            teak: part.teak,
            area: part.width * part.height
          });
        }
      });
      
      // Try both orientations for each part (rotate if needed)
      const partsWithRotation = [];
      expandedParts.forEach(part => {
        // Add original orientation
        partsWithRotation.push(part);
        
        // Add rotated orientation if width != height
        if (part.width !== part.height) {
          partsWithRotation.push({
            ...part,
            width: part.height,
            height: part.width,
            rotated: true
          });
        }
      });
      
      // Sort parts by area (largest first) for better packing
      partsWithRotation.sort((a, b) => b.area - a.area);
      
      // Simple bin packing algorithm (First Fit Decreasing)
      const sheets = [{
        width: SHEET_WIDTH,
        height: SHEET_HEIGHT,
        used: [],
        remaining: SHEET_WIDTH * SHEET_HEIGHT
      }];
      
      // Try to place each part
      partsWithRotation.forEach(part => {
        // Skip duplicates (rotated versions of already placed parts)
        const originalPart = parts.find(p => p.id === part.id);
        const alreadyPlacedCount = sheets.flatMap(s => s.used)
          .filter(p => p.id === part.id)
          .length;
          
        if (alreadyPlacedCount >= originalPart.quantity) {
          return; // Skip this part as we've already placed enough
        }
        
        let placed = false;
        
        // Try to place in existing sheets
        for (let i = 0; i < sheets.length; i++) {
          const sheet = sheets[i];
          
          if (canPlacePart(sheet, part)) {
            placed = placePart(sheet, part);
            if (placed) break;
          }
        }
        
        // If not placed, add a new sheet
        if (!placed) {
          const newSheet = {
            width: SHEET_WIDTH,
            height: SHEET_HEIGHT,
            used: [],
            remaining: SHEET_WIDTH * SHEET_HEIGHT
          };
          
          placePart(newSheet, part);
          sheets.push(newSheet);
        }
      });
    
    // Store optimization result
    optimizationResult = {
      sheets,
      totalSheets: sheets.length,
      totalArea: expandedParts.reduce((sum, part) => sum + part.area, 0),
      sheetArea: SHEET_WIDTH * SHEET_HEIGHT,
      utilization: (expandedParts.reduce((sum, part) => sum + part.area, 0) / (sheets.length * SHEET_WIDTH * SHEET_HEIGHT)) * 100
    };
    
      // Draw the first sheet
      drawOptimizedSheet(sheets[0]);
      
      // Update quotation
      updateQuotation();
    }, 100);
  }
  
  // Check if a part can be placed in a sheet
  function canPlacePart(sheet, part) {
    // Check if there's enough total area remaining
    if (sheet.remaining < part.area) {
      return false;
    }
    
    // Check if there's a free space large enough for this part
    // This is a more realistic implementation that checks actual available space
    const potentialPositions = findPotentialPositions(sheet, part);
    return potentialPositions.length > 0;
  }
  
  // Find potential positions for a part in a sheet
  function findPotentialPositions(sheet, part) {
    const positions = [];
    
    // If this is the first part, just place it at the origin
    if (sheet.used.length === 0) {
      positions.push({ x: 0, y: 0 });
      return positions;
    }
    
    // Try positions next to existing parts
    const maxX = SHEET_WIDTH - part.width;
    const maxY = SHEET_HEIGHT - part.height;
    
    // Create a grid of potential positions to check
    const step = 10; // Check every 10cm for efficiency
    for (let x = 0; x <= maxX; x += step) {
      for (let y = 0; y <= maxY; y += step) {
        let overlaps = false;
        
        // Check if this position overlaps with any existing part
        for (const usedPart of sheet.used) {
          if (
            x < usedPart.x + usedPart.width &&
            x + part.width > usedPart.x &&
            y < usedPart.y + usedPart.height &&
            y + part.height > usedPart.y
          ) {
            overlaps = true;
            break;
          }
        }
        
        if (!overlaps) {
          positions.push({ x, y });
        }
      }
    }
    
    return positions;
  }
  
  // Place a part in a sheet
  function placePart(sheet, part) {
    // Find the best position for this part
    const positions = findPotentialPositions(sheet, part);
    
    if (positions.length === 0) {
      console.error('No valid position found for part', part);
      return false;
    }
    
    // Choose the best position (top-left first strategy)
    // Sort positions by y first, then x
    positions.sort((a, b) => {
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });
    
    const bestPosition = positions[0];
    
    // Place the part
    sheet.used.push({
      ...part,
      x: bestPosition.x,
      y: bestPosition.y
    });
    
    sheet.remaining -= part.area;
    return true;
  }
  
  // Draw optimized sheet
  function drawOptimizedSheet(sheet) {
    // Clear canvas
    ctx.clearRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
    
    // Calculate scale factor to fit sheet in canvas
    const scaleX = optimizationCanvas.width / SHEET_WIDTH;
    const scaleY = optimizationCanvas.height / SHEET_HEIGHT;
    
    // Draw sheet outline
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
    
    // Add sheet dimensions as text
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText(`${SHEET_WIDTH}cm`, optimizationCanvas.width / 2 - 20, optimizationCanvas.height - 5);
    ctx.fillText(`${SHEET_HEIGHT}cm`, 5, optimizationCanvas.height / 2);
    
    // Draw grid lines (every 100cm)
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    for (let x = 100; x < SHEET_WIDTH; x += 100) {
      const scaledX = x * scaleX;
      ctx.beginPath();
      ctx.moveTo(scaledX, 0);
      ctx.lineTo(scaledX, optimizationCanvas.height);
      ctx.stroke();
    }
    for (let y = 100; y < SHEET_HEIGHT; y += 100) {
      const scaledY = y * scaleY;
      ctx.beginPath();
      ctx.moveTo(0, scaledY);
      ctx.lineTo(optimizationCanvas.width, scaledY);
      ctx.stroke();
    }
    
    // Draw placed parts
    sheet.used.forEach((part, index) => {
      // Calculate scaled position and dimensions
      const x = part.x * scaleX;
      const y = part.y * scaleY;
      const width = part.width * scaleX;
      const height = part.height * scaleY;
      
      // Draw part rectangle
      ctx.fillStyle = getColorForPart(index);
      ctx.fillRect(x, y, width, height);
      
      // Draw part outline
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      
      // Draw part name and dimensions if enough space
      if (width > 50 && height > 20) {
        ctx.fillStyle = '#fff';
        ctx.font = '10px Arial';
        ctx.fillText(part.name, x + 5, y + 15);
        ctx.fillText(`${part.width}x${part.height}`, x + 5, y + 30);
        
        // Draw teak indicator if applicable
        if (part.teak) {
          ctx.fillText('Teak', x + 5, y + 45);
        }
      }
    });
    
    // Draw cut lines
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    
    // Vertical cut lines
    const usedXCoordinates = new Set();
    sheet.used.forEach(part => {
      usedXCoordinates.add(part.x);
      usedXCoordinates.add(part.x + part.width);
    });
    
    [...usedXCoordinates].sort((a, b) => a - b).forEach(x => {
      if (x > 0 && x < SHEET_WIDTH) {
        ctx.beginPath();
        ctx.moveTo(x * scaleX, 0);
        ctx.lineTo(x * scaleX, optimizationCanvas.height);
        ctx.stroke();
      }
    });
    
    // Horizontal cut lines
    const usedYCoordinates = new Set();
    sheet.used.forEach(part => {
      usedYCoordinates.add(part.y);
      usedYCoordinates.add(part.y + part.height);
    });
    
    [...usedYCoordinates].sort((a, b) => a - b).forEach(y => {
      if (y > 0 && y < SHEET_HEIGHT) {
        ctx.beginPath();
        ctx.moveTo(0, y * scaleY);
        ctx.lineTo(optimizationCanvas.width, y * scaleY);
        ctx.stroke();
      }
    });
    
    ctx.setLineDash([]);
    
    // Update utilization info
    const utilization = (sheet.used.reduce((sum, part) => sum + part.area, 0) / (SHEET_WIDTH * SHEET_HEIGHT)) * 100;
    document.getElementById('utilization-percentage').textContent = `${utilization.toFixed(2)}%`;
    document.getElementById('waste-area').textContent = `${(SHEET_WIDTH * SHEET_HEIGHT - sheet.used.reduce((sum, part) => sum + part.area, 0)).toFixed(2)} cm²`;
  }
  
  // Get color for part based on index
  function getColorForPart(index) {
    const colors = [
      '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
      '#1abc9c', '#d35400', '#c0392b', '#16a085', '#8e44ad',
      '#27ae60', '#2980b9', '#f1c40f', '#e67e22', '#34495e'
    ];
    
    return colors[index % colors.length];
  }
  
  // Update quotation
  function updateQuotation() {
    if (!optimizationResult) {
      document.getElementById('sheets-cost').textContent = '0.00 MVR';
      document.getElementById('cutting-cost').textContent = '0.00 MVR';
      document.getElementById('teak-cost').textContent = '0.00 MVR';
      document.getElementById('total-cost').textContent = '0.00 MVR';
      document.getElementById('quotation-details').innerHTML = '<p>No optimization performed yet. Click "Optimize Cutting" to generate a quotation.</p>';
      return;
    }
    
    // Calculate costs
    const sheetsCost = optimizationResult.totalSheets * PLYWOOD_COST;
    
    // Count cuts (simplified)
    let totalCuts = 0;
    optimizationResult.sheets.forEach(sheet => {
      // Vertical cuts
      const uniqueXs = new Set();
      sheet.used.forEach(part => {
        uniqueXs.add(part.x);
        uniqueXs.add(part.x + part.width);
      });
      totalCuts += uniqueXs.size - 2; // Subtract sheet edges
      
      // Horizontal cuts
      const uniqueYs = new Set();
      sheet.used.forEach(part => {
        uniqueYs.add(part.y);
        uniqueYs.add(part.y + part.height);
      });
      totalCuts += uniqueYs.size - 2; // Subtract sheet edges
    });
    totalCuts = Math.max(0, totalCuts);
    
    const cuttingCost = totalCuts * CUT_COST;
    
    // Calculate teak cost
    const teakParts = parts.filter(part => part.teak);
    const teakArea = teakParts.reduce((sum, part) => sum + (part.width * part.height * part.quantity), 0);
    const teakCost = teakArea * TEAK_COST / 10000; // Convert to square meters
    
    // Total cost
    const totalCost = sheetsCost + cuttingCost + teakCost;
    
    // Update summary
    document.getElementById('sheets-cost').textContent = `${sheetsCost.toFixed(2)} MVR`;
    document.getElementById('cutting-cost').textContent = `${cuttingCost.toFixed(2)} MVR`;
    document.getElementById('teak-cost').textContent = `${teakCost.toFixed(2)} MVR`;
    document.getElementById('total-cost').textContent = `${totalCost.toFixed(2)} MVR`;
    
    // Update details
    let detailsHTML = `
      <p><strong>Plywood Sheets:</strong> ${optimizationResult.totalSheets} x ${PLYWOOD_COST} MVR = ${sheetsCost.toFixed(2)} MVR</p>
      <p><strong>Cuts:</strong> ${totalCuts} x ${CUT_COST} MVR = ${cuttingCost.toFixed(2)} MVR</p>
    `;
    
    if (teakParts.length > 0) {
      detailsHTML += `<p><strong>Teak Finish:</strong> ${(teakArea / 10000).toFixed(2)} m² x ${TEAK_COST} MVR = ${teakCost.toFixed(2)} MVR</p>`;
      detailsHTML += '<p><strong>Teak Parts:</strong></p><ul>';
      
      teakParts.forEach(part => {
        detailsHTML += `<li>${part.name} (${part.width}x${part.height}cm) x ${part.quantity}</li>`;
      });
      
      detailsHTML += '</ul>';
    }
    
    detailsHTML += `<p><strong>Material Utilization:</strong> ${optimizationResult.utilization.toFixed(2)}%</p>`;
    
    document.getElementById('quotation-details').innerHTML = detailsHTML;
  }
  
  // Save quotation
  function saveQuotation() {
    if (!optimizationResult) {
      alert('Please optimize cutting first to generate a quotation.');
      return;
    }
    
    // Check subscription for save feature
    if (currentSubscription === 'free') {
      alert('Saving quotations is available in Standard and Premium plans. Please upgrade to save your quotation.');
      openSubscriptionModal();
      return;
    }
    
    // In a real implementation, this would save to the database
    alert('Quotation saved successfully!');
  }
  
  // Print quotation
  function printQuotation() {
    if (!optimizationResult) {
      alert('Please optimize cutting first to generate a quotation.');
      return;
    }
    
    // Prepare print content
    const printWindow = window.open('', '_blank');
    
    // Calculate costs for print
    const sheetsCost = optimizationResult.totalSheets * PLYWOOD_COST;
    let totalCuts = 0;
    optimizationResult.sheets.forEach(sheet => {
      const uniqueXs = new Set();
      sheet.used.forEach(part => {
        uniqueXs.add(part.x);
        uniqueXs.add(part.x + part.width);
      });
      totalCuts += uniqueXs.size - 2;
      
      const uniqueYs = new Set();
      sheet.used.forEach(part => {
        uniqueYs.add(part.y);
        uniqueYs.add(part.y + part.height);
      });
      totalCuts += uniqueYs.size - 2;
    });
    totalCuts = Math.max(0, totalCuts);
    
    const cuttingCost = totalCuts * CUT_COST;
    const teakParts = parts.filter(part => part.teak);
    const teakArea = teakParts.reduce((sum, part) => sum + (part.width * part.height * part.quantity), 0);
    const teakCost = teakArea * TEAK_COST / 10000;
    const totalCost = sheetsCost + cuttingCost + teakCost;
    
    // Create print content
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Wood Cutting Quotation - FurniCraft Pro</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          .section { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .total-row { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Wood Cutting Quotation</h1>
        <div class="section">
          <h2>Project Summary</h2>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Total Sheets: ${optimizationResult.totalSheets}</p>
          <p>Material Utilization: ${optimizationResult.utilization.toFixed(2)}%</p>
        </div>
        
        <div class="section">
          <h2>Parts List</h2>
          <table>
            <thead>
              <tr>
                <th>Part Name</th>
                <th>Dimensions</th>
                <th>Quantity</th>
                <th>Teak Finish</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              ${parts.map(part => `
                <tr>
                  <td>${part.name}</td>
                  <td>${part.width}cm x ${part.height}cm</td>
                  <td>${part.quantity}</td>
                  <td>${part.teak ? 'Yes' : 'No'}</td>
                  <td>${(part.width * part.height * part.quantity).toFixed(2)} cm²</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Cost Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
                <th>Cost (MVR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plywood Sheets</td>
                <td>${optimizationResult.totalSheets} x ${PLYWOOD_COST} MVR</td>
                <td>${sheetsCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Cutting</td>
                <td>${totalCuts} cuts x ${CUT_COST} MVR</td>
                <td>${cuttingCost.toFixed(2)}</td>
              </tr>
              ${teakParts.length > 0 ? `
                <tr>
                  <td>Teak Finish</td>
                  <td>${(teakArea / 10000).toFixed(2)} m² x ${TEAK_COST} MVR</td>
                  <td>${teakCost.toFixed(2)}</td>
                </tr>
              ` : ''}
              <tr class="total-row">
                <td colspan="2">Total</td>
                <td>${totalCost.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <p><strong>Note:</strong> This quotation is valid for 30 days. Prices include taxes.</p>
          <p>FurniCraft Pro - Professional Furniture Design Solutions</p>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  
  // Update subscription display
  function updateSubscriptionDisplay() {
    // Update badge
    subscriptionBadge.className = 'subscription-badge';
    subscriptionBadge.classList.add(`badge-${currentSubscription}`);
    subscriptionBadge.textContent = currentSubscription.charAt(0).toUpperCase() + currentSubscription.slice(1);
    
    // Update usage info
    if (currentSubscription === 'premium') {
      usageInfo.textContent = 'Unlimited optimizations';
    } else {
      usageInfo.textContent = `${remainingOptimizations} optimization${remainingOptimizations !== 1 ? 's' : ''} remaining`;
    }
    
    // Update plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
      card.classList.remove('current-plan');
    });
    
    document.getElementById(`${currentSubscription}-plan`).classList.add('current-plan');
    document.querySelectorAll('.select-plan-button').forEach(button => {
      button.textContent = 'Select Plan';
    });
    document.querySelector(`#${currentSubscription}-plan .select-plan-button`).textContent = 'Current Plan';
  }
  
  // Update subscription
  function updateSubscription(plan) {
    // In a real implementation, this would call the server API
    currentSubscription = plan;
    
    // Update remaining optimizations based on plan
    if (plan === 'free') {
      remainingOptimizations = 2;
    } else if (plan === 'standard') {
      remainingOptimizations = 10;
    } else if (plan === 'premium') {
      remainingOptimizations = Infinity;
    }
    
    updateSubscriptionDisplay();
    alert(`Your subscription has been updated to ${plan.charAt(0).toUpperCase() + plan.slice(1)}.`);
  }
  
  // Open subscription modal
  function openSubscriptionModal() {
    subscriptionModal.style.display = 'flex';
  }
  
  // Close modal
  function closeModal() {
    subscriptionModal.style.display = 'none';
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === subscriptionModal) {
      closeModal();
    }
  });
});
