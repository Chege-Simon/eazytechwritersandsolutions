<script>
	import logo from '$lib/images/eazyTechLogo.jpeg';
	import contactImage from '$lib/images/contact.jpg'
</script>
<svelte:head>
	<title>About</title>
	<meta name="description" content="About us" />
</svelte:head>

<!--<div class="text-column">-->
<!--	<h1>Who are we?</h1>-->

<!--	<p>-->
<!--		If about Eazy Tech Writers Limited.-->
<!--	</p>-->

<!--</div>--><!-- About 1 - Bootstrap Brain Component -->
<section class="mt-5">
	<div class="container mt-5">
		<div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
			<div class="col-12 col-lg-6 col-xl-5">
				<img class="img-fluid rounded" loading="lazy" src={contactImage} alt="About 1">
			</div>
			<div class="col-12 col-lg-6 col-xl-7">
				<div class="row justify-content-xl-center">
					<div class="col-12 col-xl-11">
						<h1 class="mb-3">Who Are We?</h1>
						<p class="lead fs-4 text-dark mb-3">Our vision is to empower individuals to unlock their full creative
							potential and inspire collective innovation.</p>
						<p class="mb-5">Our mission is to build a dynamic community where individuals connect and grow through the
							transformative influence of writing, reading, and idea exchange, fostering creativity and mutual
							understanding.</p>
						<div class="row gy-4 gy-md-0 gx-xxl-5X">
							<div class="col-12 col-md-6">
								<div class="d-flex">
									<div class="me-4 text-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
												 class="bi bi-gear-fill" viewBox="0 0 16 16">
											<path
												d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
										</svg>
									</div>
									<div>
										<h2 class="h4 mb-3">Online Writing</h2>
										<p class="text-dark mb-0">We take pride in our writing skills.</p>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-6">
								<div class="d-flex">
									<div class="me-4 text-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
												 class="bi bi-fire" viewBox="0 0 16 16">
											<path
												d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
										</svg>
									</div>
									<div>
										<h2 class="h4 mb-3">Application Developement</h2>
										<p class="text-dark mb-0">We can build your application as you envision.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="container py-5">
	<div class="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s"
			 style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
		<h1 class="display-3 mb-4">Why Choose Us? Get The Best</h1>
		<p class="mb-0">Elevate your academic journey and beyond with our multifaceted service. From impeccably crafted
			essays and academic tasks to bespoke web applications, our team of experts is dedicated to empowering you every
			step of the way. Enjoy top-quality, plagiarism-free content tailored to your needs, backed by timely delivery,
			unwavering confidentiality, and a commitment to your satisfaction. Whether you're navigating academia or venturing
			into the digital realm, trust us to provide the support you need to excel. Experience affordability, reliability,
			and a steadfast dedication to your academic and technological success.</p>
	</div>
	<div class="row g-4 justify-content-center">
		<div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s"
				 style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
			<div class="row-cols-1 feature-item p-4">
				<div class="col-12">
					<div class="feature-icon mb-4">
						<!--						<div class="p-3 d-inline-flex bg-white rounded">-->
						<!--							<i class="fas fa-diagnoses fa-4x text-primary"></i>-->
						<!--						</div>-->
						<div class="me-auto">
							<img src={logo} alt="Bootstrap" width="32" height="32"
									 class="rounded-circle border border-white">
						</div>
					</div>
					<div class="feature-content d-flex flex-column">
						<h5 class="mb-4">Quality and Expertise</h5>
						<p class="mb-0">We pride ourselves on delivering top-notch academic content that meets the highest standards
							of quality and professionalism.</p>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.3s"
				 style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInUp;">
			<div class="row-cols-1 feature-item p-4">
				<div class="col-12">
					<div class="feature-icon mb-4">
						<!--						<div class="p-3 d-inline-flex bg-white rounded">-->
						<!--							<i class="fas fa-briefcase-medical fa-4x text-primary"></i>-->
						<!--						</div>-->
						<div class="me-auto">
							<img src={logo} alt="Bootstrap" width="32" height="32"
									 class="rounded-circle border border-white">
						</div>
					</div>
					<div class="feature-content d-flex flex-column">
						<h5 class="mb-4">Originality and Plagiarism-Free Guarantee</h5>
						<p class="mb-0">With us, you can trust that your assignments are crafted from scratch, tailored to your
							instructions, and free from any form of plagiarism.</p>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.5s"
				 style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
			<div class="row-cols-1 feature-item p-4">
				<div class="col-12">
					<div class="feature-icon mb-4">
						<!--						<div class="p-3 d-inline-flex bg-white rounded">-->
						<!--							<i class="fas fa-hospital-user fa-4x text-primary"></i>-->
						<!--						</div>-->
						<div class="me-auto">
							<img src={logo} alt="Bootstrap" width="32" height="32"
									 class="rounded-circle border border-white">
						</div>
					</div>
					<div class="feature-content d-flex flex-column">
						<h5 class="mb-4">Timely Delivery</h5>
						<p class="mb-0">Rest assured, with our service, you can meet your deadlines with confidence. We take pride
							in our track record of timely delivery and strive to exceed your expectations.</p>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.7s"
				 style="visibility: visible; animation-delay: 0.7s; animation-name: fadeInUp;">
			<div class="row-cols-1 feature-item p-4">
				<div class="col-12">
					<div class="feature-icon mb-4">
						<!--						<div class="p-3 d-inline-flex bg-white rounded">-->
						<!--							<i class="fas fa-users fa-4x text-primary"></i>-->
						<!--						</div>-->
						<div class="me-auto">
							<img src={logo} alt="Bootstrap" width="32" height="32"
									 class="rounded-circle border border-white">
						</div>
					</div>
					<div class="feature-content d-flex flex-column">
						<h5 class="mb-4">Confidentiality and Privacy</h5>
						<p class="mb-0">You can trust us to handle your academic needs discreetly and securely. Your confidentiality
							is guaranteed throughout the entire process, from placing your order to receiving the final
							deliverable</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>