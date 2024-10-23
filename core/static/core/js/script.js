document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    loadCartItems();

    // Cambiar imagen de la cabecera cada 5 segundos
    let headerImages = [
        "/static/core/images/Casa_prefabricada_1.png",
        "/static/core/images/Casa_prefabricada_2.png",
        "/static/core/images/Casa_prefabricada_3.png"
    ];
    let currentImageIndex = 0;
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % headerImages.length;
        document.querySelector(".header-image").src = headerImages[currentImageIndex];
    }, 5000);
});

function changeText() {
    document.getElementById("welcome-text").innerText = "Esta pagina web ha sido modificada y adaptada por Jonathan Lara Aguirre";
}

function revertText() {
    document.getElementById("welcome-text").innerText = "Bienvenidos a Nuestra Tienda Donde Podrás Encontrar tu Futura Casa Prefabricada";
}

function showDetails(itemId) {
    let details = {
        1: "Kit para hermosa casa con estilo mediterránea, de tres dormitorios y gran precio, con 54 m2 para su hogar.",
        2: "Kit de hermosa y amplia casa de 4 dormitorios, con los espacios que tu familia necesita en increíbles 72 m2.",
        3: "Una casa de hermoso diseño, llave en mano, que cuenta con 90 m2., siendo una vivienda muy espaciosa, de 4 dormitorios y de 2 baños.",
        4: "KIT de amplia y cómoda casa familiar de 144 m2, con todos los espacios que siempre soñaste para tu casa."
    };
    document.getElementById("modal-text").innerText = details[itemId];
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function addToCart(event, itemName, price) {
    event.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: itemName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
    alert(`${itemName} ha sido agregado al carrito.`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price;
    });
    document.getElementById("cart-total").innerText = `Total: $${total}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

function toggleCart(event) {
    event.stopPropagation();
    let cart = document.getElementById("cart");
    cart.style.display = cart.style.display === "block" ? "none" : "block";
}

function checkout() {
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("cart");
    updateCartCount();
    loadCartItems();
    toggleCart();
}

// Función para mostrar la ventana emergente de información
function showInfo() {
    document.getElementById("info-modal").style.display = "block";
}

// Función para cerrar la ventana emergente de información
function closeInfoModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Añadir eventos para cerrar la ventana emergente al hacer clic fuera de ella
window.onclick = function(event) {
    let modal = document.getElementById("info-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    if (name === "" || email === "" || message === "") {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    alert("¡Gracias por tu mensaje!");
    return true;
}

function filterProducts() {
    let category = document.getElementById("category").value;
    let products = document.querySelectorAll(".gallery-item");
    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
