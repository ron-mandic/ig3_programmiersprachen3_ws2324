<header class="fixed w-full h-[100px] top-0 left-0 z-50" />

<style lang="scss">
	header {
		--bg-color: #e7e7ef86;
		--border-bottom-color: #0a0a0f10;

		background-color: var(--bg-color);
		backdrop-filter: blur(50px);
		border-bottom: 0.125rem solid var(--border-bottom-color);
		z-index: 999;
	}

	@media (prefers-color-scheme: dark) {
		header {
			--bg-color: #10101886;
			--border-bottom-color: #f0f0f510;
		}
	}
</style>
