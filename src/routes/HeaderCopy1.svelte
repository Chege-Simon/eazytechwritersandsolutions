<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '$lib/assets/images/eazyTechLogoTransparent.png';
	import { currentUser, pb } from '$lib/pocketbase';
	import { afterUpdate, onMount } from 'svelte';

	let activeIndex = null;
	// let activeIndex = 0;

	function signOut() {
		pb.authStore.clear();
		// goto('/');
		window.location.href = '/';
	}

	function setActiveItemPosition() {
		console.log('Hi');
		const activeItem = document.querySelector('.nav-item.active');
		const horiSelector = document.querySelector('.hori-selector');
		if (activeItem && horiSelector) {
			const activeItemRect = activeItem.getBoundingClientRect();
			const parentRect = activeItem.parentElement.getBoundingClientRect();
			const offsetTop = activeItemRect.top - parentRect.top;
			const offsetLeft = activeItemRect.left - parentRect.left;
			horiSelector.style.top = `${offsetTop}px`;
			horiSelector.style.left = `${offsetLeft}px`;
			horiSelector.style.height = `${activeItemRect.height}px`;
			horiSelector.style.width = `${activeItemRect.width}px`;
		}
	}

	afterUpdate(setActiveItemPosition);

	function handleItemClick(index) {
		activeIndex = index;
		console.log(activeIndex);
		setActiveItemPosition();
	}

	onMount(() => {
		activeIndex = $page.url.pathname != null
			? $page.url.pathname
			: '/' + window.location.pathname.split('/').pop();
	// 	handleItemClick(activeIndex);
		const path = activeIndex;
	// 	// console.log(activeIndex);
	// 	// console.log(path.length);
		const target = document.querySelector(`#navbarSupportedContent ul li a[href="${path}"]`);
		if (target) {
			target.parentElement.classList.add('active');
		}
	// 	// setActiveItemPosition();
	// 	// window.addEventListener('resize', () => {
	// 	// 	setTimeout(setActiveItemPosition, 500);
	// 	// });
	});
</script>

