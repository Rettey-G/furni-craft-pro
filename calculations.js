// Function to calculate wood sheets
function calculateWoodSheets(items) {
    const woodSheetSize = { width: 122, height: 244 }; // Standard wood sheet size in cm
    let totalArea = 0;
  
    items.forEach((item) => {
      const size = item.size.split("x");
      const width = parseFloat(size[0]);
      const height = parseFloat(size[1]);
      totalArea += width * height * item.pieces;
    });
  
    const woodSheetArea = woodSheetSize.width * woodSheetSize.height;
    const sheetsNeeded = Math.ceil(totalArea / woodSheetArea);
  
    const resultDiv = document.getElementById("wood-sheets-result");
    resultDiv.innerHTML = `<p>You need <strong>${sheetsNeeded}</strong> full wood sheets.</p>`;
    document.getElementById("calculation-results").classList.remove("hidden");
  }
  
  // Function to generate quotation
  function generateQuotation(items) {
    let totalCost = 0;
    let quotationHTML = "<h3>Quotation</h3><ul>";
  
    items.forEach((item) => {
      const price = parseFloat(item.price.replace("$", ""));
      totalCost += price * item.pieces;
      quotationHTML += `<li>${item.name} - ${item.pieces} x ${item.price} = $${(price * item.pieces).toFixed(2)}</li>`;
    });
  
    quotationHTML += `</ul><p><strong>Total Cost: $${totalCost.toFixed(2)}</strong></p>`;
  
    const resultDiv = document.getElementById("quotation-result");
    resultDiv.innerHTML = quotationHTML;
    document.getElementById("calculation-results").classList.remove("hidden");
  }