<?php

// Get variables from AJAX request
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Set e-mail content from variables
$formcontent="From: $name \n Phone: $phone \n Email: $email \n Message: $message";
$recipient = "edgar.nightingale@btinternet.com";
$subject = "Enquiry from $name";
$mailheader = "From: edgar.nightingale@edgarnightingale.com \r\n";

// Send e-mail and echo response
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank you for your message! I will be in touch shortly.";