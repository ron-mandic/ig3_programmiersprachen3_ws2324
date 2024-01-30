<script lang="ts">
	import Sidebar from '$lib/svelte/Sidebar.svelte';
	import PokemonCards from '$lib/svelte/Pokemon/PokemonCards.svelte';
	import {
		searchFor,
		getTypes,
		filterBy,
		getRandom,
		getColors,
		getDict,
		getGrowthRates,
		getDictStages,
		getSortingAlgorithm,
		parseToRoman
	} from '$lib/ts/functions';
	import { typeStore } from '$lib/ts/$store-sidebar-types';
	import { colorStore } from '$lib/ts/$store-sidebar-colors';
	import { growthRateStore } from '$lib/ts/$store-sidebar-growth-rates';
	import { stageStore } from '$lib/ts/$store-sidebar-stages';

	import { storeIsOpen } from '$lib/ts/$store-sidebar';

	export let data: any;
	export let page: any;

	// Props
	let searchValue = $page.url.searchParams.get('search') || '';
	let sortValue: string | null = null;
	let dictTypes: any;
	let dictColors: any;
	let dictGrowthRates: any;
	let dictStages: any;

	const handlers = {
		handleSearchInput(event: any) {
			const target = event.target as HTMLInputElement;
			searchValue = target.value;
		},
		handleTypeChange(event: any) {
			const target = event.target as HTMLInputElement;
			const name = target.dataset.name as string;

			typeStore.set({ ...$typeStore, [name]: target.checked });
		},
		handleColorChange(event: any) {
			const target = event.target as HTMLInputElement;
			const name = target.dataset.name as string;

			colorStore.set({ ...$colorStore, [name]: target.checked });
		},
		handleGrowthRateChange(event: any) {
			const target = event.target as HTMLInputElement;
			const name = target.dataset.name as string;

			growthRateStore.set({ ...$growthRateStore, [name]: target.checked });
		},
		handleStageChange(event: any) {
			const target = event.target as HTMLInputElement;
			const name = target.name as string;
			const value = target.dataset.value as string;
			// @ts-ignore
			stageStore.set({ ...$stageStore, [name]: +value });
		},
		handleSortChange(event: any) {
			const target = event.target as HTMLInputElement;
			sortValue = target.dataset.value as string;
		}
	};

	// Filtering
	$: species =
		sortValue === null
			? filterBy(searchFor(data.body, searchValue), {
					types: $typeStore,
					colors: $colorStore,
					growthRates: $growthRateStore,
					stages: $stageStore
				})
			: filterBy(searchFor(data.body, searchValue), {
					types: $typeStore,
					colors: $colorStore,
					growthRates: $growthRateStore,
					stages: $stageStore
				}).sort(getSortingAlgorithm(sortValue));

	// Updating
	$: if (species || searchValue) {
		dictTypes = getDict(species, 'types', (pokemon, prop) => {
			return pokemon[prop].map(({ type }: any) => type?.name) || null;
		});
		dictColors = getDict(species, 'color', (pokemon, prop) => {
			return pokemon[prop]?.name || null;
		});
		dictGrowthRates = getDict(species, 'growth_rate', (pokemon, prop) => {
			return pokemon[prop]?.name || null;
		});
		dictStages = getDictStages(species);
	}
</script>

<h1 class="translate-y-[250px] pl-6 text-6xl font-bold">
	Generation {$page.params.id}
