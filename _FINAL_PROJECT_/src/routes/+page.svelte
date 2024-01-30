<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Pokémon - Home</title>
	<meta name="description" content="Pokédex - Home" />
</svelte:head>

<div class="rootFrame">
	<h1 class="absolute max-w-[600px] p-5 text-7xl font-bold">
		Welcome to the <wbr /> unoffical Pokédex
	</h1>
	<div class="relative">
		<div class="layouts">
			<a class="layout h-full mask" href="/generation/">
				<h2 class="px1 py-1 text-3xl font-semibold">Generations</h2>
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.rootFrame {
		width: 100%;
		height: 100vh;
		background-image: linear-gradient(to top, var(--background), var(--background-alpha)),
			url('/png/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		padding-top: 125px;

		div {
			width: 100%;
			height: 100%;
			max-height: 100svh;
			max-width: 1920px;
		}
	}

	h1 {
		font-size: 350%;
		line-height: 1.25;
	}

	.layouts {
		position: absolute;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 1rem;
		width: 100% !important;
		height: 200px !important;
		overflow-y: hidden;
		overflow-x: scroll;
	}

	.layout {
		position: relative;
		padding: 1.25rem 1.75rem;
		width: 100%;

		background-color: #ccc;
		border-radius: 1.5rem;
		backdrop-filter: blur(30px);
		border: 2px solid #aaa;
		backdrop-filter: blur(30px);
		transition: scale 0.25s ease-in-out;

		&:hover {
			scale: 1.05;
			transition: scale 0.25s ease-in-out;
		}

		&:not(.active),
		&:not(.active):hover {
			opacity: 0.75;
		}

		&::before {
			content: url('/svg/favicon-bw.svg');
			position: absolute;
			top: 50%;
			left: 50%;
			width: 30%;
			height: auto;
			aspect-ratio: 1;
			transform: translate(calc(-50% - 2rem), -50%);
			z-index: 1000;
			filter: invert(1);
			mix-blend-mode: overlay;
			opacity: 0.125;
			scale: 0.75;
		}
	}

	@media screen and (min-width: 768px) {
		.layout {
			width: 400px !important;
		}
	}

	@media (prefers-color-scheme: dark) {
		.layout {
			background-color: var(--background-alpha);
			border: 4px solid #11111123;
		}
	}
</style>
