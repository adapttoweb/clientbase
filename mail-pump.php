<?php

//read the data
$temp = file_get_contents('php://input');
parse_str($temp, $post_body);
parse_str($post_body["campaign"], $campaign);
parse_str($post_body["goodies"], $goodies);
parse_str($post_body["account"], $account);

$post_body["campaign"] = json_decode($post_body["campaign"], true);
$post_body["goodies"] = json_decode($post_body["goodies"], true);
$post_body["account"] = json_decode($post_body["account"], true);


//work with the goodies
$goodies = "";
$i=0;
foreach ($post_body["goodies"] as $k => $v) {
	$i++;

	$goodies .= "Goodie number			" . $i . "\r\n";
	$goodies .= "Goodie Headline:			" . $v["winHeadline"] . "\r\n";
	$goodies .= "Goodie Description:		" . "\r\n" . $v["winBeschreibung"] . "\r\n\r\n";
	$goodies .= "Goodie Type:				" . $v["gType"] . "\r\n";

	if ($v["gTypeText"]) {
		$goodies .= "Goodie Type Custom:		" . $v["gTypeCustom"] . "\r\n\r\n";
	}

	$goodies .= "Goodie Legal:				" . $v["gLegal"] . "\r\n";

	if ($v["gLegalText"]) {
		$goodies .= "Goodie Legal Custom:		" . $v["gLegalCustom"] . "\r\n\r\n";
	}

	$goodies .= "\r\n";

}

//start sending mail
$empfaenger = $post_body["to"];
$betreff = $post_body["subject"];
$nachricht = 'Hello Campaign Master,' . "\r\n" . "\r\n" .
	//$temp . "\r\n" .
	"Campaign Headline: 		" . $post_body["campaign"]["newHeadline"] . "\r\n" . "\r\n" .

	"Goodies for the campaign (" . count($post_body["goodies"]) . ") \r\n" . "\r\n" .

		$goodies . "\r\n" . "\r\n" .

	"Account info" . "\r\n" ."\r\n" .
	"Contact Person:			" . $post_body["account"]["contactPerson"] . "\r\n" .
	"Contact Email:				" . $post_body["account"]["contactEmail"] . "\r\n" .
	"Contact Phone:			" . $post_body["account"]["contactPhone"] . "\r\n\r\n" .

	"Account Name: 			" . $post_body["campaign"]["newUnternehmensName"] . "\r\n" .
	"Account Description:		" . $post_body["campaign"]["newUnternehmenstext"] . "\r\n\r\n" .
	"Company Name:			" . $post_body["account"]["companyName"] . "\r\n" .
	"Company Impressum:			" . "\r\n" . $post_body["campaign"]["newUnternehmensImpr"] . "\r\n\r\n" .

	"Website:					" . $post_body["account"]["contactWebsite"] . "\r\n" .
	"Facebook Page:			" . $post_body["account"]["facebookPage"] . "\r\n" .
	"Support Email:			" . $post_body["account"]["supportEmail"] . "\r\n" .
	"Support Phone:			" . $post_body["account"]["supportPhone"] . "\r\n" .

	"\r\n";


$header = 'From: webmaster@rublys.com' . "\r\n" .
    'Reply-To: office@rublys.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$betreff = $post_body["account"]["companyName"];

mail($empfaenger, $betreff, $nachricht, $header);

unset($temp);

?>
