function loadCSV(url, onRow) {
	return fetch(url)
		.then((res) => {
			if (!res.ok) throw new Error(`Failed to load ${url}`);
			return res.text();
		})
		.then((text) => {
			const rows = text.split("\n").slice(1);

			rows.forEach((row, index) => {
				if (!row.trim()) return;
				onRow(row, index);
			});
		})
		.catch((err) => console.error("CSV load error:", err));
}
