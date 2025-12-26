const equipmentContainer = document.getElementById("equipmentContainer");
if (!equipmentContainer) {
	console.error("equipmentContainer not found");
} else {
	equipmentContainer.innerHTML = "";

	loadCSV("assets/database/equipment.csv", (row, index) => {
		const [id, image, name, price, description, usage] = row.split(
			/,(?=(?:(?:[^"]*"){2})*[^"]*$)/
		);

		const box = document.createElement("div");
		box.className = "box product-box";

		if (index >= 4) box.classList.add("equipment-hide");

		box.dataset.title = name;
		box.dataset.img = image;
		box.dataset.price = `$${price}`;
		box.dataset.description = description.replace(/"/g, "");
		box.dataset.usage = usage.replace(/"/g, "");
		box.dataset.search = name.toLowerCase();

		box.innerHTML = `
			<img src="${image}" class="product-img" alt="${name}">
			<h3 class="product-title">${name}</h3>
			<p class="description">${description.replace(/"/g, "")}</p>
			<div class="price">$${price}</div>
			<button class="add-cart">+ Add</button>
		`;

		equipmentContainer.appendChild(box);
	});
}
