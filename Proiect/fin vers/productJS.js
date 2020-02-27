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
/////schimbat
function renderWatches(page) {
    let firstIndex = (page - 1) * perPage;
    let lastIndex = firstIndex + perPage
    let currentPageWatches = allWatches.slice(firstIndex, lastIndex);

    let container = document.getElementById("container");

    container.innerHTML = "";
    currentPageWatches.forEach(watches => {
        let card = document.createElement("div");
        card.className = "col-sm-3 user-card-container wrapper";
        card.innerHTML = `
        <div class="card user-card thumb-wrapper">
        <div class="img-box ">
            <img src="${watches.image}" class="img-responsive img-fluid" alt="" alt="image"/>
            <a href="detailProduct.html" class="btn btn-primary button2" ><strong>VIEW DETAILS</strong></a></br>

            <a href="#" class="btn btn-primary button1 shop-item-button" ><strong>ADD TO CART </strong></a> 


           </div>
            <div class="thumb-content range-text position-range-bottom">
                <h4 class="card-title" style="font-size:15px; text-align: center">${watches.name}</h4>
                <p class="item-price" style="font-size:15px; text-align: center">
                  <strong>  ${watches.price} </strong>
                </p>
                <div class="text-center divbutton">
                <a href="#" class="btn btn-primary button" style="display:none">Add to Cart</a>

</div> </div> </div>`;
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

function pagination(total_pages, current_page) {
    let ul = document.getElementById("pagination");
    ul.innerHTML = "";
    for (let i = 0; i < total_pages; i++) {

        let class_name = "";

        if (current_page === i + 1) {
            class_name = " active";
        }

        ul.innerHTML += `<li class="page-item ${class_name}">
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

//add to cart

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        localStorage.getItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();