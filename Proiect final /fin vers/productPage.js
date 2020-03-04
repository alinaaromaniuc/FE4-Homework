//search
var allWatches = [];
var backupWatches = [];
var perPage = 12;
var currentPage = 1;

function searchWatches(keyword) {

    if (keyword.length === 0 && backupWatches.length > 0) {
        allWatches = backupWatches;
    } else {
        backupWatches = allWatches;

        allWatches = allWatches.filter(item => item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }

    currentPage = 1;
    renderWatches(currentPage);
}

document.getElementById('search-btn').addEventListener('click', function(e) {
    e.preventDefault();

    let keyword = document.getElementById('search-box').value;

    searchWatches(keyword.trim());
});
///watches card
function renderWatches(page) {
    let firstIndex = (page - 1) * perPage;
    let lastIndex = firstIndex + perPage
    let currentPageWatches = allWatches.slice(firstIndex, lastIndex);

    let container = document.getElementById("container");

    container.innerHTML = "";
    currentPageWatches.forEach(watches => {
        let card = document.createElement("div");
        card.className = "col-sm-3 user-card-container wrapper";
        card.innerHTML =
            `<!-- single product -->
            <article class="product">
              <div class="img-container">
                <img
                  src=${watches.image}
                  alt="product"
                  class="product-img"
                />
                <a href="detailProduct.html">
      <button class="bag-btn1 detail-bt" data-id=${watches.id}>
                <i class="fas fa-binoculars"></i> 
                view details 
                </button></a>
                <button class="bag-btn" data-id=${watches.id}>
                  <i class="fas fa-shopping-cart"></i>
                  add to bag
                </button>
              </div>
              <h3>${watches.name}</h3>
              <h4>${watches.price}</h4>
            </article>
            <!-- end of single product -->
   

`;
        container.appendChild(card);
    });

    let totalPages = Math.ceil(allWatches.length / perPage);
    pagination(totalPages, currentPage);
}




function displayCards() {
    fetch("http://localhost:3000/api/watches", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(response => {
            allWatches = response;
            renderWatches(currentPage);
        });
}

displayCards();

function pagination(totalPages, currentPage) {
    let ul = document.getElementById("pagination");
    ul.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {

        let className = "";

        if (currentPage === i + 1) {
            className = " active";
        }

        ul.innerHTML += `<li class="page-item ${className}">
            <a class="page-link" href="#">
            ${i + 1}
            </a>
        </li>`;
    }

    var pages = document.querySelectorAll("#pagination .page-item");
    pages.forEach(function(page) {
        page.addEventListener("click", function(e) {
            e.preventDefault();
            currentPage = parseInt(e.target.innerText);
            renderWatches(currentPage);
        });
    });
}
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// const client = contentful.createClient({
//   // This is the space ID. A space is like a project folder in Contentful terms
//   space: "YOUR API KEY",
//   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//   accessToken:
//     "YOUR API KEY"
// });

// variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
let cart = [];

// products
class Products {
    async getProducts() {
        try {
            let result = await fetch("http://localhost:3000/api/watches");
            let data = await result.json();
            let products = data.watches;
            products = products.map(watches => {
                const { name } = watches.name;
                const { price } = watches.price
                const { id } = watches.id;
                const { image } = watches.image;
                return { name, price, id, image };
            });
            console.log(products);

            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// ui
class UI {
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
            result += `
   <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img
              src=${watches.image}
              alt="product"
              class="product-img"
            />
            <a href="detailProduct.html">
  <button class="bag-btn1 detail-bt" data-id=${watches.id}>
            <i class="fas fa-binoculars"></i> 
            view details 
            </button></a>
            <button class="bag-btn" data-id=${watches.id}>
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${watches.name}</h3>
          <h4>$${product.price}</h4>
        </article>
        <!-- end of single product -->
   `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button => {
            let id = button.dataset.id;

            let inCart = cart.find(watches => watches.id === id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            } else {
                button.addEventListener("click", event => {
                    // disable button
                    event.target.innerText = "In Bag";
                    event.target.disabled = true;
                    // add to cart
                    let cartItem = {...Storage.getProduct(id), amount: 1 };
                    cart = [...cart, cartItem];
                    Storage.saveCart(cart);
                    // add to DOM
                    this.setCartValues(cart);
                    this.addCartItem(cartItem);
                    this.showCart();
                });
            }
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(watches => {
            tempTotal += watches.price * watches.amount;
            itemsTotal += watches.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    addCartItem(watches) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `<!-- cart item -->
            <!-- item image -->
            <img src=${watches.image} alt="product" />
            <!-- item info -->
            <div>
              <h4>${watches.name}</h4>
              <h5>$${watches.price}</h5>
              <span class="remove-item" data-id=${watches.id}>remove</span>
            </div>
            <!-- item functionality -->
            <div>
                <i class="fas fa-chevron-up" data-id=${watches.id}></i>
              <p class="item-amount">
                ${watches.amount}
              </p>
                <i class="fas fa-chevron-down" data-id=${watches.id}></i>
            </div>
          <!-- cart item -->
    `;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener("click", this.showCart);
        closeCartBtn.addEventListener("click", this.hideCart);
    }
    populateCart(cart) {
        cart.forEach(watches => this.addCartItem(watches));
    }
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    cartLogic() {
        clearCartBtn.addEventListener("click", () => {
            this.clearCart();
        });
        cartContent.addEventListener("click", event => {
            if (event.target.classList.contains("remove-item")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cart = cart.filter(watches => watches.id !== id);
                console.log(cart);

                this.setCartValues(cart);
                Storage.saveCart(cart);
                cartContent.removeChild(removeItem.parentElement.parentElement);
                const buttons = [...document.querySelectorAll(".bag-btn")];
                buttons.forEach(button => {
                    if (parseInt(button.dataset.id) === id) {
                        button.disabled = false;
                        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to bag`;
                    }
                });
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(watches => watches.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(watches => watches.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cart = cart.filter(watches => watches.id !== id);
                    // console.log(cart);

                    this.setCartValues(cart);
                    Storage.saveCart(cart);
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    const buttons = [...document.querySelectorAll(".bag-btn")];
                    buttons.forEach(button => {
                        if (parseInt(button.dataset.id) === id) {
                            button.disabled = false;
                            button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to bag`;
                        }
                    });
                }
            }
        });
    }
    clearCart() {

        cart = [];
        this.setCartValues(cart);
        Storage.saveCart(cart);
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button => {
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to bag`;
        });
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    ui.setupAPP();

    // get all products
    products
        .getProducts()
        .then(products => {
            ui.displayProducts(products);
            Storage.saveProducts(products);
        })
        .then(() => {
            ui.getBagButtons();
            ui.cartLogic();
        });
});

/*
`
        <div class="card user-card thumb-wrapper">
        <div class="img-box ">
            <img src="${watches.image}" class="img-responsive img-fluid" alt="" alt="image" />
            <a href="detailProduct.html" class="btn btn-primary button2" ><strong>VIEW DETAILS</strong></a></br>
            <a href="#" class="btn btn-primary button1 shop-item-button" ><strong>ADD TO CART </strong></a> 
         </div>
         <div class="thumb-content range-text position-range-bottom">
                <h4 class="card-title" style="font-size:17px; text-align: center">${watches.name} </h4>
                <p class="item-price" style="font-size:15px; text-align: center">
                <strong>  ${watches.price} </strong> </p>
                <div class="text-center divbutton">
                <a href="#" class="btn btn-primary button" style="display:none">Add to Cart</a>
</div> </div> </div>`
*/