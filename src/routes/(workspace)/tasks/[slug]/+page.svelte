<script>
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import Dropzone from 'svelte-file-dropzone';
	export let data;

	let task = {};
	let users = [];

	let files = {
		accepted: [],
		rejected: []
	};
	let task_files = {
		accepted: [],
		rejected: []
	};
	let order_preview_files = {
		accepted: [],
		rejected: []
	};
	let task_status = null;

	function handlePreviewFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		order_preview_files.accepted = [...order_preview_files.accepted, ...acceptedFiles];
		order_preview_files.rejected = [...order_preview_files.rejected, ...fileRejections];
	}
	function handlePreviewFileRemoveFile(e, index) {
		order_preview_files.accepted.splice(index, 1);
		order_preview_files.accepted = [...order_preview_files.accepted];
	}
	function handlePreviewFileRemoveAll() {
		order_preview_files.accepted = [];
	}

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		task_files.accepted = [...task_files.accepted, ...acceptedFiles];
		task_files.rejected = [...task_files.rejected, ...fileRejections];
	}
	function handleRemoveFile(e, index) {
		task_files.accepted.splice(index, 1);
		task_files.accepted = [...task_files.accepted];
	}
	function handleRemoveAll() {
		task_files.accepted = [];
	}

	async function updateTask() {
		try {
			task.status = task_status;
			task.attached_files = task_files.accepted;
			task.order_preview_files = order_preview_files.accepted;
			await pb.collection('tasks').update(task.id, task);
			if(task.status == 'closed'){
				await readyForDownload();
			}else if(task.status == 'client_review'){
				await readyForClientReview();
			}
			// goto('/tasks');
			window.location.href = '/tasks';
		} catch (err) {
			console.log(err);
		}
	}

	const readyForClientReview = async () => {
		//create new notification
		await pb.collection('notifications').create({
			title: 'Order Review',
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
						<h1>Order Review</h1>
						<p>Dear ${task.expand?.order?.client?.name},</p>
						<p>We are excited to inform you that your order is now ready for review.</p>
						<p>Order Details:</p>
						<ul>
								<li><strong> Order Number:</strong> ${task.expand?.order.id}</li>
						</ul>
						 <p>To download your order, please visit our website and log in to your account. You will find your order available for review in the 'My Orders' section.</p>
						 <p>If you are satisfied with your order, please pay the remaining balance and your order will be available for download.</p>
						<p>If you have any questions or need further assistance, please feel free to contact our customer support team.</p>
						<p>Thank you for choosing us!</p>
						<p>Sincerely,<br>EazyTech Writers & Solutions</p>
				</div>

				</body>
				</html>
				`,
			user: task.expand?.client?.id,
			user_email: task.expand?.client?.email
		});
	};
	const readyForDownload = async () => {
		//create new notification
		await pb.collection('notifications').create({
			title: 'Order Completed',
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
						<h1>Order Completed</h1>
						<p>Dear ${task.expand?.order?.client?.name},</p>
						<p>We are excited to inform you that your order is now ready for download.</p>
						<p>Order Details:</p>
						<ul>
								<li><strong> Order Number:</strong> ${task.expand?.order.id}</li>
						</ul>
						 <p>To download your order, please visit our website and log in to your account. You will find your order available for download in the 'My Orders' section.</p>
						<p>If you have any questions or need further assistance, please feel free to contact our customer support team.</p>
						<p>Thank you for choosing us!</p>
						<p>Sincerely,<br>EazyTech Writers & Solutions</p>
				</div>

				</body>
				</html>
				`,
			user: task.expand?.client?.id,
			user_email: task.expand?.client?.email
		});
	};
	onMount(async () => {
		task = data.record;
		if(task.expand?.order?.deadline_range_start < Date.now()) {
			let order = task.expand?.order;
			order.is_delayed = 'true';
			await pb.collection('orders').update(order.id, order);
		}
		task_status = task.status;
		files.accepted = [...files.accepted, ...task.expand?.order.attached_files];
		task_files.accepted = [...task_files.accepted, ...task.attached_files];
		order_preview_files.accepted = [...order_preview_files.accepted, ...task.order_preview_files];
		// Get initial service_types
		const userList = await pb.collection('users').getFullList({
			sort: '-created'
		});
		users = userList.items;
	});
</script>

<svelte:head>
	<title>Task</title>
	<meta name="description" content="order task page" />
