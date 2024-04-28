<script>
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import bookgif from '$lib/assets/images/Book.gif';

	let transactions = [];
	let unsubscribe;
	let loading = false;
	let open = false;
	let onClosed;
	let page = 1;
	let per_page = 20;
	let total_items = null;
	let total_pages = null;

	let clients = [];
	let orders = [];
	let select_order = null;

	let newTransaction = {
		client: null,
		order: null,
		method_of_payment: null,
		amount: 0
	};
	const modalClose = () => {
		open = false;
	};
	const createTransaction = async () => {
		open = false;
		try {
			select_order = orders.find(order => order.id == newTransaction.order);
			newTransaction.order = select_order.id;
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
	const createTask = async () => {
		open = false;
		let newTask = {
			user: null,
			order: newTransaction.order,
			status: 'writing'
		};
		try {
			const response = await pb.collection('tasks').create(newTask);
			await pb.collection('orders').update(select_order.id, {
				current_task: response.id
			});
			goto('/transactions/my_transactions');
		} catch (err) {
			console.log(err);
		}
	};
	const changePage = async (selected_page) => {
		loading = true;
		page = selected_page;
		const resultList = await pb.collection('transactions').getList(page, per_page, {
			sort: 'created',
			expand: 'order, client'
		});
		transactions = resultList.items;
		loading = false;
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

	onMount(async () => {
		loading = true;
		const resultList = await pb.collection('transactions').getList(page, per_page, {
			sort: 'created',
			expand: 'client, order'
		});
		total_items = resultList.totalItems;
		total_pages = resultList.totalPages;
		transactions = resultList.items;

		// Get users
		const user_records = await pb.collection('users').getFullList({
			sort: '-created'
		});
		clients = [...user_records];
		clients = clients.filter(user => user.role.includes('Client'));
		// Get orders
		const orders_records = await pb.collection('orders').getFullList({
			sort: '-created',
			expand: 'client'
		});
		orders = [...orders_records];

		// Subscribe to realtime transactions
		unsubscribe = await pb.collection('transactions').subscribe('*', async ({ action, record }) => {
			loading = true;
			if (action === 'create' || action === 'update') {
				const resultList = await pb.collection('transactions').getList(page, per_page, {
					sort: 'created',
					expand: 'client, order'
				});
				total_items = resultList.totalItems;
				total_pages = resultList.totalPages;
				transactions = resultList.items;
			}
			if (action === 'delete') {
				transactions = transactions.filter((m) => m.id !== record.id);
			}
			loading = false;
		});
		loading = false;
	});

	// Unsubscribe from realtime transactions
	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<svelte:head>
	<title>My Tasks</title>
	<meta name="description" content="my transactions" />
</svelte:head>

<div class="card mt-5">
	<div class="card-body container">
		<div class="card-title row">
			<h4 class=" col-md-10">My Transaction</h4>
			<button class="btn btn-primary col-md-2" on:click={() => (open = true)}>
				<i class="mdi mdi-plus"></i>
				Record New Transaction
			</button>
		</div>
		<p class="card-description">All My Transaction</p>
		<div class="table-responsive">
			<table class="table table-hover">
				<thead>
				<tr>
					<th># Transaction No.</th>
					<th># Order No.</th>
					<th>Payment Method.</th>
					<th>Amount</th>
					<th>Client</th>
					<th>Created At</th>
				</tr>
				</thead>
				<tbody class="table-group-divider">
				{#if loading}
					<img
						style="width: 5rem; height: 5rem;"
						class="position-absolute top-100 start-50 translate-middle"
						src={bookgif}
						alt="loading"
					/>
				{/if}
				{#each transactions as transaction}
					<tr>
						<td>{transaction.id}</td>
						<td>{transaction.expand?.order?.id}</td>
						<td>{transaction.method_of_payment}</td>
						<td>{transaction.amount}</td>
						<td>{transaction.expand?.client?.name}</td>
						<td>
							{new Date(transaction.updated).toLocaleString()}
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
			<br />
			<nav aria-label="Page navigation example">
				<ul class="pagination justify-content-end">
					<li class="page-item {page == 1 ? 'disabled' : ''}">
						<a class="page-link" href="#" on:click={() => changePage(page - 1)}>Previous</a>
					</li>
					<li class="page-item"><a class="page-link" href="#" on:click={ () => changePage(page) }>{page}</a></li>
					<li class="page-item {page == total_pages ? 'disabled' : ''}">
						<a class="page-link" href="#" on:click={ () => changePage(page+1) }>Next</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>

{#if open}
	<div class="modal" id="sampleModal" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel"
			 aria-hidden={false}>
		<div class="modal-dialog" role="document" in:fly={{ y: -50, duration: 300 }}
				 out:fly={{ y: -50, duration: 300, easing: quintOut }}>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="sampleModalLabel">Record New Payment</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"
									on:click={() => modalClose()}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body ">
					<div class="form-group row">
						<label for="education_level" class="form-label col-sm-4">Client:</label>
						<div class="col-sm-8">
							<select
								class="form-control"
								id="client"
								bind:value={newTransaction.client}
								required
							>
								<option value={null}>Select Client</option>
								{#each clients as client}
									<option value={client.id}>
										{client.name}
									</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="education_level" class="form-label col-sm-4">Order:</label>
						<div class="col-sm-8">
							<select
								class="form-control"
								id="client"
								bind:value={newTransaction.order}
								required
							>
								<option value={null}>Select Order</option>
								{#each orders.filter((order) => order.client == newTransaction.client) as order}
									<option value={order.id}>
										{order.id}
									</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="citation_type" class="form-label col-sm-4">Payment Method:</label>
						<div class="col-sm-8">
							<select
								class="form-control"
								id="method_of_payment"
								bind:value={newTransaction.method_of_payment}
								required
							>
								<option value={null}>Select</option>
								<option value="PayPal">PayPal</option>
								<option value="M-pesa">M-pesa</option>
							</select>
						</div>
					</div>

					<div class="form-group row">
						<label for="field_of_study" class="form-label col-sm-4">Amount:</label>
						<div class="col-sm-8">
							<input
								type="number"
								class="form-control"
								id="amount" min="1" step="any"
								bind:value={newTransaction.amount}
								required
							/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={() => modalClose()}>
						Close
					</button>
					<button type="button" class="btn btn-primary" on:click={createTransaction}>Create</button>
				</div>
			</div>
		</div>
	</div>
	{#if open}
		<div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
	{/if}
{/if}

<style>
    .modal {
        display: block;
    }
</style>