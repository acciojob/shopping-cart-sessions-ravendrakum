// This is the boilerplate code given for you
// You can modify this code
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Cart data stored in session storage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Simulate asynchronous behavior with setTimeout
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Render product list
function renderProducts() {
  products.forEach(async (product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
async function renderCart() {
  await delay(0); // Simulate asynchronous behavior

  cartList.innerHTML = ""; // Clear the cart list before rendering

  cart.forEach(async (cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
async function addToCart(productId) {
  const productToAdd = products.find((product) => product.id === productId);

  if (productToAdd) {
    cart.push({ id: productToAdd.id, name: productToAdd.name, price: productToAdd.price });
    await updateCart();
  }
}

// Remove item from cart
async function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.id !== productId);
  await updateCart();
}

// Clear cart
async function clearCart() {
  cart = [];
  await updateCart();
}

// Update cart and session storage
async function updateCart() {
  await renderCart();
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Event delegation for "Add to Cart" and "Remove" buttons
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    await addToCart(productId);
  }

  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    await removeFromCart(productId);
  }
});

// Initial render
renderProducts();
renderCart();

