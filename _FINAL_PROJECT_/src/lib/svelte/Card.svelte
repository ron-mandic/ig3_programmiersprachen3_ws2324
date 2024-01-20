<script lang="ts">
	import { onMount } from 'svelte';
	import Indicator from './Indicator.svelte';
	import {
		delay,
		formatHeight,
		formatId,
		formatWeight,
		random,
		toCapitalized
	} from '$lib/ts/functions';
	import { fly } from 'svelte/transition';
	import * as Transition from 'svelte/easing';
	export let result: any;

	let data: any;
	let rendered = false;

	onMount(async () => {
		const res = await fetch(result.url);
		await delay(random(1000, 2000));
		data = res.json();
		rendered = true;
	});

	let w, h;
</script>

{#if rendered}
	{#await data}
		<div class="card w-full h-full mask">
			<Indicator />
		</div>
	{:then { name, id, sprites, height, weight, stats }}
		<div
			class="card relative w-full h-full mask"
			bind:clientWidth={w}
			bind:clientHeight={h}
			in:fly={{
				delay: random(250, 500),
				duration: 500,
				x: 0,
				y: 200,
				easing: Transition.quintOut
			}}
		>
			<div class="ch__hp flex items-center justify-center">
				<span>{stats[0].base_stat}</span>
			</div>
			<div class="card__body relative w-full h-full flex items-between justify-center flex-col">
				<div class="cb__top">
					<div class="cbt__image relative w-full h-full">
						<img class="absolute" src={sprites.other['official-artwork'].front_default} alt={id} />
					</div>
				</div>
				<div class="cb__bottom">
					<div class="cbb__layout w-full h-full">
						<div class="cbb__head">
							<small>{formatId(id)}</small>
							<h2>{toCapitalized(name)}</h2>
						</div>
						<div class="cbb__body">
							<div class="row">
								<div class="col">
									<h3 class="cbbb__head">Größe</h3>
									<p class="cbbb__body">{formatHeight(height)}</p>
								</div>
								<div class="col">
									<h3 class="cbbb__head">Attacke</h3>
									<p class="cbbb__body">{stats[1]['base_stat']}</p>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<h3 class="cbbb__head">Gewicht</h3>
									<p class="cbbb__body">{formatWeight(weight)}</p>
								</div>
								<div class="col">
									<h3 class="cbbb__head">Defensive</h3>
									<p class="cbbb__body">{stats[2]['base_stat']}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
{:else}
	<div class="card flex items-center justify-center w-full h-full mask">
		<Indicator />
	</div>
{/if}

<style lang="scss">
	@use 'sass:math';

	.card {
		--bg-color__01: #e2e2e9;
		--bg-color__02: #d6d6e0;
		--border-color__start: #c8c8d5;
		--border-color__end: #c8c8d500;
		--text-color__id: #e2e2e9;
		--text-color__name: #0d0d11;
		--text-color__labels: #0d0d114d;

		flex-shrink: 0;
		width: 95%;
		height: 95%;

		border-radius: 1.5rem;
		background-color: var(--bg-color); // #353446

		// Credits: https://stackoverflow.com/a/69574606
		border: 0.1rem solid transparent;
		background: linear-gradient(0deg, var(--bg-color__01), var(--bg-color__01)),
			linear-gradient(207deg, var(--border-color__start), var(--border-color__end));
		background-clip: padding-box, border-box;
		background-origin: padding-box, border-box;
	}

	.ch__hp {
		--color__01: #b9b9ca;
		--color__02: #f0f0f4;
		--color__03: #9c9cb4;

		position: absolute;
		top: -2px;
		left: -2px;
		width: 20%;
		aspect-ratio: 1 / 1;
		z-index: 99;
		background-color: var(--color__01);
		background-image: linear-gradient(180deg, var(--color__02), var(--color__01));
		border-top: 0.125rem solid var(--color__02);
		border-right: 0.125rem solid var(--color__02);
		border-left: 0.125rem solid var(--color__03);
		border-bottom: 0.125rem solid var(--color__03);
		border-radius: 0 0 25% 0;

		span {
			font-size: 0.975em;
			font-weight: 700;
			color: var(--text-color__name);
		}
	}

	.card__body {
		small,
		h3,
		p {
			line-height: 1;
			font-size: 0.75em;
		}

		h2 {
			line-height: 1;
			font-size: 1em;
			margin-top: -1.5%;
		}

		h2,
		h3,
		small,
		p {
			font-weight: 700;
		}

		img {
			position: absolute;
			aspect-ratio: 1 / 1;
		}

		small {
			color: #4b4b63;
		}

		h2 {
			color: #0d0d11;
		}

		h3 {
			color: #8d8d93;
		}

		p {
			color: #4b4b63;
		}

		.cb__top,
		.cb__bottom {
			width: 100%;
			height: 50%;
			max-height: 50%;
			flex-grow: 0;
		}

		.cb__top {
			padding: 3.37% 3.37% 0 3.37%;
		}

		.cbt__image {
			background-color: var(--bg-color__02);
			border-radius: calc(1.5rem - 0.5rem);

			img {
				position: absolute;
				top: 50%;
				left: 50%;
				translate: -50% -47.5%;
				width: 85%;
				height: auto;
				z-index: 99;
			}
		}

		// ####

		.cb__bottom {
			padding: 0 6.75% 3.37% 6.75%;
		}

		.cbb__layout {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 30% 1fr;
		}

		.cbb__body {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			margin-top: auto;
			grid-gap: 7%;
			height: 82%;

			.row {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr;

				.col h3 {
					margin-bottom: 4%;
				}
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.card {
			--bg-color__01: #353446;
			--bg-color__02: #2c2b3b;
			--border-color__start: #595775;
			--border-color__end: #59577500;
		}

		.cb__top {
			--text-color__id: #bab9cb;
			--text-color__name: #eeedf2;
			--text-color__labels: #0d0d114d;
		}

		.card__body {
			small {
				color: #bab9cb;
			}

			h2 {
				color: #eeedf2;
			}

			h3 {
				color: #6a697b;
			}

			p {
				color: #bab9cb;
			}
		}
	}

	/**
	    innerWidth, clientWidth

		321px, 282px
		463px, 417px

		464px, 208px
		684px, 313px

		685px, 208px
		905px, 278px

		906px, 208px
		1051px, 242px

		1052px, 213px
		1255px, 278px
	
		1256px, 208px
		1494px, 260px
	
		1495px, 208px
		1747px, 250px

		1748px, 208px
		1920px, 235px

		1920px, 235px

	*/

	@media screen and (min-width: 321px) and (max-width: 463px) {
		.card {
			$font-size: 7.5cqw;

			font-size: clamp(24px, $font-size, 35.49px);
			// small {
			// 	font-size: clamp(18px, $font-size, 26.62px);
			// }
		}
	}

	@media screen and (min-width: 464px) and (max-width: 684px) {
		.card {
			$font-size: 3.9cqw;

			font-size: clamp(17.7px, $font-size, 26.64px);
			// small {
			// 	font-size: clamp(13.28px, auto, 19.98px);
			// }
		}
	}

	@media screen and (min-width: 685px) and (max-width: 905px) {
		.card {
			$font-size: 2.6cqw;

			font-size: clamp(17.7px, $font-size, 23.66px);
			// small {
			// 	font-size: clamp(13.28px, auto, 17.74px);
			// }
		}
	}

	@media screen and (min-width: 906px) and (max-width: 1051px) {
		.card {
			$font-size: 1.95cqw;

			font-size: clamp(17.7px, $font-size, 20.6px);
			// small {
			// 	font-size: clamp(13.28px, auto, 15.45px);
			// }
		}
	}

	@media screen and (min-width: 1052px) and (max-width: 1255px) {
		.card {
			$font-size: 1.8cqw;

			font-size: clamp(18.13px, $font-size, 23.66px);
			// small {
			// 	font-size: clamp(14px, auto, 17.74px);
			// }
		}
	}

	@media screen and (min-width: 1256px) and (max-width: 1494px) {
		.card {
			$font-size: 1.445cqw;

			font-size: clamp(17.7px, $font-size, 22.13px);

			// small {
			// 	font-size: clamp(13.28px, auto, 16.6px);
			// }
		}
	}

	@media screen and (min-width: 1495px) and (max-width: 1747px) {
		.card {
			$font-size: 1.2025cqw;

			font-size: clamp(17.7px, $font-size, 21.28px);
			// small {
			// 	font-size: clamp(13.28px, auto, 15.96px);
			// }
		}
	}

	@media screen and (min-width: 1748px) and (max-width: 1920px) {
		.card {
			$font-size: 1.0375cqw;

			font-size: clamp(17.7px, $font-size, 20px);
			// small {
			// 	font-size: clamp(13.28px, auto, 15px);
			// }
		}
	}

	@media screen and (min-width: 1921px) {
		.card {
			font-size: 20px;
			// small {
			// 	font-size: 15px;
			// }
		}
	}
</style>
