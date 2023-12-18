<script lang="ts">
	import { fade } from "svelte/transition";
</script>

<!-- Credits: https://uiverse.io/barisdogansutcu/light-rat-32 -->
<div class="loader" out:fade={{ delay: 250, duration: 300 }}>
	<svg viewBox="25 25 50 50">
		<circle r="20" cy="50" cx="50"></circle>
	</svg>
</div>

<style>
	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	svg {
		width: 3.25em;
		transform-origin: center;
		animation: rotate 2s linear infinite;
	}

	circle {
		fill: none;
		stroke: hsl(214, 97%, 59%);
		stroke-width: 4px;
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}

		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35px;
		}

		100% {
			stroke-dashoffset: -125px;
		}
	}
</style>
