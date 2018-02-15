// Variable for contact form
var contactForm = $('#contact');
var responseContainer = $('#form-inputs');

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
        responseContainer.html(response);
    });

    // Inform user if message fails to send
    request.fail(function (jqXHR, textStatus, errorThrown){
       	responseContainer.html('<p>Sorry there was an error sending your message, please e-mail me directly at <a href="mailto:edgar.nightingale@btinternet.com" class="email">edgar.nightingale@btinternet.com</a> instead.</p>');
        // Log the error to the console
        console.error("The following error occurred: " + textStatus, errorThrown);
    });
});

// Function for smooth scrolling on all same page links
// Select all links with hashes and remove links that don't actually link to anything
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
	// On-page links
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();

			// Initiate scroll animation
			$('html, body').animate({scrollTop: target.offset().top}, 1000, function() {
				// Callback after animation
				// Must change focus!
				var $target = $(target);
				$target.focus();

				// Check if the target was focused
				if ($target.is(":focus")) {
			    	return false;
				} else {
				// Add tabindex for elements not focusable and focus again
				$target.attr('tabindex','-1');
				$target.focus();
			  	};
			});
		}
	}
});