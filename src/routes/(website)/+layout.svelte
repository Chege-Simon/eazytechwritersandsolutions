<script>
	import Header from '../Header.svelte';
	// import '../styles.css';

	const date = new Date();
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<!-- partial:partials/_footer.html -->
	<footer class="footer">
		<div class="d-sm-flex justify-content-center justify-content-sm-between">
						<span class="text-muted text-center text-sm-left d-block d-sm-inline-block"
						>Dev Kim </span
						>
			<span class="float-none float-sm-end d-block mt-1 mt-sm-0 text-center"
			>Copyright © {date.getFullYear()}. All rights reserved.</span
			>
		</div>
	</footer>
	<!-- partial -->
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
