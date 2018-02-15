// Variable for contact form
var contactForm = $('#contact');

// Polyfill for unsupported form attribute in Internet Explorer
$('button[type=submit]').click(function() {
    contactForm.submit();
});

// Add submit event listener to the form
contactForm.submit(function(e) {
	e.preventDefault();

	// Serialise the form data
	var data = contactForm.serialize();

	// Disable inputs and submit button
	$('input').prop('disabled', true);
	$('textarea').prop('disabled', true);
	$('button[type=submit]').prop('disabled', true);

	// Send AJAX request
	var request = $.ajax({
		url: 'mail.php',
		type: 'POST',
		data: data
	});

	// Display thank you message if request sent successfully
    request.done(function (response, textStatus, jqXHR){
        contactForm.html(response);
    });

    // Inform user if message fails to send
    request.fail(function (jqXHR, textStatus, errorThrown){
       	contactForm.html('<p>Sorry there was an error sending your message, please e-mail me directly at <a href="mailto:edgar.nightingale@btinternet.com" class="email">edgar.nightingale@btinternet.com</a> instead.</p>');
        // Log the error to the console
        console.error("The following error occurred: " + textStatus, errorThrown);
    });
});