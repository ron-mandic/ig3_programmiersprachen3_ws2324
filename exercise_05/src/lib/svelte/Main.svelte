<style lang="scss">
// ############################################################ Styles
main {
  min-height: 100svh;
}

section#landing {
  width: 100%;
  height: clamp(400px, 50svh, 700px);
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 1.5rem;
}

h1 {
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  line-height: 1;
}

h1 + p {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  max-width: 50ch;
  line-height: 1.25;
}

button#cta {
  position: relative;
  margin-top: 3rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.25rem;
  background-color: #ddd;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: #f4a261;
    color: #000;
    scale: 0.95;
    border-radius: 10rem;
    transition: all 0.2s ease-in-out;
    z-index: 1000;
  }
}

// ############################################################ Media queries
@media (max-width: 374px) {
  :global(body) {
    display: none;
  }
}
@media (min-width: 768px) {
  h1 {
    font-size: clamp(3.75rem, 8vw, 6rem);
  }
}
</style>

<script>
import { fly } from "svelte/transition";
import { quintOut } from "svelte/easing";
import Loader from "./Loader.svelte";
import { delay, random } from "../ts/functions";
import { DINO_DATA_PATH } from "../ts/constants";
import CardStack from "./CardStack.svelte";

let jsonData = (async () => {
  await delay(random(2000, 3000));

  const response = await fetch(DINO_DATA_PATH);
  return await response.json();
})();
</script>

<main class="w-full h-full">
  {#await jsonData}
    <Loader />
  {:then cards}
    <section
      id="landing"
      class="flex flex-col justify-center items-start"
      transition:fly={{
        delay: 150,
        duration: 1500,
        y: 100,
        opacity: 0,
        easing: quintOut,
      }}
    >
      <h1 class="font-heading text-lg">Prehistoric Battle</h1>
      <p class="text-base font-body">
        The new version of the trading card game called Prehistoric Battle is
        out now! Grab your copy below!
      </p>
      <button id="cta">Buy now!</button>
    </section>
    <CardStack {cards} />
  {:catch error}
    <p>{error.message}</p>
  {/await}
</main>
