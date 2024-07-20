<script lang="js">
	import { loadScript } from '@paypal/paypal-js';
	import { onMount } from 'svelte';

	export let amount = 0.01;
	const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

	onMount(() => {
		loadScript({ 'client-id': CLIENT_ID }).then((paypal) => {
			paypal
				.Buttons({
					style: {
						color: 'blue',
						shape: 'pill'
					},
					createOrder: function (data, actions) {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: amount
									}
								}
							]
						});
					},
					onApprove: async function (data, actions) {
						const details = await actions.order.capture();
						// alert('Payment successful!');
						console.log('Payment Success => ', details);
					},
					onError: function (err) {
						console.log('Something went wrong', err);
					}
				})
				.render('#paypal-button-container');
		});
	});
</script>

<svelte:head>
	<title>Payment</title>
	<meta name="description" content="pay for services" />
</svelte:head>

<div class="container vh-100">
	<div class="row justify-content-center">
		<div class="col-12 col-md-8">
			<div id="paypal-button-container" class="my-5"></div>
			<div class="card mt-5">
				<div class="card-header">
					<h4>Send Money with WorldRemit</h4>
				</div>
				<div class="card-body">
					<p>If you'd like to send money securely and conveniently, follow these steps:</p>
					<p>Recipient Details:</p>
					<div class="alert alert-secondary text-primary" role="alert">
						Recipient's Name: [Recipient's Full Name]<br />
						Recipient's Location: U.K
					</div>
					<p>Instructions for Sending Money:</p>
					<ol>
						<li>
							Visit <a href="https://www.worldremit.com" target="_blank">www.worldremit.com</a>.
						</li>
						<li>Log in to your WorldRemit account or sign up if you're a new user.</li>
						<li>Select the country you want to send money to and the amount you wish to send.</li>
						<li>Choose a delivery method (e.g., bank deposit, cash pickup, mobile money).</li>
						<li>Enter the recipient's details, including their full name and contact information.</li>
						<li>Review the exchange rate, fees, and total amount to be sent.</li>
						<li>
							Proceed to payment using your preferred method (debit/credit card, bank transfer).
						</li>
						<li>Once payment is confirmed, WorldRemit will process your transfer.</li>
						<li>
							Notify your recipient about the transfer and provide any necessary details for
							collection.
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#paypal-button-container {
		margin: 20px 0;
	}
</style>