</svelte:head>
<div class="card mt-5">
	<div class="card-body container">
		<div class="row">
			<div class="col-md-6">
				<h4 class="card-title">Task Requirements</h4>
				<p class="card-description">Please find the task requirements</p>
			</div>
			<div class="col-md-6">
				<div style="float: right">
					<h4 class="card-title">#{task.id}</h4>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Attached Task Files</h5>
							<div style="margin: 5px;">
								{#each files.accepted as item, index}
									<div class="mt-2 row">
										<div class="col-sm-9">
											<span>#{index + 1}</span>
											<span>{item}</span>
										</div>
										<div class="col-sm-3">
											<a
												href={pb.files.getUrl(task.expand?.order, item, { thumb: '100x300f' })}
												target="_blank"
												rel="noreferrer"
												class="btn btn-success btn-sm"
											>
												<i class="menu-icon mdi mdi-eye"></i>
												View</a
											>
											<a
												href={pb.files.getUrl(task.expand?.order, item) + '?download=1'}
												target="_blank"
												rel="noreferrer"
												class="btn btn-primary btn-sm"
											>
												<i class="menu-icon mdi mdi-download"></i>
												Download
											</a>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Instructions</h5>
							<div class="form-group">
								{@html task.expand?.order.insturctions}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Assignment Title and Description</h5>
							<div class="row">
								<div class="form-group col">
									<p for="title" class="fw-bold">Assignment Title:</p>
									<ul>
										<li class="ml-3 h6">{task.expand?.order?.title}</li>
									</ul>
								</div>
								<div class="form-group col">
									<p for="description" class="fw-bold">Assignment Description:</p>
									<ul>
										<li class="ml-3 h6">{task.expand?.order?.description}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Field Of Study</h5>
							<div class="form-group row">
								<p class="form-label col-sm-4">Field Of Study:</p>
								<div class="col-sm-8">
									<p class="h6">{task.expand?.order?.field_of_study}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Service Type</h5>
							<div class="form-group row">
								<label for="service_type" class="form-label col-sm-4">Service Type: </label>
								<div class="col-sm-8">
									<p class="h6">{task.expand?.order?.expand?.service_type?.name}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-6">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Education Level</h5>
							<div class="form-group row">
								<label for="education_level" class="form-label col-sm-4">Education Level: </label>
								<div class="col-sm-8">
									<p class="h6">{task.expand?.order?.expand?.education_level?.name}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">Assignment Size</h5>
							<div class="form-group">
								<label for="assignment_size" class="form-label">Assignment Size Details</label>
								<div class="row">
									<div class="col-sm-4">
										<label for="pages" class="form-label">Pages:</label>
										<p class="h6">{task.expand?.order?.pages}</p>
									</div>
									<div class="col-sm-4">
										<label for="words" class="form-label">Words:</label>
										<p class="h6">{task.expand?.order?.words}</p>
									</div>
									<div class="col-sm-4">
										<label for="line_spacing" class="form-label">Line Spacing:</label>
										<p class="h6">{task.expand?.order?.line_spacing}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-6">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Deadline</h5>
							<div class="form-group row">
								<div class="my-2 col">
									<label for="deadline_range_start" class="form-label">Date Range Start:</label>
									<p class="h6">{new Date(task.expand?.order?.deadline_range_start)}</p>
								</div>
								<div class="my-2 col">
									<label for="deadline_range_end" class="form-label">Date Range End:</label>
									<p class="h6">{new Date(task.expand?.order?.deadline_range_end)}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<hr />
			<hr />
			<form class="forms-sample row" enctype="multipart/form-data">
				<div class="form-group col-12">
					<h2 for="Attach Files" class="form-label col-sm-6">Upload Previews:</h2>
					<br />
					<small class="form-text text-muted fst-italic" style="font-size: 0.7rem">
						<i class="mdi mdi-alert-circle-outline"></i>
						Maximum size of files upload is 100 MB
					</small><Dropzone
						accept={[
							'image/png',
							'image/jpeg',
							'image/*',
						]}
						on:drop={handlePreviewFilesSelect}
					>
						<button class="btn btn-primary">Choose previews to upload</button>
						<p>or</p>
						<p>Drag and drop them here</p>
					</Dropzone>

					<div style="margin: 5px;">
						{#if order_preview_files.accepted.length > 0}
							<button class="btn btn-secondary" on:click={handlePreviewFileRemoveFile}
								>RemoveAll</button
							>
						{/if}
						{#each order_preview_files.accepted as item, index}
							<div class="mt-2 row">
								<div class="col-sm-9">
									<span>#{index + 1}</span>
									<span>{item.name}</span>
								</div>
								<button
									class="btn btn-secondary ml-2 col-sm-3"
									on:click={(e) => handlePreviewFileRemoveAll(e, index)}>Remove</button
								>
							</div>
						{/each}
					</div>
				</div>
				<div class="form-group col-12">
					<h2 for="Attach Files" class="form-label col-sm-6">Upload Your Work:</h2>
					<br />
					<small class="form-text text-muted fst-italic" style="font-size: 0.7rem">
						<i class="mdi mdi-alert-circle-outline"></i>
						Maximum size of files upload is 100 MB
					</small><Dropzone
						accept={[
							'image/png',
							'image/jpeg',
							'image/*',
							'application/pdf',
							'application/msword',
							'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
							'application/vnd.ms-excel',
							'text/plain'
						]}
						on:drop={handleFilesSelect}
					>
						<button class="btn btn-primary">Choose work to upload</button>
						<p>or</p>
						<p>Drag and drop them here</p>
					</Dropzone>

					<div style="margin: 5px;">
						{#if task_files.accepted.length > 0}
							<button class="btn btn-secondary" on:click={handleRemoveAll}>RemoveAll</button>
						{/if}
						{#each task_files.accepted as item, index}
							<div class="mt-2 row">
								<div class="col-sm-9">
									<span>#{index + 1}</span>
									<span>{item.name}</span>
								</div>
								<button
									class="btn btn-secondary ml-2 col-sm-3"
									on:click={(e) => handleRemoveFile(e, index)}>Remove</button
								>
							</div>
						{/each}
					</div>
				</div>

				<div class="col-md-6">
					<div class="form-group row">
						<label for="service_type" class="form-label col-sm-2">Status</label>
						<div class="col-sm-10">
							<select class="form-control" id="task_status" bind:value={task_status} required>
								<option value={null}>Select Status</option>
								<option value="open">Open</option>
								<option value="writing">Writing</option>
								<option value="review">Review</option>
								<option value="client_review">Client Review</option>
								<option value="closed">Closed</option>
<!--								<option value="delayed">Delayed</option>-->
<!--								<option value="on_hold">On Hold</option>-->
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6"></div>
				<div class="col-sm-9"></div>
				<button type="submit" class="btn btn-primary me-2 col-sm-2" on:click={updateTask}>
					Submit
				</button>
				<!-- <button class="btn btn-light col-sm-2">Cancel</button> -->
			</form>
		</div>
	</div>
</div>
