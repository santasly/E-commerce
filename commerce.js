
class Cart {
    constructor() {
        this.items = [];
    }

    add(product) {
        this.items.push(product);
    }

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    clear() {
        this.items = [];
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0).toFixed(2);
    }
}

const cart = new Cart();

// Fetch all products and display them on the site
const loadProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        createProducts(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

// Display products on the site
const createProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        image.onclick = () => createProductDetails(product);

        const title = document.createElement('h2');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `$${product.price.toFixed(2)}`;

        productDiv.appendChild(image);
        productDiv.appendChild(title);
        productDiv.appendChild(price);

        productsContainer.appendChild(productDiv);
    });
};

// Display product details when a product is clicked
const createProductDetails = (product) => {
    const DetailsContainer = document.getElementById('product-details');
    DetailsContainer.innerHTML = '';

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;

    const title = document.createElement('h2');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`;

    const description = document.createElement('p');
    description.textContent = product.description;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.onclick = () => {
        cart.add(product);
        console.log('Product added to cart:', product);
        console.log('Cart total:', cart.getTotal());
        displayCart();
    };

    DetailsContainer.appendChild(image);
    DetailsContainer.appendChild(title);
    DetailsContainer.appendChild(price);
    DetailsContainer.appendChild(description);
    DetailsContainer.appendChild(addToCartButton);

    DetailsContainer.style.display = 'block';
    document.getElementById('products').style.display = 'none';
};

// Filter products by category
const filterProducts = async (category) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products' + (category ? `/category/${category}` : ''));
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

// Display cart items and total
const createCart = () => {
    const cartContainer = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.items.forEach(item => {
        const cartItemDiv = document.createElement('div');

        const title = document.createElement('span');
        title.textContent = item.title;

        const price = document.createElement('span');
        price.textContent = `$${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            cart.remove(item.id);
            console.log('Product removed from cart:', item);
            console.log('Cart total:', cart.getTotal());
            displayCart();
        };

        cartItemDiv.appendChild(title);
        cartItemDiv.appendChild(price);
        cartItemDiv.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemDiv);
    });

    document.getElementById('cart-total').textContent = cart.getTotal();

    cartContainer.style.display = 'block';
};

// Clear cart
const clearCart = () => {
    cart.clear();
    console.log('Cart cleared');
    createCart();
};

// Load products when the site loads
window.onload = loadProducts;
