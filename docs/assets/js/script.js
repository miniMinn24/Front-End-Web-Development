/* ===========================
   NAVIGATION Behavior
=========================== */
const navbar = document.querySelector(".navbar");
const cartItem = document.querySelector(".cart");
const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("search-box");

// On Navbar click - close Cart and Search
document.querySelector("#menu-btn").onclick = () => {
	navbar.classList.toggle("active");
	cartItem.classList.remove("active");
	searchForm.classList.remove("active");
};

// On Cart click - close Navbar and Search
document.querySelector("#cart-btn").onclick = () => {
	cartItem.classList.toggle("active");
	navbar.classList.remove("active");
	searchForm.classList.remove("active");
};

// On Search click - close Navbar and Cart
document.querySelector("#search-btn").onclick = (e) => {
	e.stopPropagation();

	const isOpening = !searchForm.classList.contains("active");

	searchForm.classList.toggle("active");
	navbar.classList.remove("active");
	cartItem.classList.remove("active");

	// Automatically scroll back to Products section to search
	if (isOpening) {
		const menuSection = document.getElementById("menu");
		if (menuSection) {
			menuSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}

		setTimeout(() => searchInput.focus(), 150);
	}
};

/* ===========================
   CART Feature
=========================== */
// Checkout products from cart
function buyButtonClicked() {
	alert("Your order is placed! Thank you for buying.");
	document.querySelector(".cart-content").innerHTML = "";
	updateTotal();
	cartItem.classList.remove("active");
}

// Check if cart has any items
function cartHasItems() {
	const cartContent = document.querySelector(".cart-content");
	// Returns true if there are any child elements, false otherwise
	return cartContent.children.length > 0;
}

// Add products to cart
function addProductToCart(productBox) {
	const title = productBox.dataset.title;
	const price = productBox.dataset.price;
	const img = productBox.dataset.img;

	// if product data is invalid
	if (!title || !price || !img) {
		console.error("Invalid product data:", productBox.dataset);
		return;
	}

	const cartContent = document.querySelector(".cart-content");

	// to prevent duplicate entries,
	const existing = [...cartContent.children].find(
		(item) => item.querySelector(".cart-product-title")?.innerText === title
	);
	// it increments to existing product quantity in cart instead.
	if (existing) {
		const qty = existing.querySelector(".cart-quantity");
		qty.value = parseInt(qty.value) + 1;
		updateTotal();
		return;
	}

	// generates product in cart
	const cartBox = document.createElement("div");
	cartBox.className = "cart-box";

	cartBox.innerHTML = `
		<img src="${img}" class="cart-img" alt="${title}">
		<div class="detail-box">
			<div class="cart-product-title">${title}</div>
			<div class="cart-price">${price}</div>
			<input type="number" value="1" class="cart-quantity">
		</div>
		<i class="fas fa-trash cart-remove"></i>
	`;

	cartContent.appendChild(cartBox);
	updateTotal();
}

// Calculate total price
function updateTotal() {
	let total = 0;
	const cartBoxes = document.querySelectorAll(".cart-box");

	cartBoxes.forEach((box) => {
		const price = parseFloat(
			box.querySelector(".cart-price").innerText.replace("$", "")
		);
		const qty = box.querySelector(".cart-quantity").value;
		total += price * qty;
	});

	document.querySelector(".total-price").innerText = `$${total.toFixed(2)}`;
}

/* ===========================
   PRODUCT MODAL (Coffee + Equipment)
=========================== */
// Close modal when click on "x" button
document.querySelector(".modal-close").onclick = () => {
	document.getElementById("productModal").style.display = "none";
};

/* ===========================
   EVENT REGISTRATION MODAL
=========================== */
// Clear and send Events and Workshop registration form
document.getElementById("eventRegisterForm").onsubmit = (e) => {
	e.preventDefault();
	e.target.reset();
	e.target.style.display = "none";
	document.getElementById("eventSuccess").style.display = "block";
};

// Close registration modal when click on "x" button
document.getElementById("closeEventModal").onclick = () => {
	const modal = document.getElementById("eventModal");
	modal.style.display = "none";
	document.getElementById("eventRegisterForm").style.display = "flex";
	document.getElementById("eventSuccess").style.display = "none";
};

/* ===========================
   SEARCH (Coffee + Equipment)
=========================== */
// To avoid toggling hidden items itself after closing search
function resetSearchResults() {
	searchInput.value = "";

	document.querySelectorAll(".product-box").forEach((box) => {
		box.style.display = "";
	});

	const noResults = document.getElementById("noResults");
	if (noResults) noResults.style.display = "none";

	suggestionsBox.innerHTML = "";
}

// Search coffee and equipments through products
searchInput.addEventListener("input", () => {
	const q = searchInput.value.toLowerCase();
	let visible = 0;

	document.querySelectorAll(".product-box").forEach((box) => {
		const text = box.dataset.search || "";
		const show = text.includes(q);
		box.style.display = show ? "block" : "none";
		if (show) visible++;
	});

	// display No Results if could not found any
	const noResults = document.getElementById("noResults");
	if (noResults) noResults.style.display = visible ? "none" : "block";
});

