// Call owl carousel plugin
$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
  	center:true,
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    smartSpeed:2000,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      800:{
      	items:2
      },
      1000:{
        items:3
      }
    }
	})

	// $('.owl-carousel').on('click', function(e) {
	// 	console.log($('.owl-carousel').owlCarousel())
	// 	if ($('.owl-carousel').owlCarousel.autoplay) {
	//     $('.owl-carousel').trigger('stop.owl.autoplay');
	// 	} else {
	//     $('.owl-carousel').trigger('play.owl.autoplay');			
	// 	}
	// })
});

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
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 50) {
        $('nav').addClass('navbar-style');
        $('.navbar-details').css('opacity', '1');
    } else {
        $('nav').removeClass('navbar-style');
        $('.navbar-details').css('opacity', '0');
    }
});

// Set margins of the navbar for small screens
function setNavBar() {
	if ($(window).width() < 576) {
		$('.nav-item').removeClass('ml-3');
		$('.navbar-nav').removeClass('ml-auto mr-5');
		$('.navbar-nav').addClass('ml-5');
	}
	else {
		$('.navbar-nav').removeClass('ml-5');
		$('.navbar-nav').addClass('ml-auto mr-5');
		$('.nav-item').addClass('ml-3');
	}
};

setNavBar()

$(window).resize(function() {
	setNavBar();
});