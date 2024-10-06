import data from './data.json' with { type: "json" };

const desertHTML = document.querySelector('.deserts');
let quantities = Array(data.length).fill(1);
let isCartEmpty = true;

const renderData = () => {
  data.map((d, i) => {
    desertHTML.innerHTML += `
        <div class="desert">
          <img class="desert-img" src="${d.image.desktop}">
          <div class="btn btn-cart" data-index="${i}">
            <img src="./assets/images/icon-add-to-cart.svg" alt="cart icon">
            Add To Cart
          </div>
          
          <div class="text-container">
            <p class="desert-type">${d.category}</p>
            <p class="desert-name">${d.name}</p>
            <p class="price">$${(d.price).toFixed(2)}</p>
          </div>
        </div>`;
  });

  const cartButtons = document.querySelectorAll('.btn-cart');
  
  cartButtons.forEach((cb) => {
    cb.addEventListener("click", () => {
      const index = cb.getAttribute("data-index");
      addToCart(index, cb);
    });
  });
};

const addToCart = (index, cartButton) => {
  if (isCartEmpty) {
    fillCart();
    addItem(data[index].name, data[index].price, quantities[index]);
    isCartEmpty = false;
  }

  cartButton.classList.add("btn-add");
  cartButton.classList.remove("btn-cart");
  cartButton.innerHTML = `
    <button class="decrement-btn" data-index="${index}">
      <img src="./assets/images/icon-decrement-quantity.svg" alt="minus icon">
    </button>
    <p class="quantity">${quantities[index]}</p>
    <button class="increment-btn" data-index="${index}">
      <img src="./assets/images/icon-increment-quantity.svg" alt="plus icon">
    </button>
  `;

  const incrementButton = cartButton.querySelector('.increment-btn');
  const decrementButton = cartButton.querySelector('.decrement-btn');
  const quantityDisplay = cartButton.querySelector('.quantity');

  incrementButton.addEventListener("click", () => {
    quantities[index] += 1;
    quantityDisplay.textContent = quantities[index];
  });

  decrementButton.addEventListener("click", () => {
    if (quantities[index] == 0) {
      isCartEmpty = true;
    }
    if (quantities[index] > 0) {
      quantities[index] -= 1; 
      quantityDisplay.textContent = quantities[index];
    }
  });
};

renderData();