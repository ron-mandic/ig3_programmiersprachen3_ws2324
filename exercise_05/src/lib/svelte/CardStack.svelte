<style lang="scss">
// ############################################################ Styles
section {
  position: relative;
  width: 100%;
}

.grid {
  grid-template-columns: 1fr;
}

// ############################################################ Media queries
@media (min-width: 554px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

<script lang="ts">
import type { IData } from "../ts/interfaces";
import { fly } from "svelte/transition";
import { quintOut } from "svelte/easing";
import Card from "./Card.svelte";

export let cards: IData[];
</script>

<section>
  <ul
    class="grid w-full h-full list-none max-w-screen-fhd m-0-auto p-[1rem] gap-[1.5rem]"
    transition:fly={{
      delay: 250,
      duration: 1300,
      y: 100,
      opacity: 0,
      easing: quintOut,
    }}
  >
    {#each cards as card}
      <Card content={card} />
    {/each}
  </ul>
</section>
