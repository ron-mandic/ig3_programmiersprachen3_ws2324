<script lang="ts">
  import type {IData} from "../ts/interfaces";
  import {dictDinosaurImages} from "../ts/dinosaurs-images";
  import { format } from "../ts/functions";

  function handleClick(_: MouseEvent) {
    console.log(name);
  }

  export let content: IData;

  const {
    name,
    cardNumber,
    group,
    groupLetter,
    years,
    territorialRange,
    randomFact,
    height,
    length,
    weight,
    brainSize: hp,
    biteForce,
    speed,
    iq,
    encephalization
  } = content;

  const {
    bg: hasBackgroundImage,
    mg: hasMiddlegroundImage,
    fg: hasForegroundImage
  } = dictDinosaurImages[name as keyof typeof dictDinosaurImages];

  const id = groupLetter + cardNumber;

</script>

<li class="grid-item clr-{groupLetter.toLowerCase()}" tabindex="-1">
  <button class="card" tabindex="0" on:click={handleClick}>
    <!-- <bg> -->
    {#if hasBackgroundImage}
      <div
        class="card-overlay__bg"
        style="--url: url('src/assets/webp/{name}.bg.webp')"
      ></div>
    {/if}
    <!-- </bg> -->
    <div class="card-header">
      <div class="left">
        <div class="card-header__id font-heading">{id}</div>
        <div class="card-header__name font-heading">
          {name}
        </div>
      </div>
      <div class="right">
        <div class="card-header__hp font-heading">{hp}</div>
        <div class="card-header__logo"></div>
      </div>
    </div>
    <!-- <mg> -->
    {#if hasMiddlegroundImage}
      <div
        class="card-overlay"
        style="--url: url('src/assets/webp/{name}.webp')"
      ></div>
    {/if}
    <!-- </mg> -->
    <div class="card-body">
      <div class="left">
        <div class="card-body__info">
          <div class="card-body__info--heading font-heading">
            Group
          </div>
          <div class="card-body__info--description">
            {group}
          </div>
        </div>
        <div class="card-body__info">
          <div class="card-body__info--heading font-heading">
            Years
          </div>
          <div class="card-body__info--description">
            {years} [Ma.]
          </div>
        </div>
        <div class="card-body__info">
          <div class="card-body__info--heading font-heading">
            Territorial range
          </div>
          <div class="card-body__info--description">
            {territorialRange} [km]
          </div>
        </div>
        <div class="card-body__info">
          <div class="card-body__info--heading font-heading">
            Encephalization
          </div>
          <div class="card-body__info--description">{encephalization}</div>
        </div>
        <div class="card-body__info">
          <div class="card-body__info--heading font-heading">
            IQ
          </div>
          <div class="card-body__info--description">{iq}</div>
        </div>
      </div>
      <div class="right">
        <div class="card-body__fact smaller">
          {randomFact}
        </div>
        <div class="card-body__stats">
          <div class="card-body__stat height">
            <div class="card-body__stat--icon"></div>
            <div class="card-body__stat--text">{height} [m]</div>
          </div>
          <div class="card-body__stat length">
            <div class="card-body__stat--icon"></div>
            <div class="card-body__stat--text">{length} [m]</div>
          </div>
          <div class="card-body__stat">
            <div class="card-body__stat--icon weight"></div>
            <div class="card-body__stat--text">{format(weight)} [kg]</div>
          </div>
          <div class="card-body__stat bite-force">
            <div class="card-body__stat--icon"></div>
            <div class="card-body__stat--text">{format(biteForce)} [N]</div>
          </div>
          <div class="card-body__stat speed">
            <div class="card-body__stat--icon"></div>
            <div class="card-body__stat--text">
              {speed} [km/h]
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <fg> -->
    {#if hasForegroundImage}
      <div
        class="card-overlay__fg"
        style="--url: url('src/assets/webp/{name}.fg.webp')"
      ></div>
    {/if}
    <!-- <fg> -->
  </button>
</li>

<style lang="scss">
  // ############################################################ Imports
  @use "../scss/colors" as *;

  // ############################################################ Styles

  button {
    all: unset;
  }

  .grid-item {
    --hwb-whiteness: 67.5%;

    aspect-ratio: 731 / 1032;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: clamp(0.5rem, 5vw, 1rem);

    &:focus {
      outline: 2px solid var(--tint-3, rgb(216, 216, 216));
      border-radius: clamp(0.5rem, 5vw, 1rem);
    }
  }

  .card {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    aspect-ratio: 731 / 1032;
    padding: 2.188%;

    border-radius: clamp(0.5rem, 5vw, 1rem);
    background-color: var(--tint-1, rgb(17, 17, 17));
    font-family: "Lato", sans-serif;

    overflow: hidden;
    user-select: none;
    cursor: pointer;
    transition: scale 0.5s ease-in;

    &:focus {
      outline: 2px solid var(--tint-3, rgb(216, 216, 216));
      border-radius: clamp(0.5rem, 5vw, 1rem);
    }

    &::after {
      content: "©2023 HfG - Prehistoric Battle Quartet Cards";
      position: absolute;
      left: 50%;
      bottom: .175%;
      translate: -50%;
      font-size: 25%;
      color: var(--tint-3, rgb(216, 216, 216));
      font-weight: normal;
    }

    &:hover {
      scale: .9875;
      transition: scale 0.25s cubic-bezier(0.47, 0, 0.745, 0.715);

      [class*="card-overlay"]{
        translate: -50% -49%;
        transition: translate 0.25s cubic-bezier(0.47, 0, 0.745, 0.715);
      }
    }
  }

  /* card-header ########################################################### */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 1.588%;
    left: 50%;
    translate: -50%;
    margin: 0;
    width: calc(100% - 2.188% * 2);
    color: var(--tint-3, rgb(216, 216, 216));
  }

  .card-header .left,
  .card-header .right {
    display: flex;
    align-items: center;
  }

  .card-header .left {
    flex: 0 0 70%;
    justify-content: flex-start;
    flex-grow: 2;
  }

  .card-header .right {
    flex: 0 1 30%;
    justify-content: flex-end;
    /* padding-right: 2.188%; */
  }

  .card-header__id {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    width: 17%;
    height: 17%;
    color: var(--tint-1, rgb(216, 216, 216));
    background-color: var(--tint-3, rgb(46, 46, 46));
    border-radius: clamp(0.5rem, 12vw, 0.25rem);
    margin-right: 5%;
    font-size: 105%;
  }

  .card-header__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-header__logo {
    --a: url("src/assets/svg/a.svg");
    --b: url("src/assets/svg/b.svg");
    --c: url("src/assets/svg/c.svg");
    --d: url("src/assets/svg/d.svg");
    --e: url("src/assets/svg/e.svg");
    --f: url("src/assets/svg/f.svg");
    --g: url("src/assets/svg/g.svg");
    --h: url("src/assets/svg/h.svg");

    min-width: 25%;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    background-color: var(--tint-3, rgb(46, 46, 46));
    margin-left: 7%;
    background-position: center center;
    background-size: 90%;
  }

  .grid-item.clr-a .card-header__logo {
    background-image: var(--a);
  }

  .grid-item.clr-b .card-header__logo {
    background-image: var(--b);
  }

  .grid-item.clr-c .card-header__logo {
    background-image: var(--c);
  }

  .grid-item.clr-d .card-header__logo {
    background-image: var(--d);
  }

  .grid-item.clr-e .card-header__logo {
    background-image: var(--e);
  }

  .grid-item.clr-f .card-header__logo {
    background-image: var(--f);
  }

  .grid-item.clr-g .card-header__logo {
    background-image: var(--g);
  }

  .grid-item.clr-h .card-header__logo {
    background-image: var(--h);
  }

  .card-header__name,
  .card-header__hp,
  .card-header__logo {
    -webkit-text-stroke: 1px var(--tint-1, rgb(46, 46, 46));
  }

  /* card-overlay ########################################################### */
  .card-overlay__bg,
  .card-overlay,
  .card-overlay__fg {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 100%;
    height: 100%;
    aspect-ratio: 731 / 1032;
    background: var(--url);
    background-position: center center;
    background-size: cover;
    pointer-events: none;
    filter: brightness(1.75); /*  blur(5px) */
    /* transition: filter 1.5s ease-in-out; */
    transition: translate 0.375s cubic-bezier(0.47, 0, 0.745, 0.715);
  }

  /* .card-overlay:hover {
    filter: brightness(1.5) blur(0);
    transition: filter 0.5s ease-in-out;
  } */

  .card-overlay__bg {
    filter: brightness(1.475); /*  blur(5px) */
    /* transition: filter 1.5s ease-in-out; */
  }

  /* card-body ########################################################### */
  .card-body {
    position: relative;
    display: flex;
    width: 100%;
    height: 49%; /* 51.4% */
    padding: 4.188% 6.188%;
    font-size: 60%;
    color: var(--tint-1, rgb(216, 216, 216));
    background-color: var(--tint-3, rgb(46, 46, 46));
    border-radius: clamp(0.5rem, 5vw, 0.75rem);
    border-top: 1px solid var(--tint-1, rgb(54, 54, 54));
    transition: scale 0.125s cubic-bezier(0.47, 0, 0.745, 0.715);
  }

  .card-body::after {
    content: "";
    position: absolute;
    top: calc(2.188% * 2);
    left: calc(50% + 1.188%);
    width: 0.75%;
    border-radius: 33%;
    border: inset 10.75% var(--tint-1, rgb(54, 54, 54));
    height: calc(100% - 2.188% * 4);
    background-color: var(--tint-1, rgb(32, 32, 32));
    opacity: 0.075;
  }

  .card-body [class*="--heading"] {
    font-size: 109%;
  }

  .card-body .left,
  .card-body .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .card-body .left {
    flex: 0 0 60%;
  }

  .card-body .right {
    flex: 0 0 40%;
  }

  .card-body__fact {
    line-height: 120%;

    &.small {
      font-size: 94%;
    }

    &.smaller {
      font-size: 87.5%;
    }
  }

  .card-body__stats {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 75%;
    width: 100%;
  }

  .card-body__stat {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .card-body__stat--icon {
    position: relative;
    width: 25%;
    aspect-ratio: 1 / 1;
    margin-right: 7%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    mix-blend-mode: multiply;
    /* outline: 1px solid var(--tint-1, rgb(228, 102, 102)); */
  }

  .card-body__stat.height .card-body__stat--icon {
    background-image: url("src/assets/svg/icon-height.svg");
  }

  .card-body__stat.length .card-body__stat--icon {
    background-image: url("src/assets/svg/icon-length.svg");
  }

  .card-body__stat--icon.weight {
    background-image: url("src/assets/svg/icon-weight.svg");
  }

  .card-body__stat.bite-force .card-body__stat--icon {
    background-image: url("src/assets/svg/icon-bite-force.svg");
  }

  .card-body__stat.speed .card-body__stat--icon {
    background-image: url("src/assets/svg/icon-speed.svg");
  }

  // ############################################################ Media queries

  @media (min-width: 320px) {
    .card {
      font-size: clamp(18.19px, 5.5vw, 32.79px);
    }
  }

  @media (min-width: 554px) {
    .card {
      font-size: clamp(15.92px, 2.975vw, 30.68px);
    }
  }

  @media (min-width: 1024px) {
    .card {
      font-size: clamp(20.14px, 2vw, 28.84px);
    }
  }

  @media (min-width: 1440px) {
    .card {
      font-size: clamp(21.4px, 1.5vw, 28.93px);
    }
  }

  @media (min-width: 1920px) {
    .card {
      font-size: 28.95px;
    }
  }

</style>
