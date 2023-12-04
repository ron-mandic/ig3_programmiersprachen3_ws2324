<style lang="scss">
#logo {
  filter: invert(1);
}

.container {
  width: 100%;
  height: 100%;
  max-width: calc(1920px - 2rem);
  margin: 0 auto;
}

header {
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(1rem);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  font-size: large;

  &:hover {
    text-decoration: underline;
  }
}
</style>

<script lang="ts"></script>

<header>
  <div class="container flex justify-between items-center">
    <a id="logo" href="#">
      <img src="/svg/icon-bite-force.svg" alt="Prehistoric Battle - Logo" />
    </a>

    <nav>
      <ul class="flex justify-end items-center gap-5 font-heading">
        <li><a href="#start">About</a></li>
        <li><a href="#cards">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
