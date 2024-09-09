let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Get response as text for debugging
    })
    .then(responseText => {
        try {
            const products = JSON.parse(responseText); // Parse JSON from text
            displayProducts(products);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
})

// Function to display the products
function displayProducts(products) {
    if (!Array.isArray(products)) {
        console.error('Expected an array but got:', products);
        return;
    }

    const productsContainer = document.getElementById('clothing-items')

    // Clear any existing products in the container
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'clothing-item'

        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" style="width: 50px; height: 50px">
            <h4>${product.name}</h4>
            <p>Price: $${product.price}</p>
        `;

        productElement.addEventListener('click', () => {
            addToCart(product)
        })

        productsContainer.appendChild(productElement);
    })
}

const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id)

    if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If the item does not exist, add it to the cart
        cart.push(item)
    }

    updateCart()
}

const clearCart = () => {
    cart = [];

    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // clear all previous content

    updateCart()
}

const buyCart = () => {
    cart = [];

    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // clear all previous content

    updateCart()

    cartContainer.innerHTML = 'Thank you!'
}

const updateCart = () => {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // clear all previous content

    if (cart.length === 0) {
        // if cart is empty, show empty text
        cartContainer.textContent = "Your cart is empty";
        return;
    }

    cart.forEach(item => {
        // For each item in the cart, we take that item, create a div for it, give it a class of 'cart-item', show text of the item name, quantity and price. Then we add that div as a while to UI of the cart.
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.textContent = `${item.name} - ${item.quantity} x $${item.price}`;

        // remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = "removeBtn"
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(item.id);

        cartItem.appendChild(removeBtn)
        cartContainer.appendChild(cartItem);
    })

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalElement);
}

const removeFromCart = (itemId) => {
    // Find index of item to remove
    const item = cart.find(cartItem => cartItem.id == itemId);

    if(item) {
        if (item.quantity > 1) {
            // decrease quantity if more than 1
            item.quantity -= 1;
        } else {
            // Remove item from cart if quantity is 1
            const itemIndex = cart.findIndex(cartItem => cartItem.id == itemId)
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
            }
        }

        // Update the UI
        updateCart()
    }
}

