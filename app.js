document.addEventListener("DOMContentLoaded", function () {
    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var itemName = button.dataset.name;
            var itemPrice = parseFloat(button.dataset.price);
            var itemImage = button.dataset.image;

            addToOrderMenu(itemImage, itemName, itemPrice);
        });
    });

    function addToOrderMenu(imageSrc, itemName, price) {
        // Create a new order card element
        var orderCard = document.createElement("div");
        orderCard.classList.add("order-card");

        // Create the structure of the order card
        orderCard.innerHTML = `
            <div class="row">
                <div class="col-md-7 center-item">
                    <img class="order-image" src="${imageSrc}">
                    <h5>${itemName}</h5>
                </div>
                <div class="col-md-5 center-item">
                    <div class="input-group number-spinner">
                        <button class="btn btn-default order-minus"><i class="fas fa-minus"></i></button>
                        <input type="number" min="1" class="form-control text-center order-quantity" value="1">
                        <button class="btn btn-default order-plus"><i class="fas fa-plus"></i></button>
                    </div>
                    <h5>$ <span class="order-price">${price}</span></h5>
                    <img src="images/remove.png" alt="" class="remove-item order-remove">
                </div>
            </div>
        `;

        // Append the order card to the order menu
        var orderMenu = document.getElementById("order-menu");
        orderMenu.appendChild(orderCard);

        // Add event listeners for order card buttons
        var orderMinusButton = orderCard.querySelector('.order-minus');
        var orderPlusButton = orderCard.querySelector('.order-plus');
        var orderQuantityInput = orderCard.querySelector('.order-quantity');
        var orderRemoveButton = orderCard.querySelector('.order-remove');

        orderMinusButton.addEventListener('click', function () {
            updateOrderQuantity(orderQuantityInput, -1, price);
        });

        orderPlusButton.addEventListener('click', function () {
            updateOrderQuantity(orderQuantityInput, 1, price);
        });

        orderRemoveButton.addEventListener('click', function () {
            orderMenu.removeChild(orderCard);
            calculateTotal();
        });
    }

    function updateOrderQuantity(quantityInput, change, price) {
        var newQuantity = parseInt(quantityInput.value) + change;
        if (newQuantity >= 1) {
            quantityInput.value = newQuantity;
            updateOrderTotal(quantityInput, price);
            calculateTotal();
        }
    }

    function updateOrderTotal(quantityInput, price) {
        var orderPrice = quantityInput.parentElement.nextElementSibling.firstElementChild;
        orderPrice.innerText = parseFloat(quantityInput.value) * price;
    }

    function calculateTotal() {
        var orderCards = document.querySelectorAll('.order-card');
        var subTotal = 0;

        orderCards.forEach(function (card) {
            var price = parseFloat(card.querySelector('.order-price').innerText);
            subTotal += price;
        });

        // Assume tax is 10% of the subtotal
        var tax = 0.1 * subTotal;
        var total = subTotal + tax;

        // Update total values in your HTML
        document.getElementById('sub-total').innerText = subTotal.toFixed(2);
        document.getElementById('tax-amount').innerText = tax.toFixed(2);
        document.getElementById('total-price').innerText = total.toFixed(2);
    }
});
