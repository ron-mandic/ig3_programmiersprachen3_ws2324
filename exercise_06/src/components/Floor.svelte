<script lang="ts">
	import type { TFloorAttributes } from "../lib/ts/types";
	export let attributes: TFloorAttributes;

	const { id, left, top, width, height } = attributes;
</script>

<div
	{id}
	class="floor absolute"
	style="--left: {left}px; --top: {top}px; --width: {width}px; --height: {height}px;"
></div>

<style lang="scss">
	.floor {
		top: var(--top);
		left: var(--left);
		width: var(--width);
		height: var(--height);
		pointer-events: none;
		border: 2px solid transparent;
		background-color: rgba(red, 0.125);
	}
</style>
