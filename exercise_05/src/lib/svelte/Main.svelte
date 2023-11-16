<script>
import Card from "./Card.svelte";

let jsonData = (async () => {
  const response = await fetch('src/api/dinosaurs.json')
  return await response.json()
})();
</script>

{#await jsonData}
    <p>...loading</p>
{:then data}
    <ul>
        {#each data as dino}
            <Card data={dino} />
        {/each}
    </ul>
{:catch error}
    <p>{error.message}</p>
{/await}