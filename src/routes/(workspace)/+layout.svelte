<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentUser, pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';

	let notifications = [];
	let unsubscribe;
	let current_page = 1;
	let per_page = 20;
	const date = new Date();
	let hours = date.getHours();
	let status =
		hours < 12 ? 'Good Morning' : hours <= 18 && hours >= 12 ? 'Good Afternoon' : 'Good Evening';
	function signOut() {
		pb.authStore.clear();
		goto('/');
	}
	function timeSince(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + " years";
		}

		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + " months";
		}

		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + " days";
		}

		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + " hours";
		}

		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + " minutes";
		}

		return Math.floor(seconds) + " seconds";
	}


	onMount(async () => {
		if ($currentUser?.id == 'undefined' || $currentUser?.id == null) {
			pb.authStore.clear();
			goto('/');
		}
		const resultList = await pb.collection('notifications').getList(current_page, per_page, {
			sort: '-created',
			expand: 'user'
		});
		notifications = resultList.items;

		unsubscribe = await pb.collection('notifications').subscribe('*', async ({ action, record }) => {
			if (action === 'create' || action === 'update') {
				// Fetch associated client,
				const user = await pb.collection('users').getOne(record.user);
				record.expand = {user };
				notifications = [ record, ...orders];
			}
			if (action === 'delete') {
				notifications = notifications.filter((m) => m.id !== record.id);
			}
		});
	});
	// Unsubscribe from realtime orders
	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<div class="with-welcome-text">
	<div class="container-scroller">
		<!-- partial:partials/_navbar.html -->
		<nav
			class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row"
		>
			<div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
				<div class="me-3">
					<button
						class="navbar-toggler navbar-toggler align-self-center"
						type="button"
						data-bs-toggle="minimize"
					>
						<span class="icon-menu"></span>
					</button>
				</div>
				<div>
					<a class="navbar-brand brand-logo" href="/">
						<img
							src="/src/lib/images/eazyTechLogoTransparent.png"
							style="width: 200px; height: 120px; radius: 10%"
							alt="logo"
						/>
					</a>
					<li class="navbar-brand brand-logo-mini">
						<a
							class="nav-link"
							id="UserDropdown"
							href="{$currentUser?.username}/user_profile"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								class="img-xs rounded-circle"
								src="https://robohash.org/{$currentUser?.username}"
								alt="Profile image"
							/>
						</a>
						<div
							class="dropdown-menu dropdown-menu-right navbar-dropdown"
							aria-labelledby="UserDropdown"
						>
							<div class="dropdown-header text-center">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									class="img-md rounded-circle"
									src="https://robohash.org/{$currentUser?.username}"
									alt="Profile image"
								/>
								<p class="mb-1 mt-3 font-weight-semibold">{$currentUser?.name}</p>
								<p class="fw-light text-muted mb-0">{$currentUser?.email}</p>
							</div>
							<a class="dropdown-item" href="{$currentUser?.username}">
								<i class="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i>
								My Profile
							</a>
							<button class="dropdown-item" on:click={signOut}>
								<i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i>
								Sign Out
							</button>
						</div>
					</li>
				</div>
			</div>
			<div class="navbar-menu-wrapper d-flex align-items-top">
				<ul class="navbar-nav">
					<li class="nav-item font-weight-semibold">
						<h2 class="text-black fw-bold">Easy Tech Writers and Solutions</h2>
						<h3 class="welcome-text">
							{status}, <span class="text-black fw-bold">{$currentUser?.name}</span>
						</h3>
					</li>
				</ul>
				<ul class="navbar-nav ms-auto">
					<li class="nav-item dropdown">
						<div
							style="cursor: pointer;"
							class="nav-link count-indicator"
							id="notificationDropdown"
							data-bs-toggle="dropdown"
						>
							<i class="icon-bell"></i>
							<span class="count"></span>
						</div>
						<div
							class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
							aria-labelledby="notificationDropdown"
						>
							<div class="dropdown-item py-3 border-bottom">
								<p class="mb-0 font-weight-medium float-left">You have {notifications.filter(notice => notice.is_read == false).length} new notifications</p>
								<span class="badge badge-pill badge-primary float-right">View all</span>
							</div>
							{#each notifications.filter(notice => notice.is_read == false) as notice}
							<div class="dropdown-item preview-item py-3">
								<div class="preview-thumbnail">
									<i class="mdi mdi-information m-auto text-primary"></i>
								</div>
								<div class="preview-item-content">
									<h6 class="preview-subject fw-normal text-dark mb-1">{notice.title}</h6>
									<p class="fw-light small-text mb-0">{timeSince(new Date(notice.created))}</p>
								</div>
							</div>
							{/each}
						</div>
					</li>
					<li class="nav-item dropdown d-none d-lg-block">
						<a
							class="nav-link"
							id="UserDropdown"
							href="/users/{$currentUser?.id}"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								class="img-xs rounded-circle"
								src="https://robohash.org/{$currentUser?.username}"
								alt="Profile image"
							/>
						</a>
						<div
							class="dropdown-menu dropdown-menu-right navbar-dropdown"
							aria-labelledby="UserDropdown"
						>
							<div class="dropdown-header text-center">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img
									class="img-md rounded-circle"
									style="width: 100px; height: 100px; radius: 10%"
									src="https://robohash.org/{$currentUser?.username}"
									alt="Profile image"
								/>
								<p class="mb-1 mt-3 font-weight-semibold">{$currentUser?.name}</p>
								<p class="fw-light text-muted mb-0">{$currentUser?.email}</p>
							</div>
							<a class="dropdown-item" href="/users/{$currentUser?.id}">
								<i class="dropdown-item-icon mdi mdi-account-outline text-primary me-2"></i>
								My Profile
							</a>
							<button class="dropdown-item" on:click={signOut}>
								<i class="dropdown-item-icon mdi mdi-power text-primary me-2"></i>
								Sign Out
							</button>
						</div>
					</li>
				</ul>

				<button
					class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
					type="button"
					data-bs-toggle="offcanvas"
				>
					<span class="mdi mdi-menu"></span>
				</button>
			</div>
		</nav>
		<!-- partial -->
		<div class="container-fluid page-body-wrapper">
			<nav class="sidebar sidebar-offcanvas" id="sidebar">
				<ul class="nav mt-5">
					{#if $currentUser?.role.includes('Admin') || $currentUser?.role.includes('Client')}
						<li class="nav-item {($page.url.pathname === '/orders/new') ? 'active' : ''} mt-5">
							<a class="nav-link" href="/orders/new">
								<i class="mdi mdi-grid-large menu-icon"></i>
								<span class="menu-title">Place Order</span>
							</a>
						</li>
						<li class="nav-item nav-category">Orders</li>
						<li
							class="nav-item {$page.url.pathname.startsWith('/orders')
							? 'active'
							: undefined}"
						>
							<a
								class="nav-link"
								data-bs-toggle="collapse"
								href="#orders"
								aria-expanded="false"
								aria-controls="orders"
							>
								<i class="menu-icon mdi mdi-floor-plan"></i>
								<span class="menu-title">Orders</span>
								<i class="mdi mdi-arrow-down-drop-circle-outline"></i>
							</a>
							<div class="collapse" id="orders">
								<ul class="nav flex-column sub-menu">
									<li class="nav-item {$page.url.pathname === '/orders/new' ? 'active' : undefined}">
										<a class="nav-link" href="/orders/new">Place Orders</a>
									</li>
									<li class="nav-item {$page.url.pathname === '/orders' ? 'active' : undefined}">
										<a class="nav-link" href="/orders">All Orders</a>
									</li>
									<li
										class="nav-item {$page.url.pathname === '/orders/my_orders'
										? 'active'
										: undefined}"
									>
										<a class="nav-link" href="/orders/my_orders">My Orders</a>
									</li>
								</ul>
							</div>
						</li>
						<li class="nav-item nav-category">Transactions</li>
						<li
							class="nav-item {$page.url.pathname.startsWith('/transactions') ? 'active' : undefined}">
							<a
								class="nav-link"
								data-bs-toggle="collapse"
								href="#transactions"
								aria-expanded="false"
								aria-controls="transactions"
							>
								<i class="menu-icon mdi mdi-card-text-outline"></i>
								<span class="menu-title">Money Transactions</span>
								<i class="mdi mdi-arrow-down-drop-circle-outline"></i>
							</a>
							<div class="collapse" id="transactions">
								<ul class="nav flex-column sub-menu">
									<li class="nav-item {$page.url.pathname === '/transactions' ? 'active' : undefined}">
										<a class="nav-link" href="/transactions">Make Payment</a>
									</li>
									<li class="nav-item {$page.url.pathname === '/transactions/my_transactions' ? 'active' : undefined}">
										<a class="nav-link" href="/transactions/my_transactions">My Transactions</a>
									</li>
								</ul>
							</div>
						</li>
					{/if}
					{#if $currentUser?.role.includes('Admin') || $currentUser?.role.includes('Writer') || $currentUser?.role.includes('Approver')}
						<li class="nav-item nav-category">Tasks</li>
						<li
							class="nav-item {$page.url.pathname.startsWith('/tasks')
							? 'active'
							: undefined}"
						>
							<a
								class="nav-link"
								data-bs-toggle="collapse"
								href="#tasks"
								aria-expanded="false"
								aria-controls="tasks"
							>
								<i class="menu-icon mdi mdi-file-document"></i>
								<span class="menu-title">Tasks</span>
								<i class="mdi mdi-arrow-down-drop-circle-outline"></i>
							</a>
							<div class="collapse" id="tasks">
								<ul class="nav flex-column sub-menu">
									<li class="nav-item">
										<a
											class="nav-link {$page.url.pathname === '/tasks' ? 'active' : undefined}"
											href="/tasks">All Tasks</a
										>
										<a
											class="nav-link {$page.url.pathname === '/tasks/my_tasks'
											? 'active'
											: undefined}"
											href="/tasks/my_tasks">My Tasks</a
										>
									</li>
								</ul>
							</div>
						</li>
					{/if}
					<!--					<li class="nav-item nav-category">System Users</li>-->
					<!--					<li class="nav-item">-->
					<!--						<a-->
					<!--							class="nav-link"-->
					<!--							data-bs-toggle="collapse"-->
					<!--							href="#system_users"-->
					<!--							aria-expanded="false"-->
					<!--							aria-controls="system_users"-->
					<!--						>-->
					<!--							<i class="menu-icon mdi mdi-account-circle-outline"></i>-->
					<!--							<span class="menu-title">Users &nbsp; &nbsp; &nbsp; &nbsp;</span> -->
					<!--							<i class="mdi mdi-arrow-down-drop-circle-outline"></i>-->
					<!--						</a>-->
					<!--						<div class="collapse" id="system_users">-->
					<!--							<ul class="nav flex-column sub-menu">-->
					<!--								<li class="nav-item">-->
					<!--									<a class="nav-link" href="coming-soon">All Users</a>-->
					<!--								</li>-->
					<!--							</ul>-->
					<!--						</div>-->
					<!--					</li>-->
				</ul>
			</nav>
			<!-- partial -->
			<div class="main-panel" style="height: 100px; overflow-y: scroll">
				<div class="content-wrapper">
					<slot />
				</div>
				<!-- content-wrapper ends -->
				<!-- partial:partials/_footer.html -->
				<footer class="footer">
					<div class="d-sm-flex justify-content-center justify-content-sm-between">
						<span class="text-muted text-center text-sm-left d-block d-sm-inline-block"
						>Dev Kim</span
						>
						<span class="float-none float-sm-end d-block mt-1 mt-sm-0 text-center"
						>Copyright © {date.getFullYear()}. All rights reserved.</span
						>
					</div>
				</footer>
				<!-- partial -->
			</div>
			<!-- main-panel ends -->
		</div>
		<!-- page-body-wrapper ends -->
	</div>
	<!-- container-scroller -->
</div>
