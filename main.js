let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
 } 


function renderList() {
     const section = document.getElementById("section");
  if (!section) return; 
    section.innerHTML = ""; 
  shoppingList.forEach((shoppingListItem, index) => {
    section.innerHTML += `
    <div class="card">
      <h3>Item ${index + 1}</h3>
      <p style="text-align: center; ${shoppingListItem.purchased ? 'text-decoration: line-through; color: gray;' : ''}">
        ${shoppingListItem.name}
      </p>
      <p style="text-align: center; ${shoppingListItem.purchased ? 'text-decoration: line-through; color: gray;' : ''}">
        $${parseFloat(shoppingListItem.price).toFixed(2)}
      </p>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button onclick="editItem(${index})" style="cursor:pointer;">Edit</button>
        <button onclick="deleteItem(${index})" style="color: red; cursor:pointer;">&times;</button>
        <input type="checkbox" ${shoppingListItem.purchased ? 'checked' : ''} onChange="togglePurchased(${index})">
        <label>Purchased</label>
      </div>
    </div>
    `;
});
calculateTotal();
}
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  saveToLocalStorage(); 
  renderList();
}
console.log(shoppingList);
function submitData(){
  const nameInput = document.getElementById("itemInput");
  const priceInput = document.getElementById("itemPrice");
  if (nameInput.value === "" || priceInput.value === "") {
    alert("Please fill in both fields!")
    return;
  }
  let shoppingListItem = {
  id: Date.now(), 
  name: nameInput.value,
  price: priceInput.value,
  purchased: false
 };
 shoppingList.push(shoppingListItem);
 saveToLocalStorage()
 
  nameInput.value = "";
  priceInput.value = "";
 renderList();  
} 
function editItem(index) {
  const newName = prompt("Enter new item name:", shoppingList[index].names);
  const newPrice = prompt("Enter new price:", shoppingList[index].price);
  if (newName !== null && newPrice !== null && newName !== "" && newPrice !== "") {
    shoppingList[index].names = newName;
    shoppingList[index].price = newPrice;
    saveToLocalStorage(); 
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
  const grandTotal = shoppingList.reduce((sum, shoppingListItem) => sum + (parseFloat(shoppingListItem.price) || 0), 0);
  const purchasedTotal = shoppingList
    .filter(shoppingListItem => shoppingListItem.purchased === true)
    .reduce((sum, shoppingListItem) => sum + (parseFloat(shoppingListItem.price) || 0), 0);

 const display = document.getElementById("totalDisplay");
  if (display) {
    if (shoppingList.length === 0) {
      display.innerHTML = ""
    } else {
      display.innerHTML = `
      <strong>Grand Total:</strong> ${grandTotal.toFixed(2)} <br>
      <span style="color: red;"><strong>Purchased Total:</strong> ${purchasedTotal.toFixed(2)}</span>
    `;
    }
  }
}
function clearList() {
  if (confirm("Clear entire shopping list?")) {
    shoppingList.length = 0;
    saveToLocalStorage()
    renderList()
  }
}
renderList();