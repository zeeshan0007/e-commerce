// /**** Cart ****/
// let carts = document.querySelectorAll('.add-cart');
// let products = [
//     {
//     name: 'Grey T-Shirt',
//     tag: 'greytshirt',
//     price:15,
//     inCart: 0
//     },
//     {
//     name: 'Grey Hoodie',
//     tag: 'greyhoodie',
//     price:20,
//     inCart: 0
//     },
//     {
//     name: 'Black T-Shirt',
//     tag: 'blacktshirt',
//     price:15,
//     inCart: 0
//     },
//     {
//     name: 'Black Hoodie',
//     tag: 'blackhoodie', 
//     price:20,
//     inCart: 0
//     }
// ]
// for (let i=0; i< carts.length; i++){
//     carts[i].addEventListener('click', () =>{
//         cartNumbers(products[i]);
//         totalCost(products[i])
//     })
// }
// function onLoadCartNumbers(){
//     let ProductNumbers = localStorage.getItem('cartNumbers');

//     if(ProductNumbers){
//         document.querySelector('.cart span').textContent = ProductNumbers;

//     }
// }

// function cartNumbers(products){
//     let ProductNumbers = localStorage.getItem('cartNumbers');

//     ProductNumbers = parseInt(ProductNumbers);

//     if(ProductNumbers) {
//         localStorage.setItem('cartNumbers', ProductNumbers + 1);
//         document.querySelector('.cart span').textContent = ProductNumbers + 1;
//     } else{
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.cart span').textContent = 1;
//     }

//     setItems(products);

// }

// function setItems(product){
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if(cartItems != null){

//         if(cartItems[product.tag] == undefined){
//             cartItems = {
//                 ...cartItems,
//                 [product.tag]: product
//             }
//         }
//         cartItems[product.tag].inCart += 1
//     } else{
//         product.inCart = 1;

//     cartItems ={
//         [product.tag]: product
//     }

//     }
    

//     localStorage.setItem("productsInCart", JSON.stringify
//     (cartItems));
// }
// function totalCost(product){
//     let cartCost = localStorage.getItem('totalCost');
    

//     if(cartCost != null){
//         cartCost = parseInt(cartCost);
//         localStorage.setItem("totalCost", cartCost + product.price);
//     } else{
//         localStorage.setItem("totalCost", product.price);
//     }
    
// }
// function displayCart(){
//     let cartItems = localStorage.getItem("productsInCart");
//     cartItems = JSON.parse(cartItems);
//     let productContainer = document.querySelector(".products");
//     let cartCost = localStorage.getItem('totalCost');

//     if(cartItems && productContainer){

//         productContainer.innerHTML = '';
//         Object.values(cartItems).map(item =>{
//             productContainer.innerHTML += `
//                 <tr class="cart-row">
//                     <td><img src="./img/${item.tag}.png" alt=""></td>
//                     <td>${item.name}</td>
//                     <td class="cart-price">$${item.price},00</td>
//                     <td ><input class="cart-quantity" type="number" min="0" value="${item.inCart}"></td>
//                     <td>$${item.inCart * item.price},00</td>
//                     <td ><a class="btn-danger" href="#"><i class="far fa-times-circle"></i></a></td>
//                     <td class="cart-price">$${item.price},00</td>
//                     </tr>
//             `
//         });

//     }
//     var removeCartItemButtons = document.getElementsByClassName('btn-danger');
// for (var i=0; i< removeCartItemButtons.length; i++){
//     var button1 = removeCartItemButtons[i];
//     button1.addEventListener('click', function(event) {
//         var buttonClicked = event.target;
//         buttonClicked.parentElement.parentElement.parentElement.remove();
//         updateCartTotal();
//     })
// }
// }


// function updateCartTotal(){
//     var cartItemContainer = document.getElementsByClassName('products')[0];
    
//     let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    
//     for(var i=0; i<cartRows.length; i++){
//         var price = item.price[i];
//         var quantity = item.quantity[i];
//         var cartRow = cartRows[i];
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0];
//         // var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0];
//         var price = paresefloat(priceElement.innerHTML.replace('$', ''));
//         console.log(price)
//     }
// }
// onLoadCartNumbers();
// displayCart();
const responsiveNavbar = (function () {
	const button = document.querySelector("#menuButton");
	const navbar = document.querySelector("#navbar")
	button.addEventListener("click", function () {
		if (navbar.className === "navbar") {
			navbar.className += " navbarResponsive";
		}
		else {
			navbar.className = "navbar";
		}
	});
})();

if (document.getElementById('hearderSlide')) {
	$('#hearderSlide').multislider();
	$('#hearderSlide').multislider('pause');
}


function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling')
}


const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	document.querySelector('body').classList.toggle('stopScrolling');
});


const closeShopCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);


let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '$' + countTheSumPrice();

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();