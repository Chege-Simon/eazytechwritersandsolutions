<script>
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let user = {};


	onMount(async () => {
		// currentUser = data.user
		user = data.user;
	});
	const resetPassword = async (email) => {
		await pb.collection('users').requestPasswordReset(email);
		pb.authStore.clear();
		goto('/login');
	};
	const changeEmail = async (email) => {
		await pb.collection('users').requestEmailChange(email);
		pb.authStore.clear();
		goto('/login');
	};
	async function updateOrder() {
		try {
			await pb.collection('users').update(user.id, user);
			goto('/users/my_users');
		} catch (err) {
			console.log(err);
		}
	}
</script>

<svelte:head>
	<title>User Details</title>
	<meta name="description" content="User Details" />
</svelte:head>
<div class="card mt-5">
	<div class="card-body container">
		<h4 class="card-title">Order Requirements</h4>
		<p class="card-description">Please fill your order requirements</p>
		<form class="forms-sample row" enctype="multipart/form-data">
			<div class="form-group col-md-6">
				<label for="name">Name</label>
				<input
					type="text"
					class="form-control"
					id="name"
					placeholder="Name"
					bind:value={user.name}
				/>
			</div>
			<div class="form-group col-md-6">
				<label for="email">Email</label>
				<input disabled
					type="email"
					class="form-control"
					id="email"
					placeholder="Email"
					bind:value={user.email}
				/>
			</div>
			<div class="form-group col-md-6">
				<h4>Change Password</h4>
				<button class="btn btn-secondary" on:click={() =>resetPassword(user.email)}>Reset Password</button>
			</div>
			<div class="form-group col-md-6">
				<h4>Change Email</h4>
				<button class="btn btn-secondary" on:click={() =>changeEmail(user.email)}>Change Email</button>
			</div>

			<div class="col-sm-9"></div>
			<button type="submit" class="btn btn-primary me-2 col-sm-2" on:click={updateOrder}>
				Submit
			</button>
			<!-- <button class="btn btn-light col-sm-2">Cancel</button> -->
		</form>
	</div>
</div>