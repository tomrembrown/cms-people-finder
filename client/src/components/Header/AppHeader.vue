<template>
  <header id="main-site-header">
    <span id="branding">
      <CorporateLogo />
      <h1>Ashroh People Finder</h1>
    </span>
    <MainNavigation />
  </header>
</template>

<script>
import CorporateLogo from './CorporateLogo.vue'
import MainNavigation from './MainNavigation.vue'

export default {
  name: 'AppHeader',
  components: {
    CorporateLogo,
    MainNavigation,
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

#main-site-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  background-color: d.$footer-header-bg-color;
  color: d.$font-color-1;

  #branding {
    margin-left: 0.5rem;
    display: flex;

    h1 {
      font: {
        size: 1.6rem;
        weight: 600;
        family: 'Cabin', sans-serif;
      }
      color: d.$font-color-1;
      margin-left: 0.4em;
      margin-top: 0.1em;
    }
  }
}
</style>
