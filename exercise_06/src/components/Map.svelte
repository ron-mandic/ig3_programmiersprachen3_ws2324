<script lang="ts">
	import { onMount } from "svelte";
	import { scale, draw } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { getBoundingClientRect } from "../lib/ts/functions";
	import { BUTTON_ADD_HEIGHT, BUTTON_ADD_WIDTH } from "../lib/ts/constants";
	import Floor from "./Floor.svelte";
	import type { TFloorAttributes } from "../lib/ts/types";

	// VARIABLES ##########################################################################

	let left: string;
	let top: string;

	let bindMap: SVGElement;

	let dictClicks: { [key: string]: number } = {};
	let arrFloors: TFloorAttributes[] = [];

	let mouseEntered = false;
	let mouseClicked = false;

	// FUNCTIONS ##########################################################################

	function handleMouseEnter(event: MouseEvent) {
		const target = event.currentTarget as SVGElement,
			targetId = target.id;
		if (target.classList.contains("active")) return;
		if (targetId === "ring" || targetId === "bottom-box") return;

		if (!mouseEntered) mouseEntered = true;

		const { left: x, top: y } = getBoundingClientRect(targetId);
		left = x;
		top = y;
	}

	function handleMouseLeave(_: MouseEvent) {
		if (mouseEntered) mouseEntered = false;
		if (mouseClicked) mouseClicked = false;
	}

	function handleClick(event: MouseEvent) {
		const target = event.target as SVGElement,
			targetId = target.id;
		if (
			targetId === "app-main-map__svg" ||
			targetId === "ring" ||
			targetId === "bottom-box"
		)
			return;

		mouseClicked = true;

		const data = dictClicks[targetId];
		if (!data) {
			dictClicks = {
				...dictClicks,
				[targetId]: 1,
			};
			target.classList.add("active");
			target.style.fill = "#1A1A2B";
			target.style.stroke = "#333355";
			target.style.strokeWidth = "2";

			createFloor(target);
		}
	}

	function createFloor(target: SVGElement) {
		const { x: x0, y: y0 } = bindMap.getBoundingClientRect();
		const { x, y, width, height } = target.getBoundingClientRect();

		const attributes = {
			id: `div.${target.id}`,
			left: Math.round(x - x0 - 1),
			top: Math.round(y - y0 - 1),
			width: Math.round(width + 2),
			height: Math.round(height + 2),
		};

		if (!arrFloors) arrFloors = [attributes];
		else arrFloors = [...arrFloors, attributes];
	}

	// LIFECYCLE ##########################################################################

	onMount(() => {
		const paths = bindMap.querySelectorAll("path")!;

		paths.forEach((path) => {
			path.addEventListener("mouseenter", handleMouseEnter);
			path.addEventListener("mouseleave", handleMouseLeave);
		});
		return () => {
			paths.forEach((path) => {
				path.removeEventListener("mouseenter", handleMouseEnter);
				path.removeEventListener("mouseleave", handleMouseLeave);
			});
		};
	});
</script>

