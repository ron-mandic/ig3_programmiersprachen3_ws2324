<script lang="ts">
	import { random } from "../lib/ts/functions";
	import type { TBubble } from "../lib/ts/types";
	export let attributes: TBubble;

	const { id, left, top, size } = attributes;

	let iconName: string, iconBackgroundColor: string;
	let randomNumber = random(1, 8);

	switch (randomNumber) {
		case 1:
			iconName = "beverages";
			iconBackgroundColor = "#F25C10";
			break;
		case 2:
			iconName = "eco";
			iconBackgroundColor = "#429463";
			break;
		case 3:
			iconName = "speaker";
			iconBackgroundColor = "#6E41D9";
			break;
		case 4:
			iconName = "water";
			iconBackgroundColor = "#1FCAFE";
			break;
		case 5:
			iconName = "food";
			iconBackgroundColor = "#8F1D4E";
			break;
		case 6:
			iconName = "accessible";
			iconBackgroundColor = "#0C7CD3";
			break;
		case 7:
			iconName = "emergency";
			iconBackgroundColor = "#F20800";
			break;
		case 8:
			iconName = "exit";
			iconBackgroundColor = "#F90B75";
			break;
	}
</script>

<div
	{id}
	class="bubble absolute"
	style="--left: {left}px; --top: {top}px; --width: {size}px; --height: {size}px; --color: {iconBackgroundColor}; --url: url('/svg/icon-{iconName}.svg'); border-radius: 100%;"
></div>

<style lang="scss">
	.bubble {
		top: var(--top);
		left: var(--left);
		width: var(--width);
		height: var(--height);
		background-image: var(--url);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		background-color: var(--color);
	}
</style>
