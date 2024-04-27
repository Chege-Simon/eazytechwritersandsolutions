<script lang="js">
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let showAssignPopup = false;
	let targetTask = {};
	let tasks = [];
	let unsubscribe;
	let loading = false;
	let writers = [];

	const onShowAssignPopup = (clickedTask) => {
		targetTask = clickedTask;
		showAssignPopup = true;
	};

	const modalClose = () => {
		showAssignPopup = false;
	};

	const assignTask = async () => {
		await pb.collection('tasks').update(targetTask.id, {
			user: targetTask.user
		});
		await taskAssign();
		showAssignPopup = false;
	};

	const taskAssign = async () => {
		//create new notification
		await pb.collection('notifications').create({
			title: 'Task Assignment',
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
						<h1>Task Assigned</h1>
						<p>Dear ${targetTask.expand?.user?.name},</p>
    				<p>A new task has been assigned to you:</p>
						<p>Payment Details:</p>
						<ul>
							<li><strong>Task ID:</strong> ${targetTask.id}</li>
							<li><strong>Date Assigned:</strong>${new Date(targetTask.created).toLocaleString()}</li>
							<li><strong>Title:</strong> ${targetTask.expand?.order?.title}</li>
							<li><strong>Due Date:</strong>${new Date(targetTask.expand?.order?.deadline_range_start).toLocaleString()}</li>
						</ul>
						<p>Please review the details of the task and begin working on it promptly. If you have any questions or need further clarification, don't hesitate to reach out to your supervisor or project manager.</p>
						<p>Thank you for your attention to this matter.</p>
						<p>Sincerely,<br>EazyTech Writers & Solutions</p>
				</div>

				</body>
				</html>
				`,
			user: targetTask.expand?.user?.id,
			user_email: targetTask.expand?.user?.email
		});
	};
	onMount(async () => {
		loading = true;
		const resultList = await pb.collection('tasks').getList(1, 50, {
			sort: 'created',
			expand: 'user, order, order.education_level, order.client, order.service_type'
		});
		tasks = resultList.items;

		// Get users
		const writers_records = await pb.collection('users').getFullList({
			sort: '-created',
		});
		writers = [...writers_records];
		writers = writers.filter(user => user.role.includes('Writer'));

		// Subscribe to realtime tasks
		unsubscribe = await pb.collection('tasks').subscribe('*', async ({ action, record }) => {
			loading = true;
			if (action === 'create' || action === 'update') {
				const resultList = await pb.collection('tasks').getList(1, 50, {
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
	<title>Tasks</title>
	<meta name="description" content="all tasks" />
</svelte:head>

<div class="card mt-5">
	<div class="card-body container">
		<div class="card-title row">
			<h4 class=" col-md-10">All Tasks</h4>
			<!-- <a class="btn btn-primary col-md-2" href="/tasks/new">
				<i class="mdi mdi-plus"></i>
				Place Task
			</a> -->
		</div>
		<p class="card-description">All Open tasks</p>
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
						src="/src/lib/images/Book.gif"
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
								(new Date(task.expand?.order?.deadline_range_end) - Date.now()) /
								(1000 * 60 * 60 * 24),
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
							{#if task?.expand?.user != null && $currentUser.role.includes('Admin')}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									class="badge btn-inverse-success"
									style="cursor: pointer;"
									on:click={onShowAssignPopup(task)}>Re - Assign</a
								>
							{:else if task?.expand?.user == null && $currentUser.role.includes('Admin')}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									class="badge btn-inverse-success"
									style="cursor: pointer;"
									on:click={onShowAssignPopup(task)}>Assign</a
								>
							{/if}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<!-- svelte-ignore a11y-missing-attribute -->
							{#if (task?.status == 'open' || task?.status == 'writing') && $currentUser.role.includes('Writer')}
								<a class="badge btn-inverse-primary"
									 style="cursor: pointer;"
									 href="/tasks/{task.id}">View</a>
							{:else}
								<a class="badge btn-inverse-primary"
									 style="cursor: pointer;"
									 href="/tasks/{task.id}">View</a>
							{/if}
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>


{#if showAssignPopup}
	<div class="modal" id="sampleModal" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel"
			 aria-hidden={false}>
		<div class="modal-dialog" role="document" in:fly={{ y: -50, duration: 300 }}
				 out:fly={{ y: -50, duration: 300, easing: quintOut }}>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="sampleModalLabel">Assign Task To User</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"
									on:click={() => modalClose()}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body ">
					<div class="form-group row">
						<label for="education_level" class="form-label col-sm-4">Writers:</label>
						<div class="col-sm-8">
							<select
								class="form-control"
								id="client"
								bind:value={targetTask.user}
								required
							>
								<option value={""}>Select Writer</option>
								{#each writers as writer}
									<option value={writer.id}>
										{writer.name}
									</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={() => modalClose()}>
						Close
					</button>
					<button type="button" class="btn btn-primary" on:click={assignTask}>Assign</button>
				</div>
			</div>
		</div>
	</div>
	{#if showAssignPopup}
		<div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
	{/if}
{/if}
<style>
    .modal {
        display: block;
    }
</style>