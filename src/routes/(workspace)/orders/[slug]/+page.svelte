<script>
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import Dropzone from 'svelte-file-dropzone';
	import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
	export let data;

	let order = {};

	let quill;
	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}
	function handleRemoveFile(e, index) {
		files.accepted.splice(index, 1);
		files.accepted = [...files.accepted];
	}
	function handleRemoveAll() {
		files.accepted = [];
	}

	let service_types = [];
	let education_levels = [];


	onMount(async () => {
		order = data.order;
		if(order.deadline_range_start < Date.now()) {
			order.is_delayed = 'true';
			await pb.collection('orders').update(order.id, order);
		}
		const { default: Quill } = await import('quill');
		const options = {
			debug: 'info',
			modules: {
				toolbar: true
			},
			placeholder:
				order.insturctions,
			theme: 'snow'
		};
		quill = new Quill('#editor', options);
		quill.root.innerHTML = order.insturctions;
		// Get initial service_types
		const resultList = await pb.collection('service_types').getFullList({
			sort: '-created'
		});
		service_types = [...resultList];

		// Get initial education_levels
		const records = await pb.collection('education_levels').getFullList({
			sort: '-created'
		});
		education_levels = [...records];


		files.accepted = [...files.accepted, ...order.attached_files];
		order.deadline_range_start = order.deadline_range_start.toString().split('.')[0].replace(' ', 'T');
		order.deadline_range_end = order.deadline_range_end.toString().split('.')[0].replace(' ', 'T');
		order.line_spacing = order.line_spacing.toString();
	});
	async function updateOrder() {
		try{
			order.attached_files = files.accepted;
			order.insturctions = quill.root.innerHTML;
			order.deadline_range_start = new Date(order.deadline_range_start);
			order.deadline_range_end = new Date(order.deadline_range_end);
			await pb.collection('orders').update(order.id, order);
			goto('/orders/my_orders');
		}catch (err) {
			console.log(err);
		}
	}
</script>

<svelte:head>
	<title>Edit Order</title>
	<meta name="description" content="place order page" />
</svelte:head>
<div class="card mt-5">
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
	<div class="card-body container">
		<h4 class="card-title">Order Requirements</h4>
		<p class="card-description">Please fill your order requirements</p>
		<form class="forms-sample row" enctype="multipart/form-data">
			<div class="form-group col-12">
				<label for="Attach Files" class="form-label col-sm-2">Attach Files:</label>
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
					<button class="btn btn-primary">Choose attachments to upload</button>
					<p>or</p>
					<p>Drag and drop them here</p>
				</Dropzone>

				<div style="margin: 5px;">
					{#if files.accepted.length > 0}
						<button class="btn btn-secondary" on:click={handleRemoveAll}>RemoveAll</button>
					{/if}
					{#each files.accepted as item, index}
						<div class="mt-2">
							<span>#{index + 1}</span>
							<span>{item}</span>
							<button class="btn btn-secondary ml-2" on:click={(e) => handleRemoveFile(e, index)}
								>Remove</button
							>
						</div>
					{/each}
				</div>
			</div>
			<!-- Create the editor container -->
			<div class="form-group col-12" style="height: 100%">
				<label for="instructions" class="form-label col-sm-2">Instructions:</label>
				<div id="editor" class="form-control mb-5"></div>
			</div>
			<div class="col-md-12">
				<div class="form-group row">
					<label for="field_of_study" class="form-label col-sm-12">Field Of Study:</label>
					<input
						type="text"
						class="form-control"
						id="field_of_study"
						bind:value={order.field_of_study}
						required
					/>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group row">
					<label for="service_type" class="form-label col-sm-2">Service Type</label>
					<div class="col-sm-10">
						<select
							class="form-control"
							id="service_type"
							bind:value={order.service_type}
							required
						>
							<option value={null}>Select Service Type</option>
							{#each service_types as service_type}
								<option value={service_type.id}>
									{service_type.name}
								</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="form-group row">
					<label for="education_level" class="form-label col-sm-2">Education Level</label>
					<div class="col-sm-10">
						<select
							class="form-control"
							id="education_level"
							bind:value={order.education_level}
							required
						>
							<option value={null}>Select Education Level</option>
							{#each education_levels as education_level}
								<option value={education_level.id}>
									{education_level.name}
								</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="assignment_size" class="form-label">Assignment Size</label>
					<div class="row">
						<div class="col-sm-4">
							<label for="pages" class="form-label">Pages:</label>
							<input
								type="number"
								class="form-control"
								id="pages"
								bind:value={order.pages}
								required
							/>
						</div>
						<div class="col-sm-4">
							<label for="words" class="form-label">Words:</label>
							<input
								type="number"
								class="form-control"
								id="words"
								bind:value={order.words}
								required
							/>
						</div>
						<div class="col-sm-4">
							<label for="line_spacing" class="form-label">Line Spacing:</label>
							<select
								class="form-control"
								id="line_spacing"
								bind:value={order.line_spacing}
								required
							>
								<option value="">Select</option>
								<option value="1">1</option>
								<option value="1.5">1.5</option>
								<option value="2">2</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group row">
					<label for="education_level" class="form-label col-sm-12">Deadline</label>
					<div class="my-3 col-sm-12">
						<label for="deadline_range_start" class="form-label">Date Range Start:</label>
						<input

							type="datetime-local"
							class="form-control"
							id="deadline_range_start"
							bind:value={order.deadline_range_start}
						/>
					</div>
					<div class="my-3 col-sm-12">
						<label for="deadline_range_end" class="form-label">Date Range End:</label>
						<input

							type="datetime-local"
							class="form-control"
							id="deadline_range_end"
							bind:value={order.deadline_range_end}
						/>
					</div>
				</div>
			</div>
			<div class="col-md-12">
				<div class="form-group row">
					<label for="title" class="form-label col-sm-12">Assignment Title:</label>
					<input type="text" class="form-control" id="title" bind:value={order.title} required />
				</div>
			</div>
			<div class="col-md-12">
				<div class="form-group row">
					<label for="description" class="form-label col-sm-12">Assignment Description:</label>
					<textarea
						rows="4"
						cols="50"
						class="form-control"
						id="description"
						bind:value={order.description}
					/>
				</div>
			</div>
			<div class="form-group">
				<label for="assignment_size" class="form-label">Sources and Citation Style</label>
				<div class="row">
					<div class="col-sm-4">
						<label for="sources" class="form-label">Sources:</label>
						<input
							required
							type="number"
							class="form-control"
							id="sources"
							bind:value={order.sources_required}
						/>
					</div>
					<div class="col-sm-4">
						<label for="citation_type" class="form-label">Citation Style:</label>
						<select
							class="form-control"
							id="citation_type"
							bind:value={order.citation_type}
							required
						>
							<option value={null}>Select</option>
							<option value="APA">APA</option>
							<option value="MLA">MLA</option>
							<option value="Chicago">Chicago</option>
							<option value="Turabian">Turabian</option>
							<option value="IEEE">IEEE</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-9"></div>
			<button type="submit" class="btn btn-primary me-2 col-sm-2" on:click={updateOrder}>
				Submit
			</button>
			<!-- <button class="btn btn-light col-sm-2">Cancel</button> -->
		</form>
	</div>
</div>
