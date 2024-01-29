<script lang="ts">
	import { page } from '$app/stores';
	export let id: number | string;
	export let isOpen: boolean;

	console.log($page);
</script>

<header class="z-999 fixed left-0 top-0 flex h-[100px] w-full items-center justify-between px-3">
	<div class="flex w-full items-center justify-between pr-2">
		<a id="logo" href="/">
			<img src="/svg/favicon.svg" alt="Logo" style="mix-blend-mode: color;" />
		</a>
		{#if $page.route.id !== '/' && $page.route.id !== '/generation'}
			{#key id}
				<button class="trigger" class:open={isOpen} on:click></button>
			{/key}
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		--bg-color: #e7e7ef86;
		--border-bottom-color: #0a0a0f10;

		background-color: var(--bg-color);
		backdrop-filter: blur(50px);
		border-bottom: 0.125rem solid var(--border-bottom-color);
		z-index: 10000;
	}

	#logo img {
		width: 70px;
		height: 70px;
		aspect-ratio: 1;
		mix-blend-mode: overlay;
		filter: grayscale(10%);
	}

	.trigger {
		width: 25px;
		height: 50px;
		aspect-ratio: 1;
		border: 2px solid var(--foreground);
		opacity: 0.75;
		transition: all 0.25s ease-in-out;
		border-radius: 0.25rem;
		&.open {
			width: 50px;
			transition: all 0.25s ease-in-out;
		}
	}

	@media only screen and (min-width: 1052px) {
		.trigger {
			display: none;
		}
	}

	@media (prefers-color-scheme: dark) {
		header {
			--bg-color: #10101886;
			--border-bottom-color: #f0f0f510;
		}
	}
</style>
