let listProductHTML = document.querySelector('.desserts-cards');
let listCartHTML = document.querySelector('.cartentry');
let totalCartHTML = document.querySelector('.modal-content')
let iconCart = document.querySelector('.icon-cart');
let cartitemtotal = document.querySelector('.cartitemtotal');
let modalitemtotal = document.querySelector('.ordertotalmodal');
let totalorderpricing = document.querySelector('.ordertotal');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

// iconCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })
// closeCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })
    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.classList.add('card');
                newProduct.innerHTML = 
                `<picture>
                    <source media="(min-width:750px)" srcset="${product.image.desktop}">
                    <img src="${product.image.mobile}" alt="">
                </picture>
                    <p class="firstlabel">${product.category}</p>
                    <p class="secondlabel">${product.name}</p>
                    <p class="thirdlabel">$${product.price}</p>
                <div class="product">
                    <button class="add-to-cart" id="addToCartBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                        Add to Cart
                    </button>
                    <div class="quantity-buttons" id="quantityButtons">
                        <button class="addCartminus">-</button>
                        <span class="qty">1</span>
                        <button class="addCartplus">+</button>
                    </div>
                </div>

                `;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('plus')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
    let productElement = listProductHTML.querySelector(`.item[data-id="${product_id}"]`);
    let qtyDisplay = productElement.querySelector('.qty');
    qtyDisplay.textContent = cart[positionThisProductInCart].quantity;
}
const subtractFromCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionThisProductInCart >= 0) {
        cart[positionThisProductInCart].quantity -= 1;
        if (cart[positionThisProductInCart].quantity <= 0) {
            cart.splice(positionThisProductInCart, 1);
        }
        addCartToHTML();
        addCartToMemory();
    }
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0.0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let itemTotalPrice = info.price * item.quantity;
            totalPrice += itemTotalPrice;
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="cart-wrapper">
                    <div class="additemcard">
                        <div class="addcartitem">
                            <div class="additemname">
                                <h6>${info.name}</h6>
                             </div>
                            <div class="additemprice">
                                <h5 class="itemquantityfontstyle">${item.quantity}x</h5>
                                <p>@${info.price}</p>
                                <p>$${info.price * item.quantity}</p>
                            </div>
                        </div>
                        <button class="remove">
                            <svg  xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                        </button>
                    </div> 
                </div>   
            `;
        });
    }
    cartitemtotal.innerText = totalQuantity;
    totalorderpricing.innerHTML = totalPrice;
}
const totalCartToHTML = () => {
    totalCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0.0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let itemTotalPrice = info.price * item.quantity;
            totalPrice += itemTotalPrice;
            totalCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="modal-cart-wrapper">
                    <div class="modal-additemcard">
                        <img src="${info.image.thumbnail}" alt="">
                        <div class="modal-addcartitem">
                            <div class="modal-additemname">
                                <h6>${info.name}</h6>
                             </div>
                            <div class="modal-additemprice">
                                <h4 class="itemquantityfontstyle">${item.quantity}x</h4>
                                <p>@${info.price}</p>   
                            </div>
                        </div>
                    </div> 
                    <h4 class="itempricefontstyle">$${info.price * item.quantity}</h4>
                </div>   
            `;
        });
    }
    modalitemtotal.innerHTML = totalPrice;
}


// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus')){
//         let product_id = positionClick.parentElement.parentElement.dataset.id;
//         let type = 'minus';
//         changeQuantityCart(product_id, type);
//     }
// })
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    
    if (positionClick.closest('.remove')) {
        let product_id = positionClick.closest('.item').dataset.id;
        removeItemFromCart(product_id);
    } else if(positionClick.classList.contains('addCartminus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        subtractFromCart(product_id);
    }
});
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCartplus')) {
        let id_product = positionClick.closest('.item').dataset.id;
        addToCart(id_product);
    } else if (positionClick.classList.contains('addCartminus')) 
    {
        let product_id = positionClick.closest('.item').dataset.id;
        let type = positionClick.classList.contains('addCartplus') ? 'addCartplus' : 'addCartminus';
        changeQuantityCart(product_id, type);
    }
});
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'addCartplus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
    let productElement = listProductHTML.querySelector(`.item[data-id="${product_id}"]`);
    let qtyDisplay = productElement.querySelector('.qty');
    if (cart[positionItemInCart]) {
        qtyDisplay.textContent = cart[positionItemInCart].quantity;
    } else {
        qtyDisplay.textContent = 1; // Reset to 1 if the item is removed from the cart
    }
}
const removeItemFromCart = (product_id) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        cart.splice(positionItemInCart, 1);
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
            totalCartToHTML();
        }
    })
}
console.log(products)
initApp();
let modal = document.getElementById("modal");
let checkout = document.querySelector(".ordercheckout");
let closeModal = document.querySelector(".close-modal");

// Open modal on checkout button click
checkout.addEventListener('click', () => {
    modal.style.display = "block";
});

// Close modal when the user clicks on <span> (x)
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close modal when the user clicks anywhere outside of the modal
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// You can also add an event listener to the Confirm Order button
document.querySelector(".confirm-order").addEventListener('click', () => {
    alert("Order Confirmed!");
    modal.style.display = "none";
    // Further logic for confirming the order can be added here
});

let addToCartBtn = document.getElementById('addToCartBtn');
let quantityButtons = document.getElementById('quantityButtons');
let qtyDisplay = quantityButtons.querySelector('.qty');

addToCartBtn.addEventListener('mouseover', () => {
    quantityButtons.style.display = 'flex';
    addToCartBtn.style.display = 'none';
});

quantityButtons.addEventListener('mouseleave', () => {
    quantityButtons.style.display = 'none';
    addToCartBtn.style.display = 'block';
});
