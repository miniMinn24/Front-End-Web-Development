// functions
function formatBadge(dateStr) {
	const date = new Date(dateStr);
	return `
    <div class="event-badge">
      <span class="day"><strong>${date.getDate()}</strong></span>
      <span class="month">${date.toLocaleString("default", { month: "short" })}</span>
    </div>
  `;
}

function formatEventDate(start, end) {
	if (!end || start === end) {
		return new Date(start).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	}

	return `
    ${new Date(start).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})}
    -
    ${new Date(end).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})}
  `;
}

function formatTime(startTime, endTime) {
	return `${startTime} - ${endTime}`;
}

const eventsContainer = document.getElementById("eventsContainer");
if (!eventsContainer) {
	eventsContainer.innerHTML = "";
}

loadCSV("assets/database/events_and_workshops.csv", (row, index) => {
	const [
		id,
		image,
		title,
		description,
		startDate,
		endDate,
		startTime,
		endTime,
	] = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

	const box = document.createElement("div");
	box.className = index >= 2 ? "box event-box event-hide" : "box event-box";

	box.innerHTML = `
		<div class="event-image">
			<img src="${image}" alt="${title}">
			${formatBadge(startDate)}
		</div>

		<div class="padding">
			<h3 class="event-title">${title}</h3>
			<p class="event-description">${description.replace(/"/g, "")}</p>

			<div class="event-time-wrapper">
				<p class="event-time">
					<i class="fa-solid fa-calendar"></i>
					${formatEventDate(startDate, endDate)}<br>
					<i class="fa-regular fa-clock"></i>
					${formatTime(startTime, endTime)}
				</p>
			</div>

			<button class="btn-register">Register</button>
		</div>
	`;

	eventsContainer.appendChild(box);
});
