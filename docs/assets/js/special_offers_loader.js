const specialOffersContainer = document.getElementById(
	"specialOffersContainer"
);

if (!specialOffersContainer) {
	specialOffersContainer.innerHTML = "";
}

loadCSV("assets/database/special_offers.csv", (row, index) => {
	const [
		id,
		title,
		price,
		payment_modal,
		type,
		description,
		benefits,
		image,
		hottest,
		discount,
	] = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

	const box = document.createElement("div");
	box.className =
		index >= 3
			? "special-offers-box special-offers-hide"
			: "special-offers-box";

	const badge =
		type === "subscription"
			? `<span class="offer-badge sub">Subscription</span>`
			: `<span class="offer-badge promo">Special</span>`;

	const benefitsList = benefits
		.split(";")
		.map((b) => `<li>${b.trim()}</li>`)
		.join("");

	if (discount > 0) {
		const current_price = price.replace(/[$,]/g, "");
		const discount_price =
			"$" +
			(current_price - ((100 * discount) / 100) * current_price).toFixed(2);

		box.innerHTML = `
	${badge}
		<div class="offer-image">
			<img src="${image}" alt="${title}">
		</div>

		<h3>${title}</h3>
		<p class="offer-description">${description}</p>

		<div class="offer-discount-percent">Save <span>${discount * 100}%</span></div>
		<div class="offer-price-warpper">
			<div class="offer-discount-price">${price}</div>
			<div class="offer-price">${discount_price}<span>${payment_modal}</span></div>
		</div>

				<button class="btn-offer">
			${type === "subscription" ? "Subscribe" : "View Deal"}
		</button>


		<ul class="offer-benefits">
			${benefitsList}
		</ul>
	`;
		box.dataset.price = discount_price;
	} else {
		box.innerHTML = `
	${badge}
		<div class="offer-image">
			<img src="${image}" alt="${title}">
		</div>

		<h3>${title}</h3>
				<p class="offer-description">${description}</p>

		<div class="offer-price">${price}<span>${payment_modal}</span></div>

				<button class="btn-offer">
			${type === "subscription" ? "Subscribe" : "View Deal"}
		</button>


		<ul class="offer-benefits">
			${benefitsList}
		</ul>
	`;

		box.dataset.price = price;
	}

	if (hottest == "yes") {
		box.classList.add("offer-hottest");
	}

	box.dataset.title = title;
	box.dataset.type = type;

	specialOffersContainer.appendChild(box);
});
