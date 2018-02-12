// Variable for contact form
const contactForm = document.getElementById('contact');

// Add submit event listener to the form
contactForm.addEventListener('submit', function(e) {
	e.preventDefault();

	// Set variables for inputs
	const name = document.getElementsByName('name')[0].value;
	const email = document.getElementsByName('email')[0].value;
	const phone = document.getElementsByName('phone')[0].value;
	const message = document.getElementsByName('message')[0].value;

	// Set data from input values
	const data = `name=${name}&email=${email}&phone=${phone}&message=${message}`;

	// Create XMLHttp request
	const sendMail = new XMLHttpRequest();

	// Set container for response from php form
	sendMail.onreadystatechange = function() {
		document.getElementById('contact').innerHTML = this.responseText;
	}

	// Send the request
	sendMail.open('POST', 'mail.php?', true);
	sendMail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	sendMail.send(data);
});