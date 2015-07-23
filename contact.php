<?php

$email = stripslashes(trim($_POST['inputEmail']));
$message = stripslashes(trim($_POST['inputMessage']));
$captcha = $_POST['g-recaptcha-response'];
$pattern  = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

function validateCaptcha() {
    try {
      $data = array(
        'secret' => '[secret]',
        'response' => $_POST['g-recaptcha-response'],
        'remoteip' => $_SERVER['REMOTE_ADDR']
      );

      $options = array(
        'http' => array(
          'header' => 'Content-type: application/x-www-form-urlencoded\r\n',
          'method' => 'POST',
          'content' => http_build_query($data)
        )
      );

      $context = stream_context_create($options);
      $result = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);

      return json_decode($result)->success;
    } catch (Exception $e) {
      return null;
    }
}

if (preg_match($pattern, $email)) {
  $result = "Something went wrong, please try again";

} else if (!$captcha) {
  $result = "reCAPTCHA missing";

} else if (!isset($email) || strlen($email) < 3 ||
           !isset($message) || strlen($message) < 10) {
  $result = "Contact message or email too short";

} else if (!preg_match('/^[^@]+@[^@]+\.[^@]+$/', $email)) {
  $result = "The email you entered doesn't seem to be valid";

} else {
  if (!validateCaptcha()) {
    $result = "reCAPTCHA failed";
  }

  $emailTo = 'mark@devarit.uk';

  $headers = 'Content-type: text/html; charset=utf-8' . PHP_EOL;
  $headers .= 'From: $email' . PHP_EOL;
  $headers .= 'Return-Path: $emailTo' . PHP_EOL;
  $headers .= 'Reply-To: $email_from' . PHP_EOL;
  $headers .= 'X-Mailer: PHP/' . phpversion() . PHP_EOL;

  $message = '<br>' . $message . '<br>';
  mail($emailTo, 'Devarit Contact', $message, $headers);
}

?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Devarit Ltd.</title>

  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

  <script>
    // some magic that works out whether cdn's have loaded, if they haven't, it uses local sources instead
    // told you it was magic ;)
    var cdns = [
      '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
      '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
    ];

    var modified = false;
    for (var i = 0; i < document.styleSheets.length; ++i) {
      cdns.forEach(function(cdn) {
        var sheet = document.styleSheets[i];
        if (sheet.href.substring(sheet.href.length - cdn.length) == cdn) {
          var rules = sheet.rules ? sheet.rules : sheet.cssRules;
          if (rules.length == 0) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            // that mysterious thing down there is regex for "get everything after the last /"
            link.href = "css/" + /[^/]*$/.exec(cdn)[0];

            document.head.appendChild(link);
          }
        }
      });
    }
  </script>

  <link rel="stylesheet" href="css/devarit.css">

  <link href='http://fonts.googleapis.com/css?family=Oxygen:700,400' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <?php if (isset($result)) { ?>
          <h1>Error</h1>
          <h4><?php echo $result; ?></h4>
          <?php } else { ?>
          <h1>Thank you</h1>
          <h4>We've received your message</h4>
          <?php } ?>
        </div>
      </div>
    </div>

    <div class="home-helper">
      <a href="index.html">
        <i class="fa fa-chevron-left fa-2x"></i>
      </a>
    </div>
  </header>
</body>
</html>
