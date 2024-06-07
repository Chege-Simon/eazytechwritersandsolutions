<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '$lib/assets/images/eazyTechLogoTransparent.png';
	import { currentUser, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	function signOut() {
		pb.authStore.clear();
		goto('/');
	}

	// Show mobile icon and display menu
	let showMobileMenu = false;

	// List of navigation items
	const navItems = [
		{ label: 'EazyTech Writers & Solutions', href: '/' },
		{ label: 'Home', href: '/' },
		{ label: 'About Us', href: '/about' },
		{ label: 'Blog', href: '/blog' }
	];

	const rightNavItemsNotLogIn = [
		{ label: 'Login', href: '/login' },
		{ label: 'Register', href: '/register' }
	];

	const rightNavItemsLoggedIn = [
		{ label: 'My Orders', href: '/orders/my_orders' }
		// { label: 'Logout', href: '/logout' }
	];

	// Mobile menu click event handler
	const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

	// Media match query handler
	const mediaQueryHandler = (e) => {
		// Reset mobile state
		if (!e.matches) {
			showMobileMenu = false;
		}
	};

	// Attach media query listener on mount hook
	onMount(() => {
		const mediaListener = window.matchMedia('(max-width: 767px)');

		mediaListener.addListener(mediaQueryHandler);
	});
</script>

<nav>
	<div class="inner">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
			<div class="middle-line"></div>
		</div>
		<ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						style={`${page.url?.pathname === item.href ? 'text-decoration: underline' : ''}`}
						>{item.label}</a
					>
				</li>
			{/each}
			<span class="navbar-spacer me-auto"></span>
			{#if $currentUser?.name &&  pb.authStore.isValid}
				{#each rightNavItemsLoggedIn as item}
					<li>
						<a href={item.href}>{item.label}</a>
					</li>
				{/each}
				<li>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="#" on:click={signOut} class="">Log Out</a>
				</li>
			{:else}
				{#each rightNavItemsNotLogIn as item}
					<li>
						<a href={item.href}>{item.label}</a>
					</li>
				{/each}

			{/if}
		</ul>
	</div>
</nav>

<style>
	nav {
		background-color: rgba(0, 0, 0, 0.8);
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		height: 45px;
	}

	.inner {
		max-width: 980px;
		padding-left: 20px;
		padding-right: 20px;
		margin: auto;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 100%;
	}

	.mobile-icon {
		width: 25px;
		height: 14px;
		position: relative;
		cursor: pointer;
	}

	.mobile-icon:after,
	.mobile-icon:before,
	.middle-line {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: #fff;
		transition: all 0.4s;
		transform-origin: center;
	}

	.mobile-icon:before,
	.middle-line {
		top: 0;
	}

	.mobile-icon:after,
	.middle-line {
		bottom: 0;
	}

	.mobile-icon:before {
		width: 66%;
	}

	.mobile-icon:after {
		width: 33%;
	}

	.middle-line {
		margin: auto;
	}

	.mobile-icon:hover:before,
	.mobile-icon:hover:after,
	.mobile-icon.active:before,
	.mobile-icon.active:after,
	.mobile-icon.active .middle-line {
		width: 100%;
	}

	.mobile-icon.active:before,
	.mobile-icon.active:after {
		top: 50%;
		transform: rotate(-45deg);
	}

	.mobile-icon.active .middle-line {
		transform: rotate(45deg);
	}

	.navbar-list {
		display: none;
		width: 100%;
		justify-content: space-between;
		margin: 0;
		padding: 0 40px;
	}

	.navbar-list.mobile {
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		display: block;
		height: calc(100% - 45px);
		bottom: 0;
		left: 0;
	}

	.navbar-list li {
		list-style-type: none;
		position: relative;
	}

	.navbar-list li:before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #424245;
	}

	.navbar-list a {
		color: #fff;
		text-decoration: none;
		display: flex;
		height: 45px;
		align-items: center;
		padding: 0 10px;
		font-size: 13px;
	}
	.activeNav {
		color: aqua;
		text-decoration: underline;
		border-bottom: 2px aqua;
		border-radius: 10%;
	}
	@media only screen and (min-width: 767px) {
		.mobile-icon {
			display: none;
		}

		.navbar-list {
			display: flex;
			padding: 0;
		}

		.navbar-list a {
			display: inline-flex;
		}
	}
</style>
