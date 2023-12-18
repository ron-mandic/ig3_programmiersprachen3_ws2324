<script lang="ts">
	import Cat from "./components/Cat.svelte";
	import Loader from "./components/Loader.svelte";
	import { EPromiseSettledResultStatus } from "./ts/enums";
	import { catAPI, randomSubsetFrom } from "./ts/functions";
	import type { TCatBreed, TCatBreedLong } from "./ts/types";

	const catData = (async (): Promise<
		PromiseSettledResult<TCatBreedLong>[]
	> => {
		// a) Get 3 random cat breeds
		const catDataBreeds: TCatBreed[] = randomSubsetFrom(
			await catAPI("breeds"),
			3
		);

		// b) Get the first random cat image for each breed using the breed_id (provided that the breed has at least one image)
		const catData: Promise<TCatBreedLong>[] = catDataBreeds.map(
			async (item, _) => {
				const catDataImages = await catAPI("images/search", {
					breed_id: item.id,
					limit: 1,
				});

				return {
					...item,
					_imageUrl: catDataImages[0].url,
				};
			}
		);

		// c) Wait for all promises i.e. all cat images to be fetched
		return await Promise.allSettled(catData);
	})();
</script>

<div class="frame">
	{#await catData}
		<Loader />
	{:then data}
		<div class="cats">
			{#each data as result}
				{#if result.status === EPromiseSettledResultStatus.FULFILLED}
					<Cat data={result.value} />
				{:else}
					<p>{result.reason}</p>
				{/if}
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	.frame {
		width: 100%;
	}

	.cats {
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, minmax(351px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}
</style>
