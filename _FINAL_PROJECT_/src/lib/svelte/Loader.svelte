<script>
	export let radius = 20,
		stroke = '#000',
		strokeWidth = 6;

	const x0 = radius + 5,
		y0 = radius + 5,
		w = 2 * x0,
		cx = w,
		h = 2 * y0,
		cy = h;

	// Credits: https://uiverse.io/barisdogansutcu/light-rat-32
</script>

<div class="indicator">
	<svg viewBox="{x0} {y0} {w} {h}" style:--width={w + 'px'}>
		<circle r={radius} {cx} {cy} style:--strokeWidth={strokeWidth} style:--stroke={stroke}></circle>
	</svg>
</div>

<style lang="scss">
	svg {
		width: var(--width);
		transform-origin: center;
		animation: rotate 2s linear infinite;
		filter: invert(1);
	}

	circle {
		fill: none;
		stroke: var(--bg-color);
		stroke-width: var(--strokeWidth);
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
