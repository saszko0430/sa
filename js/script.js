// Реєстрація та вхід
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Реєстрація успішна! Увійдіть.');
    window.location.href = 'login.html';
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
        localStorage.setItem('loggedIn', true);
        alert('Вхід успішний!');
        window.location.href = 'index.html';
    } else {
        alert('Невірний email або пароль.');
    }
});

// Товари
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: 'Шахи класичні', price: 1200, image: 'images/chess.jpg' },
    { id: 2, name: 'Герб України', price: 800, image: 'images/coat.jpg' }
];

function displayProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    productList.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = 
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} грн</p>
            <button onclick="addToCart(${product.id})">Додати в кошик</button>
        ;
        productList.appendChild(div);
    });
}

document.getElementById('add-product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseInt(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push({ id, name, price, image });
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    e.target.reset();
});

// Кошик
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(${product.name} додано до кошика!);
    }
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.innerHTML = 
            <p>${item.name} - ${item.price} грн 
            <button onclick="removeFromCart(${index})">Видалити</button></p>
        ;
        cartItems.appendChild(div);
    });
    cartTotal.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Кошик порожній!');
    } else {
        alert('Замовлення оформлено! Дякуємо!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
});

// Ініціалізація
if (document.getElementById('product-list')) displayProducts();
if (document.getElementById('cart-items')) displayCart();