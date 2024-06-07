<script>
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase.js';

	let userLogin = {
		email: '',
		password: ''
	};
	let error = '';

	async function login() {
		// console.log(userLogin.email, userLogin.password);
		try {
			const response = await pb
				.collection('users')
				.authWithPassword(userLogin.email, userLogin.password);
			console.log(response);
			if (response.token && pb.authStore.isValid) {
				goto('/orders/new');
			}
		} catch (err) {
			error = err.data.data;
			error.general = err.data.message;
		}
	}
	async function resetPassword() {
		let resetresponse = '';
		try {
			if (!userLogin.email) error = 'Please enter your email to reset password!';
			resetresponse = await pb.collection('users').requestPasswordReset(userLogin.email);
		} catch (err) {
			error = err.data.data;
			error.general = err.data.message;
		}
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="login page" />
</svelte:head>
<div class="mt-2">
	<div class="card elevate-4">
		<div class="card-body">
			<section class="vh-50">
				<div class="container-fluid h-custom">
					<div class="row d-flex justify-content-center align-items-center h-100 mt-5">
						<div class="col-md-9 col-lg-6 col-xl-5">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
								class="img-fluid"
								alt="Sample image"
							/>
						</div>
						<div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
							<form on:submit|preventDefault={login}>
								<div
									class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"
								>
									<p class="lead fw-normal mb-0 me-3 flex-block">Sign in with</p>
									<button
										type="button"
										data-mdb-button-init
										data-mdb-ripple-init
										class="btn btn-primary btn-floating mx-1"
									>
										<i class="mdi mdi-google"></i>
									</button>
									<button
										type="button"
										data-mdb-button-init
										data-mdb-ripple-init
										class="btn btn-primary btn-floating mx-1"
									>
										<i class="mdi mdi-facebook"></i>
									</button>

									<!-- <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-floating mx-1">
				<i class="mdi mdi-twitter"></i>
			  </button>
  
			  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-floating mx-1">
				<i class="mdi mdi-linkedin"></i>
			  </button> -->
								</div>

								<div class="divider d-flex align-items-center my-4">
									<p class="text-center fw-bold mx-3 mb-0">Or</p>
								</div>
								{#if error.general}
									<small id="error" class="text-danger fw-bold">{error.general}</small>
								{/if}
								<!-- Email input -->
								{#if error.email}
									<small id="error" class="text-danger fw-bold">{error.email.message}</small>
								{/if}
								<div data-mdb-input-init class="form-outline mb-4">
									<input
										id="Email"
										class="form-control form-control-lg"
										placeholder="Enter a valid Email"
										type="email"
										aria-describedby="emailHelp"
										required
										bind:value={userLogin.email}
									/>
									<label class="form-label" for="Email">Email</label>
								</div>

								<!-- Password input -->
								{#if error.password}
									<small id="error" class="text-danger fw-bold">{error.password.message}</small>
								{/if}
								<div data-mdb-input-init class="form-outline mb-3">
									<input
										type="password"
										id="password"
										class="form-control form-control-lg"
										placeholder="Enter password"
										required
										bind:value={userLogin.password}
									/>
									<label class="form-label" for="password">Password</label>
								</div>

								<div class="d-flex justify-content-between align-items-center mx-2 px-2">
									<a href="#!" on:click={resetPassword} class="text-body">Forgot password?</a>
								</div>

								<div class="text-center text-lg-start mt-4 pt-2">
									<button
										type="submit"
										data-mdb-button-init
										data-mdb-ripple-init
										class="btn btn-primary btn-lg"
										style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button
									>
									<p class="small fw-bold mt-2 pt-1 mb-0">
										Don't have an account? <a href="/register" class="link-danger">Register</a>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