// Providing search suggestions
const suggestionsBox = document.getElementById("searchSuggestions");

searchInput.addEventListener("input", () => {
	const q = searchInput.value.toLowerCase();
	suggestionsBox.innerHTML = "";

	if (!q) return;

	const matches = [];

	document.querySelectorAll(".product-box").forEach((box) => {
		const title = box.dataset.title;
		if (title && title.toLowerCase().includes(q)) {
			matches.push({ title, box });
		}
	});

	matches.slice(0, 5).forEach(({ title, box }) => {
		const item = document.createElement("div");
		item.textContent = title;

		item.onclick = () => {
			box.scrollIntoView({ behavior: "smooth", block: "center" });
			box.classList.add("highlight");
			setTimeout(() => box.classList.remove("highlight"), 1200);

			suggestionsBox.innerHTML = "";
			searchForm.classList.remove("active");
		};

		suggestionsBox.appendChild(item);
	});
});

// Safely resetting search after closing search
document.querySelector("#search-btn").addEventListener("click", () => {
	if (!searchForm.classList.contains("active")) {
		resetSearchResults();
	}
});

/* ===========================
   SHOW MORE / SHOW LESS
=========================== */
// Toggle of show/hide in hidden items
function setupShowHide(buttonSelector, containerId) {
	const button = document.querySelector(buttonSelector);
	const container = document.getElementById(containerId);

	if (!button || !container) return;

	button.addEventListener("click", () => {
		const isExpanded = container.classList.contains("is-expanded");

		container.classList.toggle("is-expanded");
		button.textContent = isExpanded ? "Show More >" : "Show Less <";

		// When collapsing, scroll back to THIS button
		if (isExpanded) {
			requestAnimationFrame(() => {
				button.scrollIntoView({
					behavior: "smooth",
					block: "end",
				});
			});
		}
	});
}

/* ===========================
   FEEDBACK TOAST
=========================== */
// Display "Added to Cart!" message
function showAddedFeedback(button) {
	const old = document.querySelector(".added-toast");
	if (old) old.remove();

	const toast = document.createElement("div");
	toast.className = "added-toast";
	toast.innerText = "Added to cart!";
	document.body.appendChild(toast);

	const r = button.getBoundingClientRect();
	toast.style.top = `${r.top + window.scrollY - 40}px`;
	toast.style.left = `${r.left + r.width / 2}px`;
	toast.style.transform = "translateX(-50%)";

	setTimeout(() => toast.remove(), 1800);
}

/* ===========================
ALL EVENT LISTENERS IN ONE PLACE
=========================== */
// On scroll, close Navbar (Smaller devices)
window.addEventListener("scroll", () => {
	navbar.classList.remove("active");
});

// To setup Show More/Less
setupShowHide(".btn-showhide[data-target='coffee']", "coffeeContainer");
setupShowHide(".btn-showhide[data-target='equipment']", "equipmentContainer");
setupShowHide(".btn-showhide[data-target='events']", "eventsContainer");
// setupShowHide(".btn-showhide[data-target='offers']", "offersContainer");

// Listening for cart checkout
const buyButton = document.querySelector(".btn-buy");
const orderSuccessModal = document.getElementById("orderSuccess");

buyButton.addEventListener("click", () => {
	// ignore checkout if cart has no items
	if (!cartHasItems()) return;

	clearCart(); // clear cart
	cartItem.classList.remove("active"); // close cart drawer
	orderSuccessModal.style.display = "flex"; // show success modal
});

document.querySelector(".btn-close-success").addEventListener("click", () => {
	orderSuccessModal.style.display = "none";
});

orderSuccessModal.addEventListener("click", (e) => {
	if (e.target === orderSuccessModal) {
		orderSuccessModal.style.display = "none";
	}
});

function clearCart() {
	document.querySelector(".cart-content").innerHTML = "";
	document.querySelector(".total-price").textContent = "$0";
}

// Listening for cart Remove and Quantify change
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("cart-remove")) {
		e.target.closest(".cart-box").remove();
		updateTotal();
	}
});
document.addEventListener("change", (e) => {
	if (e.target.classList.contains("cart-quantity")) {
		if (e.target.value <= 0) e.target.value = 1;
		updateTotal();
	}
});
// Listening for adding products to cart
document.addEventListener("click", (e) => {
	const addBtn = e.target.closest(".add-cart");
	if (!addBtn) return;

	e.stopPropagation();

	const productBox = addBtn.closest(".box");
	if (!productBox) return;

	addProductToCart(productBox);
	showAddedFeedback(e.target);
});

