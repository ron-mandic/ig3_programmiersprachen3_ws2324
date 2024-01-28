<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Store, formatGrowthRate, formatName, toCapitalized } from '$lib/ts/functions';
	import { typeStore } from '$lib/ts/$store-sidebar-types';
	import { colorStore } from '$lib/ts/$store-sidebar-colors';
	import { growthRateStore } from '$lib/ts/$store-sidebar-growth-rates';
	import { onMount } from 'svelte';

	export let value: string;
	export let handlers: any;
	export let placeholder: any = 'Name or ID';

	export let types: any;
	export let dictTypes: any;
	export let colors: any;
	export let dictColors: any;
	export let growthRates: any;
	export let dictGrowthRates: any;

	onMount(() => {
		typeStore.set(Store.init(types));
		colorStore.set(Store.init(colors));
		growthRateStore.set(Store.init(growthRates));
	});
</script>

<div class="sidebar mask">
	<div class="head sticky left-0 top-0 w-full">
		<h2 class="p-3 text-3xl font-bold">Search</h2>
		<input
			id="sidebar-search"
			type="text"
			name="name"
			placeholder={`${formatName(toCapitalized(placeholder.name))} or ${placeholder.id}`}
			class="mb-1 h-full w-full bg-transparent px-4 py-4 placeholder:opacity-60"
			bind:value
			on:input={handlers.handleSearchInput}
		/>
	</div>
	<div class="body">
		<div class="sidebar-layout mb-4 mt-3 h-auto px-4 py-1">
			<Accordion.Root>
				<Accordion.Item value="types">
					<Accordion.Trigger class="text-xl font-semibold"
						><h3 class="relative w-full text-left">
							Types
							<span
								class="absolute right-2 top-1/2 min-w-[50%] max-w-[65%] -translate-y-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right text-base font-normal opacity-50"
								>{Store.getCheckedCount($typeStore)
									? Store.toString($typeStore)
									: 'Please select type'}</span
							>
						</h3></Accordion.Trigger
					>
					<Accordion.Content>
						<div class="checkboxes flex h-auto w-full flex-col gap-2 px-1 py-1">
							{#each Object.entries($typeStore) as [name, checked]}
								<label
									class="flex cursor-pointer items-center justify-between p-2 pr-4 {dictTypes[name]
										? 'opacity-100'
										: 'opacity-30'} {name}"
								>
									<div class="flex items-center justify-center">
										<img class="z-1 scale-125" src="/svg/icon-type-{name}.svg" alt={name} />
										<p class="ml-4 text-lg font-semibold">
											{toCapitalized(name)}
										</p>
									</div>
									<span class="text-right text-base font-normal opacity-50"
										>{dictTypes[name] || 0}</span
									>
									<input
										type="checkbox"
										name="type"
										class="hidden"
										data-name={name}
										{checked}
										on:change={handlers.handleTypeChange}
									/>
								</label>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>

		<div class="sidebar-layout mb-4 h-auto px-4 py-1">
			<Accordion.Root>
				<Accordion.Item value="colors">
					<Accordion.Trigger class="text-xl font-semibold"
						><h3 class="relative w-full text-left">
							Colors
							<span
								class="absolute right-2 top-1/2 min-w-[50%] max-w-[65%] -translate-y-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right text-base font-normal opacity-50"
								>{Store.getCheckedCount($colorStore)
									? Store.toString($colorStore)
									: 'Please select color'}</span
							>
						</h3></Accordion.Trigger
					>
					<Accordion.Content>
						<div class="checkboxes flex h-auto w-full flex-col gap-2 px-1 py-1">
							{#each Object.entries($colorStore) as [name, checked]}
								<label
									class="flex cursor-pointer items-center justify-between p-2 pr-4 {dictColors[name]
										? 'opacity-100'
										: 'opacity-30'} {name}"
								>
									<div class="flex items-center justify-center">
										<img class="z-1 scale-125" src="/svg/icon-color-{name}.svg" alt={name} />
										<p class="ml-4 text-lg font-semibold">
											{toCapitalized(name)}
										</p>
									</div>
									<span class="text-right text-base font-normal opacity-50"
										>{dictColors[name] || 0}</span
									>
									<input
										type="checkbox"
										name="color"
										class="hidden"
										data-name={name}
										{checked}
										on:change={handlers.handleColorChange}
									/>
								</label>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>

		<div class="sidebar-layout h-auto px-4 py-1">
			<Accordion.Root>
				<Accordion.Item value="growth-rate">
					<Accordion.Trigger class="text-xl font-semibold"
						><h3 class="relative w-full text-left">
							Growth rates
							<span
								class="absolute right-2 top-1/2 min-w-[30%] max-w-[45%] -translate-y-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right text-base font-normal opacity-50"
								>{Store.getCheckedCount($growthRateStore)
									? Store.toString($growthRateStore, formatGrowthRate)
									: 'Please select rate'}</span
							>
						</h3></Accordion.Trigger
					>
					<Accordion.Content>
						<div class="checkboxes flex h-auto w-full flex-col gap-2 px-1 py-1">
							{#each Object.entries($growthRateStore) as [name, checked]}
								<label
									class="flex cursor-pointer items-center justify-between p-2 pr-4 {dictGrowthRates[
										name
									]
										? 'opacity-100'
										: 'opacity-30'} {name}"
								>
									<div class="flex items-center justify-center">
										<img class="z-1 scale-125" src="/svg/icon-growth-rate-{name}.svg" alt={name} />
										<p class="ml-4 text-lg font-semibold">
											{formatGrowthRate(name)}
										</p>
									</div>
									<span class="text-right text-base font-normal opacity-50"
										>{dictGrowthRates[name] || 0}</span
									>
									<input
										type="checkbox"
										name="growth-rate"
										class="hidden"
										data-name={name}
										{checked}
										on:change={handlers.handleGrowthRateChange}
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

<style lang="scss">
	.sidebar {
		--bg-color: hsl(240, 14%, 90%);
		--bg-color__sidebar: hsl(240, 14%, 92%);

		width: 100%;
		height: 100%;
		position: sticky;
		top: 100px;
		border-radius: 1.5rem;
		background-color: var(--bg-color);
		overflow-x: hidden;
		overflow-y: auto;

		.sidebar-layout,
		#sidebar-search {
			width: 100%;
			border-radius: calc(1.5rem - 0.675rem);
			background-color: var(--bg-color__sidebar);
		}

		#sidebar-search {
			background-color: rgba(var(--bg-color__sidebar-rgb), 0.75);
			backdrop-filter: blur(50px);
			outline: 2px solid #ffffff0e;

			&:focus,
			&:active {
				outline: 2px solid #ffffff49;
			}
		}
	}

	.head {
		--bg-color: hsla(240, 14%, 90%, 0.3);
		--border-bottom-color: #0a0a0f09;

		background-color: var(--bg-color);
		backdrop-filter: blur(50px);
		border-bottom: 0.125rem solid var(--border-bottom-color);
		padding: 0.675rem;
		z-index: 999;
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
			outline: 3px solid var(--color, hsla(0, 0%, 100%, 0.05));
		}

		// TODO: Complete all colors including themes
		// &.bug {
		// 	--background-color: #4e5634;
		// 	--color: #a5c432;
		// }
	}

	@media only screen and (min-width: 1052px) {
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

		.checkboxes label:has(input:checked) {
			outline: 3px solid var(--color, hsla(0, 0%, 0%, 0.05));
		}
	}
</style>
