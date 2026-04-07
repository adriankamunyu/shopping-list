/**Code for developing a feature which will enabler to add items in a purchase list,
listing all theitem they intend to purchase, display which items are purchased and the total cost, it should mark item as purchased. 
The feature should also be able to clear the list once done.**/

// the parent array where all orders are stored.
// Initialize list from LocalStorage or empty array if none exists
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Updated Total Calculation (calculating based on purchased items only)

function renderList() {
     const section = document.getElementById("section");
  if (!section) return; // Safety check
    section.innerHTML = ""; // Clear the current view
//function to calculate the total amount of all orders; 
 // Loop through the array and create the cards
  shoppingList.forEach((shoppingListItem, index) => {
    // Check if item is purchased to add a special class or style
    const isChecked = shoppingListItem.purchased ? "checked" : "";
    const textStyle = shoppingListItem.purchased ? "text-decoration: line-through; color: aqua;" : "";
    //Add new content without removing old ones
    section.innerHTML += `
    <div class="card" style="border: 1px solid #ccc; border-radius: 8px; padding: 10px; margin: 10px 0; display: block; justify-content: start; align-items: center;">
      <div>
    <p style="${textStyle} margin: 0;"><strong>${shoppingListItem.names}</strong></p> 
      <p style="${textStyle} margin: 0;"> ${parseFloat(shoppingListItem.price).toFixed(2)}</p>
      </div>
    
    <div style="display: flex; align-items: center; gap: 10px;">
        <button onclick="editItem(${index})" style="cursor:pointer;">Edit</button>
        <button onclick="deleteItem(${index})" style="color: red; cursor:pointer;">&times;</button>
        <input type="checkbox" ${isChecked} onChange="togglePurchased(${index})">
        <label>Purchased</label>
    </div>
    `;
})
// Always update total after rendering
calculateTotal();
}
// Persisting data in local storage
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  saveToLocalStorage(); // Save change
  renderList();
}
console.log(shoppingList);
//Function that will add elements to the array
function submitData(){
  const nameInput = document.getElementById("itemname");
  const priceInput = document.getElementById("pricename");
  if (nameInput.value === "" || priceInput.value === "") {
    return;
  }

  //the object that will add elements to the main array
  let shoppingListItem = {
  id: Date.now(), // Unique ID based on timestamp
  names: nameInput.value,
  price: priceInput.value,
  purchased: false
 };
// statement to push and update the object details to the array 
 shoppingList.push(shoppingListItem);
 saveToLocalStorage(); // Save the updated list to LocalStorage
 //input reset after pushing the item to the array
  nameInput.value = "";
  priceInput.value = "";
 //update the user interface
 renderList();  
} 
//Addational functions for editing and deleting items
function editItem(index) {
  const currentItem = shoppingList[index];
  const newName = prompt("Enter new item name:", shoppingList[index].names);
  const newPrice = prompt("Enter new price:", shoppingList[index].price);
  if (newName !== null && newPrice !== null) {
    shoppingList[index].names = newName;
    shoppingList[index].price = newPrice;
    saveToLocalStorage(); // save changes to LocalStorage
    renderList();
  }
}
function deleteItem(index) {
  if (confirm("Delete this item?")) {
    shoppingList.splice(index, 1);
    saveToLocalStorage();
    renderList();
  }
}
function calculateTotal() {
  //calculate sumtotal of purchased items
  const grandTotal = shoppingList.reduce((sum, shoppingListItem) => sum + (parseFloat(shoppingListItem.price) || 0), 0);
  // Total of all items regardless of purchase status
 // Total of only items marked 'purchased'
  const purchasedTotal = shoppingList
    .filter(shoppingListItem => shoppingListItem.purchased === true)
    .reduce((sum, shoppingListItem) => sum + (parseFloat(shoppingListItem.price) || 0), 0);

 const display = document.getElementById("totalDisplay");
 const clearBtn = document.getElementById("clearBtn");
  if (display) {
    if (shoppingList.length > 0){
      display.style.display = "block";
      if (clearBtn) clearBtn.style.display = "inline-block"; // Show clear button when there are items in the list
      display.innerHTML = `
      <strong>Grand Total:</strong> ${grandTotal.toFixed(2)} <br>
      <span style="color: red;"><strong>Purchased Total:</strong> ${purchasedTotal.toFixed(2)}</span>
    `;
  } else {
    display.style.display = "none"; //This hides the total display when there are no items in the list
    if (clearBtn) clearBtn.style.display = "none"; //This hides the clear button when there are no items in the list
    }
  }
}
//fuction to clear the list once done with the purchase
function clearList() {
  shoppingList.length = 0; 
  renderList();
  // console.log("List cleared");
   }

// Initial render call when the script loads
renderList();