// Listening for product modal display (Coffee + Equipment)
document.addEventListener("click", (e) => {
	const card = e.target.closest(".box");
	if (!card) return;

	// ❗ block special offers
	if (card.classList.contains("offers-box")) return;
	if (!card.classList.contains("product-box")) return;

	if (card.classList.contains("event-box")) return;
	if (e.target.classList.contains("add-cart")) return;

	const modal = document.getElementById("productModal");
	modal.style.display = "flex";

	document.getElementById("modalImg").src = card.dataset.img;
	document.getElementById("modalTitle").textContent = card.dataset.title;
	document.getElementById("modalPrice").textContent = card.dataset.price;
	document.getElementById("modalDescription").textContent =
		card.dataset.description || "";

	const notesEl = document.getElementById("modalNotes");
	const brewEl = document.getElementById("modalBrew");
	const usageEl = document.getElementById("modalUsage");

	// Reset
	notesEl.style.display = "none";
	brewEl.style.display = "none";
	usageEl.style.display = "none";

	if (card.dataset.notes) {
		// Displays Tasting Notes in Coffee modal
		notesEl.innerHTML = `
		<i class="fa-solid fa-mug-hot"></i> 
		<b>Tasting Notes:</b>
		<br>${card.dataset.notes}`;
		notesEl.style.display = "block";
	}

	// Displays Brewing Methods in Coffee modal
	if (card.dataset.brew) {
		brewEl.innerHTML = `
		<i class="fa-solid fa-filter"></i> 
		<b>Best Brew:</b> <br>${card.dataset.brew}`;
		brewEl.style.display = "block";
	}

	// Display Usage Tips in Brewing Equipment modal
	if (card.dataset.usage) {
		usageEl.innerHTML = `
		<i class="fa-solid fa-screwdriver-wrench"></i> 
		<b>Usage Tips:</b> <br>${card.dataset.usage}`;
		usageEl.style.display = "block";
	}

	document.querySelector(".modal-add").onclick = (e) => {
		addProductToCart(card);
		showAddedFeedback(e.target);
	};
});

// Listening for Event Registration modal
document.addEventListener("click", (e) => {
	const card = e.target.closest(".btn-register");
	if (!card) return;

	e.stopPropagation();
	document.getElementById("eventModal").style.display = "flex";
});

// Close search suggestions on clicking somewhere else
document.addEventListener("click", (e) => {
	if (!searchForm.contains(e.target)) {
		suggestionsBox.innerHTML = "";
	}
});

// Closing modals if pointer clicks on somewhere else
window.onclick = (e) => {
	const productModal = document.getElementById("productModal");
	const eventModal = document.getElementById("eventModal");

	if (e.target === productModal) productModal.style.display = "none";
	if (e.target === eventModal) {
		eventModal.style.display = "none";
		// Safely clears out success message
		document.getElementById("eventRegisterForm").style.display = "flex";
		document.getElementById("eventSuccess").style.display = "none";
	}
};

let currentPurchaseItem = null;

document.addEventListener("click", (e) => {
	const btn = e.target.closest(".btn-offer");
	if (!btn) return;

	const box = btn.closest(".special-offers-box");
	if (!box) return;

	currentPurchaseItem = {
		title: box.dataset.title,
		price: box.dataset.price,
		type: box.dataset.type,
	};

	document.getElementById("paymentTitle").textContent =
		currentPurchaseItem.title;

	document.getElementById("paymentPrice").textContent =
		`Amount: ${currentPurchaseItem.price}`;

	document.getElementById("paymentModal").style.display = "flex";
});
document.getElementById("paymentForm").addEventListener("submit", (e) => {
	e.preventDefault();

	const inputs = e.target.querySelectorAll("input");
	inputs.forEach((input) => {
		input.value = sanitizeInput(input.value);
	});

	// Fake processing delay
	setTimeout(() => {
		document.getElementById("paymentModal").style.display = "none";
		document.getElementById("purchaseSuccess").style.display = "flex";

		currentPurchaseItem = null;
		e.target.reset();
	}, 800);
});
window.addEventListener("click", (e) => {
	if (e.target.id === "paymentModal") paymentModal.style.display = "none";
	if (e.target.id === "purchaseSuccess") purchaseSuccess.style.display = "none";
});

document.getElementById("closePaymentModal").onclick = () => {
	document.getElementById("paymentModal").style.display = "none";
};

document.getElementById("closePurchaseSuccess").onclick = () => {
	document.getElementById("purchaseSuccess").style.display = "none";
};

// Map
function initMap() {
	const shop = {
		name: "Bean Boutique Coffee Shop",
		position: { lat: 16.8409, lng: 96.1735 },
	};

	const events = [
		{
			title: "Latte Art Workshop",
			position: { lat: 16.845, lng: 96.175 },
		},
		{
			title: "Coffee Brewing Masterclass",
			position: { lat: 16.838, lng: 96.17 },
		},
	];

	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: shop.position,
	});

	// Shop marker
	new google.maps.Marker({
		map,
		position: shop.position,
		title: shop.name,
		icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
	});

	// Event markers
	events.forEach((event) => {
		new google.maps.Marker({
			map,
			position: event.position,
			title: event.title,
			icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
		});
	});
}

// Security Feature
// Sensitive payment data is not stored or logged.
// Data is processed temporarily and discarded after submission.
function sanitizeInput(value) {
	return value.replace(/[<>"]/g, "");
}
