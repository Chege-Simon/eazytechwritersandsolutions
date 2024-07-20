<script lang="js">
	import { loadScript } from '@paypal/paypal-js';
	import { onMount } from 'svelte';	
	import { currentUser, pb } from '$lib/pocketbase.js';
	export let data;

	// export let amount = 0.01;
	const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
	
	let orders = [];
	let select_order = {};

	let newTransaction = {
		client: null,
		order: null,
		method_of_payment: null,
		amount: 0
	};

	const createTransaction = async () => {
		try {
			// select_order = orders.find(order => order.id == newTransaction.order);
			newTransaction.order = select_order.id;
			newTransaction.order = currentUser.id;
			newTransaction.method_of_payment = 'PayPal';
			await pb.collection('transactions').create(newTransaction);
			await receivedTransaction();
			await pb.collection('orders').update(select_order.id, {
				paid_amount: newTransaction.amount + select_order.paid_amount
			});

			if (newTransaction.amount + select_order.paid_amount >= select_order.amount) {
				await createTask();
			}
			// goto('/transactions/my_transactions');
		} catch (err) {
			console.log(err);
		}
	};
	const receivedTransaction = async () => {
		//create new notification
		await pb.collection('notifications').create({
			title: 'Payment Confirmation',
			content: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Payment Received</title>
				<style>
						/* Styles for the email template */
						body {
								font-family: Arial, sans-serif;
								line-height: 1.6;
								margin: 0;
								padding: 0;
								background-color: #f2f2f2;
						}
						.container {
								max-width: 600px;
								margin: 0 auto;
								padding: 20px;
								background-color: #ffffff;
						}
						h1 {
								color: #333333;
						}
						p {
								color: #666666;
						}
				</style>
				</head>
				<body>

				<div class="container">
						<h1>Payment Received</h1>
						<p>Dear ${select_order.expand?.client?.name},</p>
						<p>We are pleased to inform you that we have received your payment.</p>
						<p>Payment Details:</p>
						<ul>
								<li><strong>Method of Payment:</strong> ${newTransaction.method_of_payment}</li>
								<li><strong>Amount:</strong>${newTransaction.amount}</li>
						</ul>
						<p>This payment has been successfully processed and credited to your account.</p>
						<p>If you have any questions or concerns regarding this payment, please don't hesitate to contact us.</p>
						<p>Thank you for your business!</p>
						<p>Sincerely,<br>EazyTech Writers & Solutions</p>
				</div>

				</body>
				</html>
				`,
			user: select_order.expand?.client?.id,
			user_email: select_order.expand?.client?.email
		});
	};
	onMount(() => {
		select_order = data.order;
		console.log(select_order);
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
										value: select_order.paid_amount <= 0 ? Math.round((select_order.amount + Number.EPSILON) * 100) / 100 / 2  : select_order.amount - select_order.paid_amount
									}
								}
							]
						});
					},
					onApprove: async function (data, actions) {
						const details = await actions.order.capture();
						// alert('Payment successful!');
						await createTransaction();
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
