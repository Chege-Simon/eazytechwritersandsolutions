<script>
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import Modal from '../../Modal.svelte';
	import bookgif from '$lib/assets/images/Book.gif';

	let showDeletePopup = false;
	let targetTask = {};
	let tasks = [];
	let unsubscribe;
	let loading = false;
	let page = 1;
	let per_page = 20;
	let total_items = null;
	let total_pages = null;

	const changePage = async (selected_page) => {
		loading = true;
		page = selected_page;
		const resultList = await pb.collection('orders').getList(page, per_page, {
			sort: 'created',
			expand: 'education_level, client, service_type, current_task'
		});
		total_items = resultList.totalItems;
		total_pages = resultList.totalPages;
		tasks = resultList.items;
		loading = false;
	};
	onMount(async () => {
		loading = true;
		const resultList = await pb.collection('tasks').getList(page, per_page, {
			sort: 'created',
			expand: 'user, order, order.education_level, order.client, order.service_type, order.task'
		});
		total_items = resultList.totalItems;
		total_pages = resultList.totalPages;
		tasks = resultList.items;
		// Subscribe to realtime tasks
		unsubscribe = await pb.collection('tasks').subscribe('*', async ({ action, record }) => {
			loading = true;
			if (action === 'create' || action === 'update') {
				const resultList = await pb.collection('tasks').getList(page, per_page, {
					sort: 'created',
					expand: 'user, order, order.education_level, order.client, order.service_type, order.task'
				});
				tasks = resultList.items;
			}
			if (action === 'delete') {
				tasks = tasks.filter((m) => m.id !== record.id);
			}
			loading = false;
		});
		loading = false;
	});

	// Unsubscribe from realtime tasks
	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<svelte:head>
	<title>My Tasks</title>
	<meta name="description" content="my tasks" />
</svelte:head>

<div class="card mt-5">
	<div class="card-body container">
		<div class="card-title row">
			<h4 class=" col-md-10">My Tasks</h4>
			<!-- <a class="btn btn-primary col-md-2" href="/tasks/new">
				<i class="mdi mdi-plus"></i>
				Place Task
			</a> -->
		</div>
		<p class="card-description">All My Tasks</p>
		<div class="table-responsive">
			<table class="table table-hover">
				<thead>
					<tr>
						<th># Task No.</th>
						<th># Order No.</th>
						<th>Assignee</th>
						<th>Title</th>
						<th>Field Of Study</th>
						<th>Days To Deadline</th>
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
					{#each tasks as task}
						<tr>
							<td>{task.id}</td>
							<td>{task.expand?.order?.id}</td>
							<td>{task.expand?.user?.name}</td>
							<td>{task.expand?.order?.title}</td>
							<td>{task.expand?.order?.field_of_study}</td>
							<td>
								{task.expand?.order?.deadline_range_end
									? Math.floor(
											(new Date(task.expand?.order?.deadline_range_end) - Date.now()) / (1000 * 60 * 60 * 24),
											2
										) + ' Days'
									: ''}
							</td>
							<td>
								{#if task?.status == 'open' || task == null}
									<i class="badge badge-info">{task ? task.status : 'open'}</i>
								{:else if task?.status == 'writing'}
									<i class="badge badge-warning">{task?.status}</i>
								{:else if task?.status == 'review'}
									<i class="badge badge-secondary">{task?.status}</i>
								{:else if task?.status == 'client_review'}
									<i class="badge badge-info">{task?.status}</i>
								{:else if task?.status == 'closed'}
									<i class="badge badge-success">{task?.status}</i>
								{:else if task?.status == 'delayed'}
									<i class="badge badge-danger">{task?.status}</i>
								{/if}
							</td>
							<td>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									class="badge btn-inverse-primary"
									style="cursor: pointer;"
									href="/tasks/{task.id}">View</a
								>
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
					<li class="page-item"><a class="page-link" href="#" on:click={ () => changePage(page) }>{page} of { total_pages }</a></li>
					<li class="page-item {page == total_pages ? 'disabled' : ''}">
						<a class="page-link" href="#" on:click={ () => changePage(page+1) }>Next</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>
