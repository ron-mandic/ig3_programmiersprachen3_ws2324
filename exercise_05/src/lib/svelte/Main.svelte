<script>
import Card from "./Card.svelte";
import LoadingIndicator from "./LoadingIndicator.svelte";
import {delay, random} from "../ts/functions";

let jsonData = (async () => {
  await delay(random(2000, 3000));

  const response = await fetch('src/api/dinosaurs.json')
  return await response.json()
})();
</script>

<main class="w-full h-full">
    {#await jsonData}
        <LoadingIndicator />
    {:then data}
        <ul id="grid" class="grid w-full h-full list-none max-w-screen-fhd m-0-auto p-[1rem] gap-[1.5rem]">
            {#each data as dino}
              <Card content={dino} />
            {/each}
        </ul>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</main>

<style lang="scss">
  // ############################################################ Styles
  main {
    min-height: 100svh;
  }
  #grid {
    grid-template-columns: 1fr;
  }

  // ############################################################ Media queries
  @media (max-width: 320px) {
    #grid {
      display: none;
    }
  }
  @media (min-width: 554px) {
    #grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    #grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1440px) {
    #grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