</h1>
<div class="frame">
	<div class="layout h-full w-full pb-4">
		<aside class:open={$storeIsOpen}>
			<Sidebar
				bind:searchValue
				placeholder={getRandom(data.body)}
				{handlers}
				types={getTypes(data.body)}
				{dictTypes}
				colors={getColors(data.body)}
				{dictColors}
				growthRates={getGrowthRates(data.body)}
				{dictGrowthRates}
				stages={['is_baby', 'is_legendary', 'is_mythical']}
				{dictStages}
			/>
		</aside>
		<section class="relative">
			{#if species?.length === 0}
				<div class="flex h-full items-center justify-center">
					<img
						src="/svg/icon-error.svg"
						alt="Pikachu"
						class="dark-opacity-100 w-1/2 scale-50 opacity-10 dark:invert-0"
					/>
				</div>
			{:else}
				<div class="radio absolute -top-14 right-0 z-10 mr-2">
					<div class="flex h-[46px] w-full items-center mask">
						<label
							class="flex h-full w-full flex-grow cursor-pointer items-center justify-center py-2 pl-5 pr-4"
						>
							<input
								type="radio"
								name="sort"
								data-value="id-asc"
								class="hidden"
								checked={sortValue === null || sortValue === 'id-asc'}
								on:change={handlers.handleSortChange}
							/>
							<span>Highest ID</span>
						</label>
						<label
							class="flex h-full w-full flex-grow cursor-pointer items-center justify-center px-4 py-2"
						>
							<input
								type="radio"
								name="sort"
								data-value="id-desc"
								class="hidden"
								checked={sortValue === 'id-desc'}
								on:change={handlers.handleSortChange}
							/>
							<span>Lowest ID</span>
						</label>
						<label
							class="flex h-full w-full flex-grow cursor-pointer items-center justify-center px-4 py-2"
						>
							<input
								type="radio"
								name="sort"
								data-value="name-asc"
								class="hidden"
								checked={sortValue === 'name-asc'}
								on:change={handlers.handleSortChange}
							/>
							<span>A - Z</span>
						</label>
						<label
							class="flex h-full w-full flex-grow cursor-pointer items-center justify-center py-2 pl-4 pr-5"
						>
							<input
								type="radio"
								name="sort"
								data-value="name-desc"
								class="hidden"
								checked={sortValue === 'name-desc'}
								on:change={handlers.handleSortChange}
							/>
							<span>Z - A</span>
						</label>
					</div>
				</div>
				<PokemonCards {species} {searchValue} {sortValue} />
			{/if}
		</section>
	</div>
</div>

<style lang="scss">
	h1 {
		position: relative;
		font-size: 290%;
		max-width: 100%;

		&::before {
			content: attr(data-roman);
			position: absolute;
			bottom: -6rem;
			left: 2rem;
			font-size: 150%;
			opacity: 0.12;
		}
	}

	.layout {
		--flex-basis: clamp(350px, 25%, 400px);
		margin-top: clamp(500px, 20vh, 70svh);
		padding: 0.675rem 0.675rem 10rem 0.675rem;
	}

	aside {
		display: block;
		position: fixed;
		top: calc(100px - 0.175rem);
		left: 0.5rem;
		width: min(90vw, 400px);
		height: calc(100svh - 100px + 0.175rem);
		padding: 0.675rem 1rem 0.375rem 0;
		transform: translateX(-100%);
		transition: transform 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);
		min-width: 320px;
		z-index: 999;

		&.open {
			transform: translateX(0);
			transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}
	}

	section {
		flex: 0 0 calc(100% - var(--flex-basis));
		padding-top: 0.2rem;
		perspective: 100vh;
	}

	input[type='radio'] {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}

	.radio label {
		transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);

		--background-color: #00000027;

		&:hover {
			background-color: var(--background-color);
		}

		&:has(input:checked) {
			background-color: var(--background-color);
			color: var(--color);
		}
	}

	.radio {
		width: calc(100vw - 2.25rem);
		& > div {
			border-radius: 15rem;
			border: 2px solid #00000009;
		}
		label {
			width: max-content;
			font-size: 85%;
		}
	}

	.radio span {
		font-weight: 700;
	}

	@media only screen and (min-width: 321px) {
		.radio label {
			font-size: 64%;
		}
	}

	@media only screen and (min-width: 440px) {
		.radio label {
			font-size: 94%;
		}
	}

	@media only screen and (min-width: 549px) {
		h1 {
			font-size: 4rem;
		}
		.radio {
			width: auto;
			label {
				font-size: 100%;
			}
		}
	}

	@media only screen and (min-width: 1052px) {
		.layout {
			width: 100%;
			display: flex;

			aside {
				display: block;
				position: sticky;
				top: 100px;
				left: 0;
				width: 320px;
				transform: translateX(0) !important;
				height: calc(100svh - 100px);
				flex: 0 0 var(--flex-basis);
				padding: 0.675rem 1rem 0.675rem 0;
				z-index: 2;
				min-width: unset;
			}
		}
	}

	// prefers-color-scheme
	@media (prefers-color-scheme: dark) {
		.radio label {
			--background-color: #ffffff18;
		}

		.radio {
			& > div {
				border: 2px solid #ffffff0e;
			}
		}
	}
</style>
