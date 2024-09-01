<script>
	import { currentUser, pb } from '$lib/pocketbase.js';

	let newUser = {
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
		role: 'Client'
	};
	let error = '';

	// async function login() {
	// 	const user = await pb.collection('users').authWithPassword(newUser.name, newUser.password);
	// 	// console.log(user);
	// 	if (createdUser.token) {
	// // 		goto('/orders/new');
	// 	window.location.href = '/';
	// 	}
	// }
	async function signUp() {
		try {
			const createdUser = await pb.collection('users').create(newUser);

			// (optional) send an email verification request
			await pb.collection('users').requestVerification(newUser.email);
			// await login();
		} catch (err) {
			error = err.data.data;
			error.general = err.data.message;
		}
	}
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="registration page" />
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
							<form on:submit|preventDefault={signUp}>
								<div
									class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"
								>
									<p class="lead fw-normal mb-0 me-3 flex-block">Sign Up with</p>
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
								<!-- User Name input -->
								{#if error.name}
									<small id="error" class="text-danger fw-bold">{error.name.message}</small>
								{/if}
								<div data-mdb-input-init class="form-outline mb-4">
									<input
										id="Name"
										class="form-control form-control-lg"
										placeholder="Enter a Name"
										type="text"
										aria-describedby="nameHelp"
										required
										bind:value={newUser.name}
									/>
									<label class="form-label" for="Name">Name</label>
								</div>

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
										bind:value={newUser.email}
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
										bind:value={newUser.password}
									/>
									<label class="form-label" for="password">Password</label>
								</div>
								<!-- Password Confirm input -->
								{#if error.passwordConfirm}
									<small id="error" class="text-danger fw-bold"
										>{error.passwordConfirm.message}</small
									>
								{/if}
								<div data-mdb-input-init class="form-outline mb-3">
									<input
										type="password"
										id="password"
										class="form-control form-control-lg"
										placeholder="Confirm password"
										required
										bind:value={newUser.passwordConfirm}
									/>
									<label class="form-label" for="password">Confirm Password</label>
								</div>

								<div class="text-center text-lg-start mt-4 pt-2">
									<button
										type="submit"
										data-mdb-button-init
										data-mdb-ripple-init
										class="btn btn-primary btn-lg"
										style="padding-left: 2.5rem; padding-right: 2.5rem;">Register</button
									>
									<p class="small fw-bold mt-2 pt-1 mb-0">
										I already have an account? <a href="/login" class="link-danger">Login</a>
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
