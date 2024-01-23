<script lang="ts">
	import Card from '$lib/svelte/Card.svelte';
	import Footer from '$lib/svelte/Footer.svelte';
	import type { PageServerData } from './$types';
	import { createTypeStore } from '$lib/ts/store-type';
	import * as Accordion from '$lib/components/ui/accordion';
	import { toCapitalized } from '$lib/ts/functions';

	export let data: PageServerData;

	const typeStore = createTypeStore();
	console.log(Object.keys($typeStore));

	function isAnyChecked() {
		return Object.values($typeStore).some((value) => value);
	}

	function handleChange(event: Event) {
		const currentTarget = event.currentTarget as HTMLInputElement;

		const { checked } = currentTarget;
		const name = currentTarget.dataset.name!;

		typeStore.change(name, checked);
		console.log(isAnyChecked());
	}
</script>

<div class="frame">
	<div class="layout h-full w-full pb-4">
		<aside>
			<div class="sidebar mask">
				<div class="head sticky left-0 top-0 w-full">
					<h2 class="p-3 text-3xl font-bold">Filter</h2>
				</div>
				<div class="body mt-3">
					<div class="sidebar-layout mb-4 h-auto px-4 py-1">
						<h3 class="py-4 text-xl font-semibold">Search</h3>
					</div>
					<div class="sidebar-layout mb-4 h-auto px-4 py-1">
						<Accordion.Root>
							<Accordion.Item value="types">
								<Accordion.Trigger class="text-xl font-semibold"
									><h3>
										Types {#if $typeStore && isAnyChecked()}
											<span class="text-xl font-semibold opacity-70"
												>({Object.entries($typeStore).filter(([key, value]) => value).length})</span
											>
										{/if}
									</h3>
								</Accordion.Trigger>
								<Accordion.Content>
									<div class="checkboxes flex h-auto w-full flex-col gap-2 px-2 py-2">
										{#each Object.entries($typeStore) as [key, value]}
											<label class="flex cursor-pointer items-center justify-start p-2 {key}">
												<img class="scale-125" src="/svg/icon-type-{key}.svg" alt={key} />
												<span class="ml-4 text-lg font-semibold">{toCapitalized(key)}</span>
												<input
													checked={value}
													type="checkbox"
													name="type"
													data-name={key}
													on:change={handleChange}
												/>
											</label>
										{/each}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					</div>
				</div>
			</div>
		</aside>
		<section>
			{#await data.body then { results }}
				<div class="pokemon relative grid" data-length={results.length}>
					{#each results as result}
						<div class="card-wrapper flex items-center justify-center">
							<Card {result} />
						</div>
					{/each}
				</div>
			{:catch _}
				<div class="pokemon error mt-2 flex w-full items-center justify-center">
					<div class="flex flex-col items-center justify-center">
						<img
							class="scale-50 opacity-5 invert-0 dark:opacity-30"
							src="/svg/icon-error.svg"
							alt="Pika-pi?"
						/>
					</div>
				</div>
			{/await}
		</section>
	</div>
</div>

<Footer />

<style lang="scss">
	.layout {
		--flex-basis: clamp(350px, 25%, 400px);
		margin-top: clamp(500px, 20vh, 70svh);
		padding: 0.675rem 0.675rem 10rem 0.675rem;

		aside {
			display: none; // TODO: Make responsive and mobile friendly
			position: fixed;
			top: calc(100px - 0.175rem);
			left: 0.5rem;
			width: min(90vw, 400px);
			height: calc(100svh - 100px + 0.175rem);
			padding: 0.675rem 1rem 0.375rem 0;
			z-index: 999;
		}

		section {
			flex: 0 0 calc(100% - var(--flex-basis));
			padding-top: 0.2rem;
			perspective: 100vh;
		}
	}

	.sidebar {
		--bg-color: hsl(240, 14%, 90%);
		--bg-color__sidebar: hsl(240, 14%, 87%);

		width: 100%;
		height: 100%;
		position: sticky;
		top: 100px;
		border-radius: 1.5rem;
		background-color: var(--bg-color);
		overflow-x: hidden;
		overflow-y: auto;

		.sidebar-layout {
			width: 100%;
			border-radius: calc(1.5rem - 0.675rem);
			background-color: var(--bg-color__sidebar);
		}
	}

	.head {
		--bg-color: hsla(240, 14%, 90%, 0.3);
		--border-bottom-color: #0a0a0f10;

		background-color: var(--bg-color);
		backdrop-filter: blur(50px);
		border-bottom: 0.125rem solid var(--border-bottom-color);
		z-index: 999;
		padding: 0.675rem;
	}

	.body {
		padding: 0.675rem;
	}

	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}

	.checkboxes label {
		border-radius: 10rem;
		transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);

		--background-color: #ffffff18;

		&:hover {
			background-color: var(--background-color);
		}

		&:has(input:checked) {
			background-color: var(--background-color);
			color: var(--color);
			outline: 3px solid var(--color);
		}

		// TODO: Complete all colors including themes
		// &.bug {
		// 	--background-color: #4e5634;
		// 	--color: #a5c432;
		// }
	}

	.pokemon {
		grid-template-columns: repeat(auto-fill, minmax(221px, auto));

		&.error {
			height: calc(100% - 1.125rem);
		}

		&::after {
			content: attr(data-length) ' Pokémon';
			position: absolute;
			top: -1.5rem;
			left: 0.5rem;
			translate: 0 -50%;
			width: fit-content;
			height: fit-content;
			font-weight: bold;
			font-size: 1.25rem;
		}

		.card-wrapper {
			aspect-ratio: 221 / 312;
			min-width: 221px;
			min-height: 312px;
			display: flex;
			justify-content: center;
			align-items: center;
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
				height: calc(100svh - 100px);
				flex: 0 0 var(--flex-basis);
				padding: 0.675rem 1rem 0.675rem 0;
				z-index: 998;
			}
		}

		.sidebar {
			height: calc(100svh - 100px - 1.275rem); // 1rem for optical correction
		}
	}

	@media (prefers-color-scheme: dark) {
		.sidebar {
			--bg-color: hsl(244, 16%, 15%);
			--bg-color__sidebar: hsl(244, 16%, 18%);
		}

		.head {
			--bg-color: hsla(245, 16%, 15%, 0.3);
			--border-bottom-color: #f0f0f510;
		}
	}
</style>
