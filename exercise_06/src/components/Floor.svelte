<script lang="ts">
	import { createBubbles, random } from "../lib/ts/functions";
	import type { TFloorAttributes } from "../lib/ts/types";
	import Bubble from "./Bubble.svelte";
	export let attributes: TFloorAttributes;

	const { id, left: x0, top: y0, width, height } = attributes;
	const arrBubbles = createBubbles(attributes, random(2, 8));
</script>

<div
	{id}
	class="floor absolute"
	style="--left: {x0}px; --top: {y0}px; --width: {width}px; --height: {height}px;"
>
	{#each arrBubbles as bubble (bubble.id)}
		<Bubble attributes={bubble} />
	{/each}
</div>

<style lang="scss">
	.floor {
		top: var(--top);
		left: var(--left);
		width: var(--width);
		height: var(--height);
		border: 2px solid transparent;
		pointer-events: none;
	}
</style>
