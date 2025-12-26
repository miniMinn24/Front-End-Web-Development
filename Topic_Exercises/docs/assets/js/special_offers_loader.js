loadCSV("assets/database/special_offers.csv", (row, index) => {
	const container = document.getElementById("offersContainer");
	if (!container) return;

	// Parse CSV row
	const [id, title, price, type, description, benefits, image, hottest] =
		row.split(",");

	const box = document.createElement("div");
	box.className = "box product offers-box";
	if (index >= 3) box.classList.add("offers-hide");

	box.dataset.title = title;
	box.dataset.price = price;
	box.dataset.description = description;
	box.dataset.img = image;
	box.dataset.type = type;
	box.dataset.benefits = benefits;
	box.dataset.search = `${title} ${type} ${description}`.toLowerCase();

	box.dataset.hottest = hottest;

	const badge =
		type === "subscription"
			? `<span class="offer-badge sub">Subscription</span>`
			: `<span class="offer-badge promo">Special</span>`;

	const benefitsList = benefits
		.split(";")
		.map((b) => `<li>${b.trim()}</li>`)
		.join("");

	if (box.dataset.hottest == "yes") {
		box.classList.add("offers-hottest");

		box.innerHTML = `
		${badge}
		<img src="${image}" alt="${title}" class="product-img">

		<h3>${title}</h3>
		<div class="price">${price}</div>

		<p class="description">${description}</p>

		<ul class="offer-benefits">
			${benefitsList}
		</ul>

		<button class="btn-offer">
			${type === "subscription" ? "Subscribe" : "View Deal"}
		</button>
	`;
	} else {
		box.innerHTML = `
		${badge}
		<img src="${image}" alt="${title}" class="product-img">

		<h3>${title}</h3>
		<div class="price">${price}</div>

		<p class="description">${description}</p>

		<ul class="offer-benefits">
			${benefitsList}
		</ul>

		<button class="btn-offer">
			${type === "subscription" ? "Subscribe" : "View Deal"}
		</button>
	`;
	}

	container.appendChild(box);
});
