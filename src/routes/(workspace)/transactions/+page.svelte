<script lang="js">

</script>

<svelte:head>
	<title>Payment</title>
	<meta name="description" content="pay for services" />
</svelte:head>

<div class="contianer row">
	<div class="card mt-5 col-md-5 mx-auto">
		<div class="card-header">
			<h4>PayPal Payment</h4>
		</div>
		<div class="card-body">
			<p>If you'd like to make a payment, please send it to the following PayPal email:</p>
			<div class="alert alert-secondary text-primary" role="alert">
				your-paypal-email@example.com
			</div>
			<p>Instructions for making a payment:</p>
			<ol>
				<li>Go to <a href="https://www.paypal.com" target="_blank">www.paypal.com</a>.</li>
				<li>Log in to your PayPal account.</li>
				<li>Click on "Send & Request" at the top of the page.</li>
				<li>Enter the PayPal email address you need to send payment to (as shown above).</li>
				<li>Enter the amount you wish to send and choose the currency.</li>
				<li>Review your payment and click "Send Payment Now".</li>
				<li>Wait for payment confirmation to download your results.</li>
			</ol>
		</div>
	</div>
	<div class="card mt-5 col-md-5 mx-auto">
		<div class="card-header">
			<h4>Send Money with WorldRemit</h4>
		</div>
		<div class="card-body">
			<p>If you'd like to send money securely and conveniently, follow these steps:</p>
			<p>Recipient Details:</p>
			<div class="alert alert-secondary text-primary" role="alert">
				Recipient's Name: [Recipient's Full Name]<br>
				Recipient's Location: [Recipient's Country/City]
			</div>
			<p>Instructions for Sending Money:</p>
			<ol>
				<li>Visit <a href="https://www.worldremit.com" target="_blank">www.worldremit.com</a>.</li>
				<li>Log in to your WorldRemit account or sign up if you're a new user.</li>
				<li>Select the country you want to send money to and the amount you wish to send.</li>
				<li>Choose a delivery method (e.g., bank deposit, cash pickup, mobile money).</li>
				<li>Enter the recipient's details, including their full name and contact information.</li>
				<li>Review the exchange rate, fees, and total amount to be sent.</li>
				<li>Proceed to payment using your preferred method (debit/credit card, bank transfer).</li>
				<li>Once payment is confirmed, WorldRemit will process your transfer.</li>
				<li>Notify your recipient about the transfer and provide any necessary details for collection.</li>
			</ol>
		</div>
	</div>
</div>
