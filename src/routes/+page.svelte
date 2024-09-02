<script>
	import logo from '$lib/assets/images/eazyTechLogoTransparent.png';
	import Header from './Header.svelte';
	import './styles.css';
	// import hero from  '$lib/assets/images/hero_background.jpg';
	import contact from '$lib/assets/images/contactUs.jpg';
	import hero from '$lib/assets/images/hero.jpg';
	import service1 from '$lib/assets/images/services/services1.jpg';
	import service2 from '$lib/assets/images/services/services2.jpg';
	import service3 from '$lib/assets/images/services/services3.jpg';

	const date = new Date();
</script>

<svelte:head>
	<title>Eazy Tech Writers & Solutions</title>
	<meta name="description" content="EazyTechWriters&Solutions" />
</svelte:head>
<div class="app">
	<!-- Hero section -->
	<header
		class="hero-section text-dark bg-image"
		style="background-image: url({hero});
        background-repeat: no-repeat; background-size: cover;
        background-position: top; height: 100vh"
	>
		<Header />
		<div class="container d-flex justify-content-center align-items-center h-100">
			<div class="text-center">
				<a href="/">
					<img src={logo} style="width: 400px; height: 300px;" alt="logo" />
				</a>
				<h1 class="display-1 fw-bold">Welcome to Eazy Tech Writers & Solutions</h1>
				<p class="fs-3">Your one-stop shop for writing and business solutions.</p>
			</div>
		</div>
	</header>
	<!-- Services section -->
	<section class="bg-light py-3 py-md-5 py-xl-8">
		<div class="container">
			<div class="row justify-content-md-center">
				<div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
					<h1 class="pb-2 border-bottom">Our Services</h1>
					<p class="text-dark mb-5 text-center lead fs-4">
						We offer a comprehensive range of services to help you with academic writing, content
						creation, web design, and web development needs.
					</p>
					<hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="container-fluid">
						<div class="row gy-3 gy-md-4">
							<!-- Academic Writing Services -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											class="bi bi-pencil-square text-primary mb-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.75 1.75-2.208-2.208 1.75-1.75a.5.5 0 0 1 .707 0l1.5 1.5zM13.765 3.676l-2.208-2.207-7.678 7.678a.5.5 0 0 0-.121.196l-.805 2.414a.5.5 0 0 0 .63.63l2.414-.805a.5.5 0 0 0 .196-.12l7.678-7.678zM11.5 5.5v6.5a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1H5.5a.5.5 0 0 0 0-1H2.5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.5a.5.5 0 0 0-1 0z"
											/>
										</svg>

										<h4 class="mb-4">Academic Writing Services</h4>
										<p class="mb-4">
											Expert assistance with essays, research papers, theses, and more to meet your
											academic needs.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalAcademicWriting"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Content Writing Services -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											class="bi bi-file-earmark-text-fill text-primary mb-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.707a1 1 0 0 0-.293-.707L10 0.293A1 1 0 0 0 9.293 0zm-3.5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm4-4.5V1.5a.5.5 0 0 1 .5.5H9v2a1 1 0 0 0 1 1h2v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4v2.5z"
											/>
										</svg>

										<h4 class="mb-4">Content Writing Services</h4>
										<p class="mb-4">
											Professional content creation, including articles, copywriting, SEO content,
											and more.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalContentWriting"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Web Design Services -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											class="bi bi-display-fill text-primary mb-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4v1h1.5a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1H6v-1H2a2 2 0 0 1-2-2V3zm13 9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10z"
											/>
										</svg>

										<h4 class="mb-4">Web Design Services</h4>
										<p class="mb-4">
											Custom website design, UI/UX design, and responsive design for all devices.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalWebDesign"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Web Development Services -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											viewBox="0 0 24 24"
											class="bi bi-code-slash text-primary mb-4"
										>
											<path
												d="M16.5 3.5a.5.5 0 0 1 0 .707L9.207 11.5l7.293 7.293a.5.5 0 0 1-.708.707l-7.5-7.5a.5.5 0 0 1 0-.707l7.5-7.5a.5.5 0 0 1 .708 0zM7.5 3.5a.5.5 0 0 0-.707 0l-7.5 7.5a.5.5 0 0 0 0 .707l7.5 7.5a.5.5 0 0 0 .707-.707L1.207 11.5l6.293-6.293a.5.5 0 0 0 0-.707z"
											/>
										</svg>
										<h4 class="mb-4">Web Development Services</h4>
										<p class="mb-4">
											Full-stack development, eCommerce, CMS, and custom web applications tailored
											to your needs.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalWebDevelopment"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Digital Marketing and SEO Services -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											class="bi bi-bar-chart-fill text-primary mb-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M1 13.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm3-2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm3-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm3-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
											/>
										</svg>
										<h4 class="mb-4">Digital Marketing and SEO</h4>
										<p class="mb-4">
											Optimize your online presence with our SEO, social media management, and
											digital marketing strategies.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalMarketingSEO"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Consultation and Training Services -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											viewBox="0 0 24 24"
											class="bi bi-chat text-primary mb-4"
										>
											<path
												d="M12 3C7.03 3 3 6.58 3 11C3 12.64 3.58 14.18 4.58 15.42L3.02 19.32C2.91 19.69 3.12 20.07 3.49 20.19C3.65 20.24 3.81 20.25 3.96 20.2L7.85 18.65C9.18 19.49 10.81 20 12.5 20C17.47 20 21.5 16.42 21.5 12C21.5 7.58 17.47 4 12 4L12 3Z"
											/>
										</svg>

										<h4 class="mb-4">Consultation and Training</h4>
										<p class="mb-4">
											Expert consultations and training workshops in academic tutoring, web
											technologies, and business strategy.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalConsultationTraining"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Custom Software Development -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											class="bi bi-window-code text-primary mb-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M2.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-11zm0-1h11A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9A1.5 1.5 0 0 1 2.5 2z"
											/>
											<path
												d="M4.854 4.646a.5.5 0 1 0-.708.708L6.293 7 4.146 9.146a.5.5 0 0 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5zm4.292 0a.5.5 0 0 0-.708.708L9.707 7 7.854 8.854a.5.5 0 0 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5z"
											/>
										</svg>
										<h4 class="mb-4">Custom Software Development</h4>
										<p class="mb-4">
											Building tailored software solutions, mobile apps, and automation tools to
											enhance your business.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalSoftwareDevelopment"
										>
											Read More
										</button>
									</div>
								</div>
							</div>

							<!-- Project Management and QA -->
							<div class="col-12 col-md-6 col-lg-4">
								<div class="card border-dark">
									<div class="card-body text-center p-4 p-xxl-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											fill="currentColor"
											class="bi bi-check-circle-fill text-primary mb-4"
											viewBox="0 0 16 16"
										>
											<path
												d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 11.796l-3-3a.5.5 0 1 0-.707.707l3.5 3.5a.5.5 0 0 0 .707 0l7-7a.5.5 0 0 0-.707-.707l-6.647 6.647z"
											/>
										</svg>
										<h4 class="mb-4">Project Management and QA</h4>
										<p class="mb-4">
											Professional project management and quality assurance services to ensure
											successful project outcomes.
										</p>
										<button
											type="button"
											class="btn btn-outline-primary bsb-btn-circle"
											data-bs-toggle="modal"
											data-bs-target="#modalProjectManagementQA"
										>
											Read More
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Modals -->

	<!-- Academic Writing Modal -->
	<div
		class="modal fade"
		id="modalAcademicWriting"
		tabindex="-1"
		aria-labelledby="modalAcademicWritingLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalAcademicWritingLabel">Academic Writing Services</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					We provide a wide range of academic writing services:
					<ul>
						<li>
							<strong>Essay Writing:</strong> Custom-written essays on various topics, tailored to academic
							requirements.
						</li>
						<li>
							<strong>Assignment Help: </strong>Assistance with homework, case studies, lab reports,
							and other academic assignments.
						</li>
						<li>
							<strong>Research Paper Writing: </strong>In-depth research and writing for academic
							papers, including sourcing, referencing, and structuring.
						</li>
						<li>
							<strong>Thesis/Dissertation Assistance:</strong> Guidance or complete writing services
							for graduate and post-graduate theses and dissertations.
						</li>
						<li>
							<strong>Editing and Proofreading: </strong>Reviewing and refining written work to
							ensure clarity, coherence, and grammatical accuracy.
						</li>
						<li>
							<strong>Plagiarism Checking: </strong>Ensuring content originality using plagiarism
							detection software.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Content Writing Modal -->
	<div
		class="modal fade"
		id="modalContentWriting"
		tabindex="-1"
		aria-labelledby="modalContentWritingLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalContentWritingLabel">Content Writing Services</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					Our content writing services cover a broad spectrum:
					<ul>
						<li>
							<strong>Article Writing:</strong> Creating informative and engaging articles for blogs,
							magazines, or online publications.
						</li>
						<li>
							<strong>Copywriting:</strong> Writing persuasive and impactful copy for marketing materials,
							websites, and ads.
						</li>
						<li>
							<strong>Content Strategy:</strong> Developing content strategies that align with marketing
							goals and audience needs.
						</li>
						<li>
							<strong>SEO Content Writing:</strong> Writing search engine optimized content to improve
							website rankings.
						</li>
						<li>
							<strong>Technical Writing:</strong> Producing manuals, guides, and documentation for products
							or services.
						</li>
						<li>
							<strong>Ghostwriting:</strong> Writing content on behalf of someone else, often for blogs,
							books, or speeches.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Web Design Modal -->
	<div
		class="modal fade"
		id="modalWebDesign"
		tabindex="-1"
		aria-labelledby="modalWebDesignLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalWebDesignLabel">Web Design Services</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					We specialize in custom website design, ensuring that your site is visually appealing and
					user-friendly. Our services include:
					<ul>
						<li>
							<strong>Custom Website Design:</strong> Designing visually appealing and user-friendly
							websites tailored to client needs.
						</li>
						<li>
							<strong>UI/UX Design:</strong> Creating intuitive and attractive user interfaces and enhancing
							user experiences.
						</li>
						<li>
							<strong>Responsive Design:</strong> Ensuring websites work well on all devices (mobile,
							tablet, desktop).
						</li>
						<li>
							<strong>Graphic Design:</strong> Crafting logos, banners, and other visual elements for
							web use.
						</li>
						<li>
							<strong>Website Redesign:</strong> Updating and modernizing existing websites to improve
							aesthetics and functionality.
						</li>
						<li>
							<strong>Landing Page Design:</strong> Designing focused landing pages optimized for conversion.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Web Development Modal -->
	<div
		class="modal fade"
		id="modalWebDevelopment"
		tabindex="-1"
		aria-labelledby="modalWebDevelopmentLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalWebDevelopmentLabel">Web Development Services</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					Our web development services include:
					<ul>
						<li>
							<strong>Frontend Development:</strong> Building the client-facing side of websites using
							HTML, CSS, JavaScript, etc.
						</li>
						<li>
							<strong>Backend Development:</strong> Developing server-side logic, databases, and APIs
							to support website functionality.
						</li>
						<li>
							<strong>Full-Stack Development:</strong> Offering both frontend and backend development
							for complete web applications.
						</li>
						<li>
							<strong>eCommerce Development:</strong> Creating online stores with integrated payment
							systems, product management, and order tracking.
						</li>
						<li>
							<strong>CMS Development:</strong> Setting up and customizing Content Management Systems
							(e.g., WordPress, Joomla).
						</li>
						<li>
							<strong>Web Application Development:</strong> Building dynamic web apps with complex functionalities
							(e.g., SaaS platforms).
						</li>
						<li>
							<strong>API Integration:</strong> Integrating third-party APIs (e.g., payment gateways,
							social media) into websites and apps.
						</li>
						<li>
							<strong>Maintenance and Support:</strong> Providing ongoing support, updates, and troubleshooting
							for websites and web apps.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Marketing and SEO Modal -->
	<div
		class="modal fade"
		id="modalMarketingSEO"
		tabindex="-1"
		aria-labelledby="modalMarketingSEOLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalMarketingSEOLabel">
						Digital Marketing and SEO Services
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					We offer comprehensive:
					<ul>
						<li>
							<strong>Frontend Development:</strong> Building the client-facing side of websites using
							HTML, CSS, JavaScript, etc.
						</li>
						<li>
							<strong>Backend Development:</strong> Developing server-side logic, databases, and APIs
							to support website functionality.
						</li>
						<li>
							<strong>Full-Stack Development:</strong> Offering both frontend and backend development
							for complete web applications.
						</li>
						<li>
							<strong>eCommerce Development:</strong> Creating online stores with integrated payment
							systems, product management, and order tracking.
						</li>
						<li>
							<strong>CMS Development:</strong> Setting up and customizing Content Management Systems
							(e.g., WordPress, Joomla).
						</li>
						<li>
							<strong>Web Application Development:</strong> Building dynamic web apps with complex functionalities
							(e.g., SaaS platforms).
						</li>
						<li>
							<strong>API Integration:</strong> Integrating third-party APIs (e.g., payment gateways,
							social media) into websites and apps.
						</li>
						<li>
							<strong>Maintenance and Support:</strong> Providing ongoing support, updates, and troubleshooting
							for websites and web apps.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Consultation and Training Modal -->
	<div
		class="modal fade"
		id="modalConsultationTraining"
		tabindex="-1"
		aria-labelledby="modalConsultationTrainingLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalConsultationTrainingLabel">
						Consultation and Training Services
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					Our consultation services include:
					<ul>
						<li>
							<strong>Search Engine Optimization (SEO):</strong> Optimizing websites to improve visibility
							in search engines.
						</li>
						<li>
							<strong>Social Media Management:</strong> Managing and growing social media accounts for
							businesses and individuals.
						</li>
						<li>
							<strong>Content Marketing:</strong> Creating and distributing valuable content to attract
							and engage target audiences.
						</li>
						<li>
							<strong>PPC Advertising:</strong> Managing pay-per-click campaigns on platforms like Google
							Ads and social media.
						</li>
						<li>
							<strong>Email Marketing:</strong> Crafting and managing email campaigns to promote products,
							services, or content.
						</li>
						<li>
							<strong>Analytics and Reporting:</strong> Tracking website performance and user behavior
							to provide actionable insights.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Software Development Modal -->
	<div
		class="modal fade"
		id="modalSoftwareDevelopment"
		tabindex="-1"
		aria-labelledby="modalSoftwareDevelopmentLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalSoftwareDevelopmentLabel">
						Custom Software Development
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					We specialize in custom software development:
					<ul>
						<li>
							<strong>Mobile App Development:</strong> Designing and developing apps for iOS, Android,
							and cross-platform solutions.
						</li>
						<li>
							<strong>Enterprise Solutions:</strong> Developing custom software to meet specific business
							needs (e.g., CRM, ERP systems).
						</li>
						<li>
							<strong>Automation Tools:</strong> Creating tools to automate repetitive tasks, data entry,
							and other business processes.
						</li>
						<li>
							<strong>API Development:</strong> Building custom APIs to enable integrations with other
							software systems.
						</li>
						<li>
							<strong>SaaS Development:</strong> Developing software-as-a-service platforms for various
							industries.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Project Management and QA Modal -->
	<div
		class="modal fade"
		id="modalProjectManagementQA"
		tabindex="-1"
		aria-labelledby="modalProjectManagementQALabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalProjectManagementQALabel">Project Management and QA</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					Our project management services:
					<ul>
						<li>
							<strong>Project Management:</strong> Overseeing the planning, execution, and completion
							of projects, ensuring they meet client expectations.
						</li>
						<li>
							<strong>Quality Assurance (QA) Testing:</strong> Testing websites, apps, and software for
							bugs, usability issues, and performance problems.
						</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Contact Section -->
	<section
		id="contact"
		class="py-5"
		style="background-image: url({contact});
						 background-repeat: no-repeat; background-size: cover; background-position: center"
	>
		<!-- Contact 5 - Bootstrap Brain Component -->
		<section class="py-3 py-md-5 py-xl-8">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-10 col-lg-8">
						<h1 class="fs-5 mb-2 text-uppercase">Contact Us</h1>
						<p class="mb-4 mb-md-5 mb-xl-8">
							We're always on the lookout to work with new clients. Please get in touch in one of
							the following ways.
						</p>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row gy-4 gy-md-5 gy-lg-0 align-items-md-center">
					<div class="col-12">
						<div class="row justify-content-xl-center">
							<div class="col-12">
								<!--									<div class="mb-4 mb-md-5">-->
								<!--										<div class="mb-3 text-primary">-->
								<!--											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16">-->
								<!--												<path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />-->
								<!--											</svg>-->
								<!--										</div>-->
								<!--										<div>-->
								<!--											<h4 class="mb-2">Office</h4>-->
								<!--											<p class="mb-2">Please visit us to have a discussion.</p>-->
								<!--											<hr class="w-50 mb-3 border-dark-subtle">-->
								<!--											<address class="m-0 text-secondary">8014 Edith Blvd NE, Albuquerque, New York, United States</address>-->
								<!--										</div>-->
								<!--									</div>-->
								<div class="row mb-sm-4 mb-md-5">
									<div class="col-12 col-sm-6">
										<div class="mb-4 mb-sm-0">
											<div class="mb-3 text-primary">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="32"
													height="32"
													fill="currentColor"
													class="bi bi-telephone-outbound"
													viewBox="0 0 16 16"
												>
													<path
														d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"
													/>
												</svg>
											</div>
											<div>
												<h4 class="mb-2">Phone</h4>
												<p class="mb-2">Please speak with us directly.</p>
												<hr class="w-75 mb-3 border-dark-subtle" />
												<p class="mb-0">
													<a class="link-primary text-decoration-none" href="tel:+254714222996"
														>(254) 714222996</a
													>
												</p>
											</div>
										</div>
									</div>
									<div class="col-12 col-sm-6">
										<div class="mb-4 mb-sm-0">
											<div class="mb-3 text-primary">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="32"
													height="32"
													fill="currentColor"
													class="bi bi-envelope-at"
													viewBox="0 0 16 16"
												>
													<path
														d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"
													/>
													<path
														d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
													/>
												</svg>
											</div>
											<div>
												<h4 class="mb-2">Email</h4>
												<p class="mb-2">Please write to us directly.</p>
												<hr class="w-75 mb-3 border-dark-subtle" />
												<p class="mb-0">
													<a
														class="link-primary text-decoration-none"
														href="mailto:eazytechhq@outlook.com">eazytechhq@outlook.com</a
													>
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div class="mb-3 text-primary">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											fill="currentColor"
											class="bi bi-alarm"
											viewBox="0 0 16 16"
										>
											<path
												d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"
											/>
											<path
												d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"
											/>
										</svg>
									</div>
									<div>
										<h4 class="mb-2">Opening Hours</h4>
										<p class="mb-2">Explore our business opening hours.</p>
										<hr class="w-50 mb-3 border-dark-subtle" />
										<div class="d-flex mb-1">
											<p class="text-primary fw-bold mb-0 me-5">Sun - Sat</p>
											<p class="text-primary mb-0">24/7</p>
										</div>
										<!--											<div class="d-flex">-->
										<!--												<p class="text-primary fw-bold mb-0 me-5">Sat - Sun</p>-->
										<!--												<p class="text-primary mb-0">9am - 2pm</p>-->
										<!--											</div>-->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</section>

	<!-- partial:partials/_footer.html -->
	<footer class="footer">
		<div class="d-sm-flex justify-content-center justify-content-sm-between">
			<span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Dev Kim</span>
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

	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	/* footer a {
		font-weight: bold;
	} */

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	/* .welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} */
</style>
