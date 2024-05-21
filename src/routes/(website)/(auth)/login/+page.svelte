<script>
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase.js';

	let userLogin = {
		username: '',
		password: ''
	};

	async function login() {
		// console.log(userLogin.username, userLogin.password);
		const createdUser = await pb
			.collection('users')
			.authWithPassword(userLogin.username, userLogin.password);
            if(createdUser.token){
                goto('/orders/new');	
            }
        }
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="login page" />
</svelte:head>

<div class="container p-5 m-5">
	<div class="card elevate-4">
		<div class="card-body">
			<form on:submit|preventDefault={login}>
				<div class="mb-3">
					<label for="username" class="form-label">User Name or Email</label>
					<input
						type="text"
						class="form-control"
						id="username"
						aria-describedby="user_nameHelp"
						bind:value={userLogin.username}
					/>
				</div>
				<div class="mb-3">
					<label for="inputPassword" class="form-label">Password</label>
					<input
						type="password"
						class="form-control"
						id="inputPassword"
						bind:value={userLogin.password}
					/>
				</div>
				<button type="login" class="btn btn-primary">Log In</button>
			</form>
		</div>
	</div>
</div>

<style>
</style>
