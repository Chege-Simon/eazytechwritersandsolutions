<script>
	import { currentUser, pb } from '$lib/pocketbase.js';

	let newUser = {
		name: '',
		// username: '',
		password: '',
		passwordConfirm: '',
		role: 'Client'
	};

	async function login() {
		const user = await pb.collection('users').authWithPassword(newUser.username, newUser.password);
		// console.log(user);
		if (createdUser.token) {
			goto('/orders/new');
		}
	}
	async function signUp() {
		try {
			const createdUser = await pb.collection('users').create(newUser);
			await login();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="registration page" />
</svelte:head>

<div class="container p-5 m-5">
	<div class="card elevate-4">
		<div class="card-body">
			<form on:submit|preventDefault={signUp}>
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input
						type="text"
						class="form-control"
						id="name"
						aria-describedby="nameHelp"
						bind:value={newUser.name}
					/>
				</div>
				<!-- <div class="mb-3">
					<label for="user_name" class="form-label">User Name</label>
					<input type="text" class="form-control" id="user_name" aria-describedby="user_nameHelp"  bind:value={newUser.user_name} />
				</div> -->
				<div class="mb-3">
					<label for="inputEmail" class="form-label">Email address</label>
					<input
						type="email"
						class="form-control"
						id="inputEmail"
						aria-describedby="emailHelp"
						bind:value={newUser.email}
					/>
					<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div class="mb-3">
					<label for="inputPassword" class="form-label">Password</label>
					<input
						type="password"
						class="form-control"
						id="inputPassword"
						bind:value={newUser.password}
					/>
				</div>
				<div class="mb-3">
					<label for="inputPassword" class="form-label">Confirm Password</label>
					<input
						type="password"
						class="form-control"
						id="inputPassword"
						bind:value={newUser.passwordConfirm}
					/>
				</div>
				<button type="signup" class="btn btn-primary">Sing Up</button>
			</form>
		</div>
	</div>
</div>

<style>
</style>
