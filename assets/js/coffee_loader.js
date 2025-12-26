const coffeeContainer = document.getElementById("coffeeContainer");
if (!coffeeContainer) {
	console.error("coffeeContainer not found");
} else {
	coffeeContainer.innerHTML = "";

	loadCSV("assets/database/coffee.csv", (row, index) => {
		const [id, image, name, price, notes, brew, description] = row.split(
			/,(?=(?:(?:[^"]*"){2})*[^"]*$)/
		);

		const box = document.createElement("div");
		box.className = "box product-box";

		if (index >= 4) box.classList.add("coffee-hide");

		box.dataset.title = name;
		box.dataset.img = image;
		box.dataset.price = `$${price}`;
		box.dataset.description = description.replace(/"/g, "");
		box.dataset.notes = notes.replace(/"/g, "");
		box.dataset.brew = brew.replace(/"/g, "");
		box.dataset.search = name.toLowerCase();

		box.innerHTML = `
			<img src="${image}" class="product-img" alt="${name}">
			<h3 class="product-title">${name}</h3>
			<p class="description">${description.replace(/"/g, "")}</p>
			<div class="price">$${price}</div>
			<button class="add-cart">+ Add</button>
		`;

		coffeeContainer.appendChild(box);
	});
}
