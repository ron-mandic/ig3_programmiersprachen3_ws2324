<script lang="ts">
	import type { TCatBreedLong } from "../ts/types";

	export let data: TCatBreedLong;
	const CAT_DESCRIPTION_MAX_LENGTH = 175;

	console.log(data.name, data);
</script>

{#if data}
	<div
		class="cat"
		style="--url: url('{data._imageUrl}')"
	>
		<div class="content">
			<h2>{data.name}</h2>
			{#if data.description.length > CAT_DESCRIPTION_MAX_LENGTH}
				<p class="overflows">
					{data.description
						.slice(0, CAT_DESCRIPTION_MAX_LENGTH)
						.trim()}
				</p>
			{:else}
				<p>{data.description}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.cat {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		padding: 0.25rem;
		font-family: Arial, Helvetica, sans-serif;

		aspect-ratio: 3 / 4;
		background: linear-gradient(
				to top,
				hsla(214, 97%, 35%, 1),
				hsla(214, 97%, 35%, 0.275)
			),
			var(--url);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		border-radius: 0.75rem;
		border: 1px solid hsla(214, 97%, 35%, 0.25);
	}

	.content {
		width: 100%;
		max-height: 50%;
		border-radius: 0.75rem;
		padding: 1.25rem;
		color: hsla(214, 97%, 95%);
	}

	h2 {
		font-family: "Playfair Display", serif;
		margin-bottom: 1rem;
		font-size: 2.5rem;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	p {
		font-family: "Rethink Sans", sans-serif;
		line-height: 1.5;
		height: calc(5 * 1.5rem);
		/* overflow: hidden; */
	}

	p.overflows::after {
		/* height: auto */
		content: "...";
	}
</style>
