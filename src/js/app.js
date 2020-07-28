$(document).ready(function(){

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

	// Apply background and show name/title details on navbar once scrolled away from the top
	function setNavbarColor() {
		if ($(window).scrollTop() > 50) {
			$('nav').removeClass('navbar-light');
			$('nav').addClass('navbar-dark navbar-style');
			$('.navbar-details').css('opacity', '1');
		} else {
			$('nav').removeClass('navbar-dark navbar-style');
			$('nav').addClass('navbar-light');
			$('.navbar-details').css('opacity', '0');
		}
	}

	setNavbarColor();
	$(window).bind('scroll', setNavbarColor);

	// Typewriter function
  // array with texts to type in typewriter
  var dataText = [ "Edgar Nightingale", "Front-End Web Developer"];

  // array of elements to type into
  var elements = [$('.title-info h1')[0], $('.title-info h2')[0]]
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, element, i, fnCallback) {
    // check if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     element.innerHTML = text.substring(0, i + 1) + '<span id="caret" aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, element, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }

  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined') {
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (dataText[i] && i < dataText[i].length) {
    	if (i === 0) {
    		elements.forEach(function(element) {
  				element.innerHTML = '';
  			})
    	}
    	// Remove current caret
    	$('#caret').remove();
      // text exists! start typewriter animation
     	typeWriter(dataText[i], elements[i], 0, function(){
      	// after callback (and whole text has been animated), start next text
       	StartTextAnimation(i + 1);
     	});
    }
  }
  // start the text animation
  StartTextAnimation(0);

});