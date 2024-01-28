<script lang="ts">
	import {
		delay,
		formatHeight,
		formatId,
		formatName,
		formatWeight,
		toCapitalized,
		random,
		formatSearch,
		isId,
		Store
	} from '$lib/ts/functions';
	import { fly, blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Loader from '../Loader.svelte';
	import { typeStore } from '$lib/ts/$store-sidebar-types';
	import { colorStore } from '$lib/ts/$store-sidebar-colors';
	import { growthRateStore } from '$lib/ts/$store-sidebar-growth-rates';
	import { stageStore } from '$lib/ts/$store-sidebar-stages';

	export let pokemon: any;
	export let value: string;
</script>

{#if !value && Store.isAllChecked($typeStore) && Store.isAllChecked($colorStore) && Store.isAllChecked($growthRateStore) && Store.isAll($stageStore, -1)}
	{#await delay(random(250, 1250), pokemon)}
		<div
			class="card absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 mask"
			transition:blur={{ amount: 5 }}
		>
			<div class="card__body items-between relative flex h-full w-full flex-col justify-center">
				<div class="cb__top relative">
					<div class="cbt__image relative flex h-full w-full items-center justify-center">
						<Loader />
					</div>
				</div>
				<div class="cb__bottom">
					<div class="cbb__layout h-full w-full">
						<div class="cbb__head">
							<div class="skeleton small"></div>
							<div class="skeleton h2"></div>
						</div>
						<div class="cbb__body"></div>
					</div>
				</div>
			</div>
		</div>
	{:then { name, id, sprites, height, weight, stats, types }}
		<div
			class="card z-1000 relative h-full w-full mask"
			transition:fly={{
				delay: random(250, 500),
				duration: 500,
				x: 0,
				y: random(20, 50),
				easing: quintOut
			}}
		>
			<div class="ch__hp flex items-center justify-center">
				<p><span>HP</span><span>{stats[0].base_stat}</span></p>
			</div>
			<div class="card__body items-between relative flex h-full w-full flex-col justify-center">
				<div class="cb__top relative">
					<div class="cbt__image relative h-full w-full">
						{#if sprites.other['official-artwork']}
							{@const srcFrontDefault = sprites.other['official-artwork'].front_default}
							{@const srcFrontShiny = sprites.other['official-artwork'].front_shiny}

							{#if srcFrontDefault === null && srcFrontShiny === null}
								<img
									class="dark-opacity-100 absolute w-1/2 scale-50 opacity-10 dark:invert-0"
									src="/svg/icon-error.svg"
									alt={id}
								/>
							{:else if srcFrontDefault === null && srcFrontShiny}
								<img class="absolute scale-90" src={srcFrontShiny} alt={id} />
							{:else}
								<img class="absolute scale-90" src={srcFrontDefault} alt={id} />
							{/if}
						{/if}
					</div>
					<div class="cbt__types">
						{#each types as { type }, i}
							<div class="type {type.name}" style:--z-index={types.length - i}></div>
						{/each}
					</div>
				</div>
				<div class="cb__bottom">
					<div class="cbb__layout h-full w-full">
						<div class="cbb__head">
							<small
								>{#if isId(value)}
									{@html formatSearch(formatId(id), value)}
								{:else}
									{formatId(id)}
								{/if}</small
							>
							<h2 class="relative" class:m={name.endsWith('-m')} class:f={name.endsWith('-f')}>
								{#if !isId(value)}
									{@html formatSearch(formatName(toCapitalized(name)), value)}
								{:else}
									{formatName(toCapitalized(name))}
								{/if}
							</h2>
						</div>
						<div class="cbb__body">
							<div class="row">
								<div class="col">
									<h3 class="cbbb__head">Height</h3>
									<p class="cbbb__body">{formatHeight(height)}</p>
								</div>
								<div class="col">
									<h3 class="cbbb__head">Attack</h3>
									<p class="cbbb__body">{stats[1]['base_stat']}</p>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<h3 class="cbbb__head">Weight</h3>
									<p class="cbbb__body">{formatWeight(weight)}</p>
								</div>
								<div class="col">
									<h3 class="cbbb__head">Defense</h3>
									<p class="cbbb__body">{stats[2]['base_stat']}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:catch error}
		<div class="card relative h-full w-full mask">
			<div class="card__body items-between relative flex h-full w-full flex-col justify-center">
				<div class="cb__top relative">
					<div class="cbt__image relative flex h-full w-full items-center justify-center">
						<img
							class="absolute scale-50 opacity-5 invert-0 dark:opacity-30"
							src="/svg/icon-error.svg"
							alt="Error"
						/>
					</div>
				</div>
				<div class="cb__bottom">
					<div class="cbb__layout h-full w-full">
						<div class="cbb__body">
							<div class="row">
								<div class="col">
									<h3 class="cbbb__head">Pika-pi?</h3>
									<p class="cbbb__body" style="margin-top: 7%;">{error.message}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/await}
{:else}
	{@const { name, id, sprites, height, weight, stats, types } = pokemon}

	<div class="card z-1000 relative h-full w-full mask">
		<div class="ch__hp flex items-center justify-center">
			<p><span>HP</span><span>{stats[0].base_stat}</span></p>
		</div>
		<div class="card__body items-between relative flex h-full w-full flex-col justify-center">
			<div class="cb__top relative">
				<div class="cbt__image relative h-full w-full">
					{#if sprites.other['official-artwork']}
						{@const srcFrontDefault = sprites.other['official-artwork'].front_default}
						{@const srcFrontShiny = sprites.other['official-artwork'].front_shiny}

						{#if srcFrontDefault === null && srcFrontShiny === null}
							<img
								class="dark-opacity-100 absolute w-1/2 scale-50 opacity-10 dark:invert-0"
								src="/svg/icon-error.svg"
								alt={id}
							/>
						{:else if srcFrontDefault === null && srcFrontShiny}
							<img class="absolute scale-90" src={srcFrontShiny} alt={id} />
						{:else}
							<img class="absolute scale-90" src={srcFrontDefault} alt={id} />
						{/if}
					{/if}
				</div>
				<div class="cbt__types">
					{#each types as { type }, i}
						<div class="type {type.name}" style:--z-index={types.length - i}></div>
					{/each}
				</div>
			</div>
			<div class="cb__bottom">
				<div class="cbb__layout h-full w-full">
					<div class="cbb__head">
						<small
							>{#if isId(value)}
								{@html formatSearch(formatId(id), value)}
							{:else}
								{formatId(id)}
							{/if}</small
						>
						<h2 class="relative" class:m={name.endsWith('-m')} class:f={name.endsWith('-f')}>
							{#if !isId(value)}
								{@html formatSearch(formatName(toCapitalized(name)), value)}
							{:else}
								{formatName(toCapitalized(name))}
							{/if}
						</h2>
					</div>
					<div class="cbb__body">
						<div class="row">
							<div class="col">
								<h3 class="cbbb__head">Height</h3>
								<p class="cbbb__body">{formatHeight(height)}</p>
							</div>
							<div class="col">
								<h3 class="cbbb__head">Attack</h3>
								<p class="cbbb__body">{stats[1]['base_stat']}</p>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<h3 class="cbbb__head">Weight</h3>
								<p class="cbbb__body">{formatWeight(weight)}</p>
							</div>
							<div class="col">
								<h3 class="cbbb__head">Defense</h3>
								<p class="cbbb__body">{stats[2]['base_stat']}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.skeleton {
		border-radius: 1rem;
		animation: skeleton-light 1s linear infinite alternate;
	}

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
		border: 0.175rem solid transparent;
		background: linear-gradient(0deg, var(--bg-color__01), var(--bg-color__01)),
			linear-gradient(207deg, var(--border-color__start), var(--border-color__end));
		background-clip: padding-box, border-box;
		background-origin: padding-box, border-box;

		container: card / inline-size;
	}

	.ch__hp {
		--color__01: #b9b9ca;
		--color__02: #f0f0f4;
		--color__03: #9c9cb4;

		position: absolute;
		top: -2px;
		left: -2px;
		padding: 0 6% 0 4%;
		aspect-ratio: 2 / 1;
		z-index: 99;
		background-color: var(--color__01);
		background-image: linear-gradient(180deg, var(--color__02), var(--color__01));
		border-top: 0.125rem solid var(--color__02);
		border-right: 0.125rem solid var(--color__02);
		border-left: 0.125rem solid var(--color__03);
		border-bottom: 0.125rem solid var(--color__03);
		border-radius: 0 0 25% 0;
		user-select: none;

		span {
			color: var(--text-color__name);
		}

		span:nth-child(1) {
			font-size: 0.65em;
			font-weight: 400;
			margin-bottom: 0.5%;
		}

		span:nth-child(2) {
			font-size: 1.125em;
			padding-left: 10%;
			font-weight: 700;
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
			position: relative;
			line-height: 1;
			font-size: 1em;
			margin-top: -1.5%;
			width: fit-content;

			&.m::after {
				content: url('/svg/icon-male.svg');
				left: 110%;
				transform: translate(-50%, -35%);
				margin-left: 15%;
				width: fit-content;
			}

			&.f::after {
				content: url('/svg/icon-female.svg');
				left: 118%;
				transform: translate(-50%, -30%);
				margin-left: 4%;
				width: fit-content;
			}

			&.m::after,
			&.f::after {
				position: absolute;
				top: 50%;
				scale: 1;
				margin-top: -4%;
			}
		}

		.skeleton.small {
			width: 21%;
			aspect-ratio: 44 / 16;
			margin: 5% 0 2%;
		}

		.skeleton.h2 {
			width: 56%;
			aspect-ratio: 102 / 16;
			margin: 2% 0 2%;
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
			padding: 2.37% 2.37% 0 2.37%;
		}

		.cbt__image {
			background-color: var(--bg-color__02);
			border-radius: calc(1.5rem - 0.5rem);
			user-select: none;

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

		.cbt__types {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			position: absolute;
			left: 50%;
			bottom: -12%;
			translate: -49% 0;
			width: calc(100% - 4%);
			height: 26%;
			// padding: 8% 8% 8% 8%;
			z-index: 99;

			.type {
				aspect-ratio: 1 / 1;
				width: auto;
				height: 100%;
				border-radius: 100%;
				border: 0.2em solid var(--bg-color__01);
				z-index: var(--z-index);

				&:not(:last-child) {
					margin-right: -4%;
				}

				&.bug {
					background: url('/svg/icon-type-bug.svg') no-repeat center center / cover;
				}
				&.dark {
					background: url('/svg/icon-type-dark.svg') no-repeat center center / cover;
				}
				&.dragon {
					background: url('/svg/icon-type-dragon.svg') no-repeat center center / cover;
				}
				&.electric {
					background: url('/svg/icon-type-electric.svg') no-repeat center center / cover;
				}
				&.fairy {
					background: url('/svg/icon-type-fairy.svg') no-repeat center center / cover;
				}
				&.fighting {
					background: url('/svg/icon-type-fighting.svg') no-repeat center center / cover;
				}
				&.fire {
					background: url('/svg/icon-type-fire.svg') no-repeat center center / cover;
				}
				&.flying {
					background: url('/svg/icon-type-flying.svg') no-repeat center center / cover;
				}
				&.ghost {
					background: url('/svg/icon-type-ghost.svg') no-repeat center center / cover;
				}
				&.grass {
					background: url('/svg/icon-type-grass.svg') no-repeat center center / cover;
				}
				&.ground {
					background: url('/svg/icon-type-ground.svg') no-repeat center center / cover;
				}
				&.ice {
					background: url('/svg/icon-type-ice.svg') no-repeat center center / cover;
				}
				&.normal {
					background: url('/svg/icon-type-normal.svg') no-repeat center center / cover;
				}
				&.poison {
					background: url('/svg/icon-type-poison.svg') no-repeat center center / cover;
				}
				&.psychic {
					background: url('/svg/icon-type-psychic.svg') no-repeat center center / cover;
				}
				&.rock {
					background: url('/svg/icon-type-rock.svg') no-repeat center center / cover;
				}
				&.steel {
					background: url('/svg/icon-type-steel.svg') no-repeat center center / cover;
				}
				&.water {
					background: url('/svg/icon-type-water.svg') no-repeat center center / cover;
				}
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
		.skeleton {
			animation: skeleton-dark 1s linear infinite alternate;
		}

		.card {
			--bg-color__01: #353446;
			--bg-color__02: #2c2b3b;
			--border-color__start: #595775;
			--border-color__end: #59577500;

			--text-color__id: #bab9cb;
			--text-color__name: #eeedf2;
			--text-color__labels: #0d0d114d;
		}

		.ch__hp {
			--color__01: #54536f;
			--color__02: #6a688c;
			--color__03: #2a2938;

			span {
				color: var(--text-color__name);
				font-weight: 600;
			}
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

	@media screen and (min-width: 321px) and (max-width: 463px) {
		.card {
			$font-size: 7.5cqw;
			font-size: clamp(24px, $font-size, 35.49px);
		}
	}

	@media screen and (min-width: 464px) and (max-width: 684px) {
		.card {
			$font-size: 3.9cqw;
			font-size: clamp(17.7px, $font-size, 26.64px);
		}
	}

	@media screen and (min-width: 685px) and (max-width: 905px) {
		.card {
			$font-size: 2.6cqw;
			font-size: clamp(17.7px, $font-size, 23.66px);
		}
	}

	@media screen and (min-width: 906px) and (max-width: 1051px) {
		.card {
			$font-size: 1.95cqw;
			font-size: clamp(17.7px, $font-size, 20.6px);
		}
	}

	@media screen and (min-width: 1052px) and (max-width: 1255px) {
		.card {
			$font-size: 1.8cqw;
			font-size: clamp(18.13px, $font-size, 23.66px);
		}
	}

	@media screen and (min-width: 1256px) and (max-width: 1494px) {
		.card {
			$font-size: 1.445cqw;
			font-size: clamp(17.7px, $font-size, 22.13px);
		}
	}

	@media screen and (min-width: 1495px) and (max-width: 1747px) {
		.card {
			$font-size: 1.2025cqw;
			font-size: clamp(17.7px, $font-size, 21.28px);
		}
	}

	@media screen and (min-width: 1748px) and (max-width: 1920px) {
		.card {
			$font-size: 1.0375cqw;
			font-size: clamp(17.7px, $font-size, 20px);
		}
	}

	@media screen and (min-width: 1921px) {
		.card {
			font-size: 20px;
		}
	}

	@keyframes skeleton-light {
		0% {
			background-color: hsl(240, 14%, 85%);
		}
		100% {
			background-color: hsl(240, 14%, 80%);
		}
	}

	@keyframes skeleton-dark {
		0% {
			background-color: hsl(240, 14%, 30%);
		}
		100% {
			background-color: hsl(240, 14%, 46%);
		}
	}
</style>