<div id="app-main-map" class="relative">
	<button id="btn-svg" on:click={handleClick} out:scale>
		<svg
			id="app-main-map__svg"
			width="1614px"
			height="1214px"
			viewBox="0 0 1614 1214"
			bind:this={bindMap}
		>
			<g>
				<!-- <path d="M1614 0L1614 0L1614 1214L0 1214L0 0L1614 0Z" fill="#030305" stroke="none"/> -->
				<path
					d="M0 988L574 988L574 1068L766 1068L766 988L868 988L868 1070L1312 1070L1312 988L1614 988L1614 1214L0 1214L0 988Z"
					id="bottom-box"
					fill="#0B0B12"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M1147 995L1147 1052L1296 1052L1296 995L1147 995Z"
					id="bottom-box-03"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M884 995L884 1052L1130 1052L1130 995L884 995Z"
					id="bottom-box-02"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M590 995L590 1052L750 1052L750 995L590 995Z"
					id="bottom-box-01"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M750 968L750 926L36 926L36 36L1578 36L1578 926L884 926L884 968L1614 968L1614 0L0 0L0 968L750 968Z"
					id="ring"
					fill="#2D3661"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M59 832L59 908L750 908L750 832L59 832Z"
					id="top-box-01"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M59 699L59 812L511 812L511 699L59 699Z"
					id="top-box-02"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M59 551L59 679L511 679L511 551L59 551Z"
					id="top-box-03"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M59 414L59 531L511 531L511 414L59 414Z"
					id="top-box-04"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M59 56L59 394L511.001 394L511.001 253.961L604 253.96L604 56L59 56Z"
					id="top-box-05"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M1306 55.9995L1306 360L1140 360L1140 254L628 254L627.999 55.9995L1306 55.9995Z"
					id="top-box-06"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M1330 56L1330 292L1552 292L1552 56L1330 56Z"
					id="top-box-07"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M1140 382L1140 570L1306 570L1306 382L1140 382Z"
					id="top-box-08"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M1552 908L1552 908L1140 908L1140 592L1334 592L1334 316L1552 316L1552 908Z"
					id="top-box-09"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M884 832L884 908L1123 908L1123 832L884 832Z"
					id="top-box-10"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
				<path
					d="M583 408L583 772L1073.5 772L1073.5 408L583 408Z"
					id="top-box-info"
					fill="#131320"
					fill-rule="evenodd"
					stroke="none"
				/>
			</g>
		</svg>
	</button>
	{#if mouseEntered}
		<button
			id="btn-add"
			class="absolute"
			style="left: {left}; top: {top}; --fill: #fff"
			transition:scale={{ duration: 333, easing: quintOut }}
		>
			<svg
				width="{BUTTON_ADD_WIDTH}px"
				height="{BUTTON_ADD_HEIGHT}px"
				viewBox="0 0 {BUTTON_ADD_WIDTH} {BUTTON_ADD_HEIGHT}"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<!-- <path d="M57 0L57 0L57 57L0 57L0 0L57 0Z" fill="none" stroke="none"/> -->
					{#if !mouseClicked}
						<path
							d="M41 28C41 28.4496 40.8214 28.8809 40.5035 29.1991C40.1852 29.517 39.754 29.6957 39.3043 29.6957L29.6957 29.6957L29.6957 39.3043C29.6957 39.754 29.517 40.1852 29.1991 40.5035C28.8809 40.8214 28.4496 41 28 41C27.5504 41 27.1191 40.8214 26.8009 40.5035C26.483 40.1852 26.3043 39.754 26.3043 39.3043L26.3043 29.6957L16.6957 29.6957C16.2459 29.6957 15.8146 29.517 15.4967 29.1991C15.1786 28.8809 15 28.4496 15 28C15 27.5504 15.1786 27.1191 15.4967 26.8009C15.8146 26.483 16.2459 26.3043 16.6957 26.3043L26.3043 26.3043L26.3043 16.6957C26.3043 16.2459 26.483 15.8146 26.8009 15.4967C27.1191 15.1786 27.5504 15 28 15C28.4496 15 28.8809 15.1786 29.1991 15.4967C29.517 15.8146 29.6957 16.2459 29.6957 16.6957L29.6957 26.3043L39.3043 26.3043C39.754 26.3043 40.1852 26.483 40.5035 26.8009C40.8214 27.1191 41 27.5504 41 28L41 28Z"
							fill="var(--fill)"
							stroke="none"
						/>
					{:else}
						<path
							d="M41.3781 19.696C41.3779 19.2462 41.1992 18.8149 40.8813 18.497C40.5634 18.1791 40.1321 18.0004 39.6823 18.0002C39.2325 18.0004 38.8012 18.1791 38.4833 18.497L31.6889 25.2914L31.6889 25.2852L31.3354 25.6388L29.6383 27.3358L29.2847 27.6894L29.2909 27.6894L23.692 33.2882L23.689 33.2852L23.689 33.2912L23.689 33.2913L16.8947 26.497C16.5767 26.179 16.1454 26.0003 15.6957 26.0003C15.2458 26.0004 14.8146 26.1791 14.4966 26.497C14.1787 26.8149 14.0001 27.2462 13.9999 27.6961C14 28.1458 14.1787 28.577 14.4966 28.895L21.291 35.6894L21.2847 35.6895L21.6383 36.0431L22.4868 36.8916L23.6889 38.0937L23.689 38.0874L26.0871 35.6894L26.0932 35.6894L26.0901 35.6862L31.6889 30.0874L31.689 30.0937L32.0426 29.7401L32.8911 28.8916L33.7397 28.0431L34.0932 27.6895L34.0869 27.6894L40.8813 20.895C41.1992 20.5771 41.3779 20.1458 41.3781 19.696Z"
							fill="var(--fill)"
							fill-rule="evenodd"
							stroke="none"
							in:draw={{
								duration: 5000,
								delay: 500,
								easing: quintOut,
							}}
						/>
					{/if}
				</g>
			</svg>
		</button>
	{/if}

	<div class="floors">
		{#each arrFloors as attributes (attributes.id)}
			<Floor {attributes} />
		{/each}
	</div>
</div>

<style lang="scss">
	button,
	button:focus {
		outline: none;
	}

	#btn-svg {
		cursor: auto;
	}

	#btn-add {
		left: var(--left);
		top: var(--top);
		translate: -50% calc(-50% + 0.5px);
		pointer-events: none;
		transition: opacity 0.75s ease-in-out;
		// background-color: rgba(#c8b6ff, 0.025);
		// backdrop-filter: blur(10px);
		z-index: 2;
	}

	path {
		transition: all 0.2s ease-in-out forwards;
	}

	path[id]:not(:is(#ring, #bottom-box)):hover {
		cursor: pointer;
		fill: #1a1a2b;
		stroke: #333355;
		stroke-width: 2;
	}

	.floors {
		width: 1614px;
		height: 1214px;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}
</style>
