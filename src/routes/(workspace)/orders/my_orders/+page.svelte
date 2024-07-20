<script>
	import bookgif from '$lib/assets/images/Book.gif';
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import Modal from '../../Modal.svelte';

	let showDeletePopup = false;
	let showAssignPopup = false;
	let targetOrder = {};
	let orders = [];
	let unsubscribe;
	let loading = false;
	let page = 1;
	let per_page = 20;
	let total_items = null;
	let total_pages = null;

	const onShowDeletePopup = (clickedOrder) => {
		targetOrder = clickedOrder;
		showDeletePopup = true;
	};

	const onPopupClose = async (option) => {
		showAssignPopup = false;
		showDeletePopup = false;
		if (option == 'Delete' && targetOrder != null) {
			orders = orders.filter((m) => m.id !== targetOrder.id);
			await pb.collection('orders').delete(targetOrder.id);
		}
	};
	const changePage = async (selected_page) => {
		loading = true;
		page = selected_page;
		const resultList = await pb.collection('orders').getList(page, per_page, {
			sort: 'created',
			expand: 'education_level, client, service_type, current_task'
		});
		orders = resultList.items;
		loading = false;
	};
	onMount(async () => {
		loading = true;
		const resultList = await pb.collection('orders').getList(page, per_page, {
			sort: 'created',
			expand: 'education_level, client, service_type, current_task'
		});
		total_items = resultList.totalItems;
		total_pages = resultList.totalPages;
		orders = resultList.items;
		// Subscribe to realtime orders
		unsubscribe = await pb.collection('orders').subscribe('*', async ({ action, record }) => {
			loading = true;
			if (action === 'create') {
				// Fetch associated client, current_task, education_level, service_type
				const client = await pb.collection('users').getOne(record.client);
				const current_task = await pb.collection('tasks').getOne(record.current_task);
				const education_level = await pb
					.collection('education_levels')
					.getOne(record.order.education_level);
				const service_type = await pb.collection('service_types').getOne(record.order.service_type);
				record.expand = { education_level, client, service_type, current_task };
				orders = [record, ...orders];
			}
			if (action === 'delete') {
				orders = orders.filter((m) => m.id !== record.id);
			}
			loading = false;
		});
		loading = false;
	});

	// Unsubscribe from realtime orders
	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<svelte:head>
	<title>My Orders</title>
	<meta name="description" content="my orders" />
</svelte:head>

<div class="card mt-5">
	<div class="card-body container">
		<div class="card-title row">
			<h4 class=" col-md-10">My Orders</h4>
			<a class="btn btn-primary col-md-2" href="/orders/new">
				<i class="mdi mdi-plus"></i>
				Place Order
			</a>
		</div>
		<p class="card-description">All My Orders</p>
		<div class="table-responsive">
			<table class="table table-hover">
				<thead>
					<tr>
						<th># Order No.</th>
						<th>Client</th>
						<th>Title</th>
						<th>Field Of Study</th>
						<th>Days To Deadline</th>
						<th>Price</th>
						<th>Amount Paid</th>
						<th>Status</th>
						<th>Actions</th>
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
					{#each orders as order}
						<tr>
							<td>{order.id}</td>
							<td>{order.expand?.client?.name}</td>
							<td>{order.title}</td>
							<td>{order.field_of_study}</td>
							<td>
								{order.deadline_range_end
									? Math.floor(
											(new Date(order.deadline_range_end) - Date.now()) / (1000 * 60 * 60 * 24),
											2
										) + ' Days'
									: ''}
							</td>
							<td>{order.amount}</td>
							<td>{order.amount_paid}</td>
							<td>
								{#if order.expand?.current_task?.status == 'open' || order.expand?.current_task == null}
									<i class="badge badge-warning"
										>{order.current_task ? order.current_task.status : 'pending payment'}</i
									>
								{:else if order.expand?.current_task?.status == 'writing'}
									<i class="badge badge-warning">{order.expand?.current_task?.status}</i>
								{:else if order.expand?.current_task?.status == 'review'}
									<i class="badge badge-secondary">{order.expand?.current_task?.status}</i>
								{:else if order.expand?.current_task?.status == 'client_review'}
									<i class="badge badge-info">{order.expand?.current_task?.status}</i>
								{:else if order.expand?.current_task?.status == 'closed'}
									<i class="badge badge-success">{order.expand?.current_task?.status}</i>
								{:else if order.expand?.current_task?.status == 'delayed'}
									<i class="badge badge-danger">{order.expand?.current_task?.status}</i>
								{/if}
							</td>
							<td>
								{#if order.amount_paid <= order.amount / 2}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									class="badge btn-inverse-success"
									style="cursor: pointer;"
									href="/transactions/{order.id}">Pay</a
								>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									class="badge btn-inverse-primary"
									style="cursor: pointer;"
									href="/orders/{order.id}">Edit</a
								>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-missing-attribute -->
									<a
										class="badge btn-inverse-danger"
										style="cursor: pointer;"
										on:click={onShowDeletePopup(order)}>Delete</a
									>
								{:else if (order.expand?.current_task?.status == 'client_review' || order.expand?.current_task?.status == 'closed') && ($currentUser.role.includes('Client') || $currentUser.role.includes('Admin'))}
									<a
										href={pb.files.getUrl(
											order.expand?.current_task,
											order.expand?.current_task?.order_preview_files,
											{ thumb: '100x300f' }
										)}
										target="_blank"
										rel="noreferrer"
										class="badge btn-inverse-success">Preview</a
									>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-missing-attribute -->
									<a
										class="badge btn-inverse-success"
										style="cursor: pointer;"
										href="/transactions/{order.id}">Pay</a
									>
								{:else if ($currentUser.role.includes('Client') || $currentUser.role.includes('Admin')) && order.amount_paid >= order.amount}
									<a
										href={pb.files.getUrl(
											order.expand?.current_task,
											order.expand?.current_task?.order_preview_files
										) + '?download=1'}
										target="_blank"
										rel="noreferrer"
										class="badge btn-inverse-primary">Download</a
									>
								{/if}
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
					<li class="page-item">
						<a class="page-link" href="#" on:click={() => changePage(page)}>{page}</a>
					</li>
					<li class="page-item {page == total_pages ? 'disabled' : ''}">
						<a class="page-link" href="#" on:click={() => changePage(page + 1)}>Next</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>
<Modal
	open={showDeletePopup}
	onClosed={(option) => onPopupClose(option)}
	title={'Delete Order'}
	button="Delete"
	button_color="danger"
>
	<div class="text-center">
		<i class="mdi mdi-alert-circle-outline text-danger fs-1"></i>
		<h2>Are you sure?</h2>
		<h5>You won't be able to revert this!</h5>
	</div>
</Modal>
