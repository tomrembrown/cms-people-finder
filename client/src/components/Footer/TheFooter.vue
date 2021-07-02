<template>
  <footer class="site-footer">
    <p class="site-footer__copyright">
      <small class="site-footer__copyright-small"
        >Copyright &copy;2021 Ashroh Enterprises Inc.</small
      >
    </p>
    <address class="site-footer__address">
      Built by
      <a class="site-footer__address-link" href="http://www.tomrembrown.com"
        >Tom Brown</a
      >
    </address>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

.site-footer {
  grid-area: footer;
  padding: 1rem 1.5rem;
  background-color: d.$footer-header-bg-color;
  color: d.$font-color-1;
  display: flex;
  justify-content: space-between;
}

.site-footer__address-link {
  text-decoration: none;
  cursor: pointer;
  color: d.$icon-gradient-0;

  &:focus,
  &:hover,
  &:active {
    color: d.$icon-gradient-1;
  }
}

.site-footer__address {
  font-style: normal;
}

.site-footer__copyright {
  margin: 0;
  display: inline;
}

.site-footer__copyright-small {
  font-size: 0.875rem;
}
</style>
