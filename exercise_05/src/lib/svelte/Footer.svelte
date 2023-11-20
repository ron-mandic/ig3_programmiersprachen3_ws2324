<script lang="ts"></script>

<footer>
  <div class="container flex">
    <ul class="flex flex-col gap-3">
      <li><a href="#privacy">Datenschutz</a></li>
      <li><a href="#terms">Terms of Use</a></li>
      <li><a href="#imprint">Imprint</a></li>
    </ul>
    <p class="opacity-50"><a href="#">&copy; 2023 Prehistoric Battle</a> <br> All rights reserved.</p>
  </div>
</footer>

<style lang="scss">
  footer {
    background-color: #0c0c0c;
    padding: 3rem 1.5rem;
    width: 100%;
  }
  .container {
    width: 100%;
    max-width: calc(1920px - 3rem);
    margin: 0 auto;
    flex-direction: column;
    gap: 3rem;
  }

  p {
    color: #fff;
    margin: 0;
  }

  li a:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
</style>
