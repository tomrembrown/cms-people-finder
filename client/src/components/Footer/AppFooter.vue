<template>
  <footer id="main-site-footer">
    <p>
      <small>Copyright &copy;2021 Ashroh Enterprises Inc.</small>
    </p>
    <address>
      Built by <a href="http://www.tomrembrown.com">Tom Brown</a>
    </address>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

#main-site-footer {
  grid-area: footer;
  padding: 1rem 1.5rem;
  background-color: d.$footer-header-bg-color;
  color: d.$font-color-1;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    cursor: pointer;
    color: d.$icon-gradient-0;
    &:focus,
    &:hover,
    &:active,
    &.active {
      color: d.$icon-gradient-1;
    }
  }

  address {
    font-style: normal;
  }

  p {
    margin: 0;
    display: inline;

    small {
      font-size: 0.875rem;
    }
  }
}
</style>
