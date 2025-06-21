document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    let cart = [];

    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>No items in cart yet.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)} (x${item.quantity})`;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity;
            });
        }
        cartTotalAmount.textContent = total.toFixed(2);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productDiv = button.closest('.product-item');
            const id = productDiv.getAttribute('data-product-id');
            const name = productDiv.getAttribute('data-product-name');
            const price = parseFloat(productDiv.getAttribute('data-product-price'));

            // Check if item is already in cart
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            updateCartDisplay();
        });
    });

    updateCartDisplay();
});