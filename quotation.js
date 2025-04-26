// Retrieve selected items from localStorage
const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));

// DOM Elements
const quotationForm = document.getElementById("quotation-form");
const quotationDetails = document.getElementById("quotation-details");
const quotationNumber = document.getElementById("quotation-number");
const quotationName = document.getElementById("quotation-name");
const quotationAddress = document.getElementById("quotation-address");
const quotationPhone = document.getElementById("quotation-phone");
const quotationItems = document.getElementById("quotation-items");
const quotationTotal = document.getElementById("quotation-total");

// Generate Quotation Number
function generateQuotationNumber() {
  return "QUO-" + Math.floor(Math.random() * 10000);
}

// Display Quotation Details
quotationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  quotationNumber.textContent = generateQuotationNumber();
  quotationName.textContent = name;
  quotationAddress.textContent = address;
  quotationPhone.textContent = phone;

  let totalCost = 0;
  let itemsHTML = "<h3>Selected Items</h3><ul>";

  selectedItems.forEach((item) => {
    const price = parseFloat(item.price.replace("$", ""));
    totalCost += price * item.pieces;
    itemsHTML += `<li>${item.name} - ${item.pieces} x ${item.price} = $${(price * item.pieces).toFixed(2)}</li>`;
  });

  itemsHTML += `</ul>`;
  quotationItems.innerHTML = itemsHTML;
  quotationTotal.textContent = totalCost.toFixed(2);

  quotationDetails.classList.remove("hidden");
});