<nav class="navbar navbar-expand-custom navbar-mainbg">
	<a class="navbar-brand navbar-logo" href="/">Eazy Tech</a>
	<button
		class="navbar-toggler"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#navbarSupportedContent"
		aria-controls="navbarSupportedContent"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<span class="navbar-toggler-icon"></span>
		<!-- <i class="fas fa-bars text-white"></i> -->
		<!-- <i class="mdi mdi-apps text-white border-0"></i> -->
	</button>
	<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
		<ul class="navbar-nav ml-auto">
			<div class="hori-selector">
				<div class="left"></div>
				<div class="right"></div>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class="nav-item {'/' === activeIndex ? 'active' : ''}"
				on:click={() => handleItemClick('/')}
			>
				<a class="nav-link" href="/"><i class="fas fa-tachometer-alt"></i>Home</a>
			</li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class="nav-item {'/about' === activeIndex ? 'active' : ''}"
				on:click={() => handleItemClick('/about')}
			>
				<a class="nav-link" href="/about"><i class="fas fa-tachometer-alt"></i>About Us</a>
			</li>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class="nav-item {'/blog' === activeIndex ? 'active' : ''}"
				on:click={() => handleItemClick('/blog')}
			>
				<a class="nav-link" href="/blog"><i class="fas fa-tachometer-alt"></i>Blog Post Yangu</a>
			</li>

			{#if $currentUser?.name}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					class="nav-item {'/orders/my_orders' === activeIndex ? 'active' : ''}"
					on:click={() => handleItemClick('/orders/my_orders')}
				>
					<a class="nav-link" href="/orders/my_orders"
						><i class="fas fa-tachometer-alt"></i>My Orders</a
					>
				</li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li class="nav-item {'/logout' === activeIndex ? 'active' : ''}" on:click={signOut}>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a class="nav-link" href="#"><i class="fas fa-tachometer-alt"></i>Logout</a>
				</li>
			{:else}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					class="nav-item {'/login' === activeIndex ? 'active' : ''}"
					on:click={() => handleItemClick('/login')}
				>
					<a class="nav-link" href="/login"><i class="fas fa-tachometer-alt"></i>Log In</a>
				</li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					class="nav-item {'/register' === activeIndex ? 'active' : ''}"
					on:click={() => handleItemClick('/register')}
				>
					<a class="nav-link" href="/register"><i class="fas fa-tachometer-alt"></i>Sign Up</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	body {
		font-family: 'Roboto', sans-serif;
	}

	* {
		margin: 0;
		padding: 0;
	}

	i {
		margin-right: 10px;
	}

	.navbar-logo {
		padding: 15px;
		color: #fff;
	}

	.navbar-mainbg {
		background-color: #5161ce;
		padding: 0px;
	}

	#navbarSupportedContent {
		overflow: hidden;
		position: relative;
	}

	#navbarSupportedContent ul {
		padding: 0px;
		margin: 0px;
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}

	#navbarSupportedContent ul li a i {
		margin-right: 10px;
	}

	#navbarSupportedContent li {
		list-style-type: none;
	}

	#navbarSupportedContent ul li a {
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		font-size: 15px;
		display: block;
		padding: 20px 20px;
		transition-duration: 0.6s;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		position: relative;
	}

	#navbarSupportedContent > ul > li.active > a {
		color: #5161ce;
		background-color: transparent;
		transition: all 0.7s;
	}

	#navbarSupportedContent a:not(:only-child):after {
		content: '\f105';
		position: absolute;
		right: 20px;
		top: 10px;
		font-size: 14px;
		font-family: 'Font Awesome 5 Free';
		display: inline-block;
		padding-right: 3px;
		vertical-align: middle;
		font-weight: 900;
		transition: 0.5s;
	}

	#navbarSupportedContent .active > a:not(:only-child):after {
		transform: rotate(90deg);
	}

	.hori-selector {
		display: inline-block;
		position: absolute;
		height: 100%;
		top: 0px;
		left: 0px;
		transition-duration: 0.6s;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		background-color: #fff;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		margin-top: 10px;
	}

	.hori-selector .right,
	.hori-selector .left {
		position: absolute;
		width: 25px;
		height: 25px;
		background-color: #fff;
		bottom: 10px;
	}

	.hori-selector .right {
		right: -25px;
	}

	.hori-selector .left {
		left: -25px;
	}

	.hori-selector .right:before,
	.hori-selector .left:before {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #5161ce;
	}

	.hori-selector .right:before {
		bottom: 0;
		right: -25px;
	}

	.hori-selector .left:before {
		bottom: 0;
		left: -25px;
	}

	@media (min-width: 992px) {
		.navbar-expand-custom {
			-ms-flex-flow: row nowrap;
			flex-flow: row nowrap;
			-ms-flex-pack: start;
			justify-content: flex-start;
		}

		.navbar-expand-custom .navbar-nav {
			-ms-flex-direction: row;
			flex-direction: row;
		}

		.navbar-expand-custom .navbar-toggler {
			display: none;
		}

		.navbar-expand-custom .navbar-collapse {
			display: -ms-flexbox !important;
			display: flex !important;
			-ms-flex-preferred-size: auto;
			flex-basis: auto;
		}
	}

	@media (max-width: 991px) {
		#navbarSupportedContent ul li a {
			padding: 12px 30px;
		}

		.hori-selector {
			margin-top: 0px;
			margin-left: 10px;
			border-radius: 0;
			border-top-left-radius: 25px;
			border-bottom-left-radius: 25px;
		}

		.hori-selector .left,
		.hori-selector .right {
			right: 10px;
		}

		.hori-selector .left {
			top: -25px;
			left: auto;
		}

		.hori-selector .right {
			bottom: -25px;
		}

		.hori-selector .left:before {
			left: -25px;
			top: -25px;
		}

		.hori-selector .right:before {
			bottom: -25px;
			left: -25px;
		}
	}
</style>
