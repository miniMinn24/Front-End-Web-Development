// Function to check only even numbers
function check_even_numbers(num) {
	if (num % 2 == 0) {
		return num;
	}
	return "";
}

// Finding even numbers from 0 to 99
for (let count = 0; count < 100; count++) {
	document.write(check_even_numbers(count));
	document.write("<br/>");
}
