<template>
  <header class="site-header">
    <span class="site-header__branding">
      <TheHeaderLogo />
      <h1 class="site-header__title">Ashroh People Finder</h1>
    </span>
    <TheHeaderNavigation />
  </header>
</template>

<script>
import TheHeaderLogo from './TheHeaderLogo.vue'
import TheHeaderNavigation from './TheHeaderNavigation.vue'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderLogo,
    TheHeaderNavigation,
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

.site-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  background-color: d.$footer-header-bg-color;
  color: d.$font-color-1;
}

.site-header__branding {
  margin-left: 0.5rem;
  display: flex;
}

.site-header__title {
  font: {
    size: 1.6rem;
    weight: 600;
    family: 'Cabin', sans-serif;
  }
  color: d.$font-color-1;
  margin-left: 0.4em;
  margin-top: 0.1em;
}
</style>
