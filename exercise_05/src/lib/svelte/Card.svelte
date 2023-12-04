<style lang="scss">
// ############################################################ Imports
@use "../scss/use/Card.scss";
</style>

<script lang="ts">
import type { IData } from "../ts/interfaces";
import { dictDinosaurImages } from "../ts/dinosaurs-images";
import { format } from "../ts/functions";

export let content: IData;

let flipped = false;

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
  encephalization,
} = content;

const {
  bg: hasBackgroundImage,
  mg: hasMiddlegroundImage,
  fg: hasForegroundImage,
} = dictDinosaurImages[name as keyof typeof dictDinosaurImages];

const id = groupLetter + cardNumber;
</script>

<li class="grid-item clr-{groupLetter.toLowerCase()}" tabindex="-1">
  <button
    class="card"
    class:flipped="{flipped}"
    on:click="{() => (flipped = !flipped)}"
    on:blur="{() => {
      if (flipped) flipped = false;
    }}"
    tabindex="0"
  >
    <div class="front">
      <!-- <bg> -->
      {#if hasBackgroundImage}
        <div
          class="card-overlay__bg"
          style="--url: url('/webp/{name}.bg.webp')"
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
        <div class="card-overlay" style="--url: url('/webp/{name}.webp')"></div>
      {/if}
      <!-- </mg> -->
      <div class="card-body">
        <div class="left">
          <div class="card-body__info">
            <div class="card-body__info--heading font-heading">Group</div>
            <div class="card-body__info--description">
              {group}
            </div>
          </div>
          <div class="card-body__info">
            <div class="card-body__info--heading font-heading">Years</div>
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
            <div class="card-body__info--heading font-heading">IQ</div>
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
          style="--url: url('/webp/{name}.fg.webp')"
        ></div>
      {/if}
      <!-- <fg> -->
    </div>
    <div class="back">
      <div class="pattern"></div>
      <img src="/svg/icon-bite-force.svg" alt="Prehistoric Battle - Logo" />
    </div>
  </button>
</li>
