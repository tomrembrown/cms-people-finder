<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

:root {
  font-size: 16px;
}

body {
  font-family: 'Work Sans', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4em auto 3em;
  grid-template-areas:
    'header'
    'main'
    'footer';
}

main {
  grid-area: main;
  background-color: d.$background-color;
}

.button > a,
.button > button {
  text-decoration: none;
  display: block;
  border: 1px solid;
  padding: 0.5em 1em;
  margin: 0.5em;
  border-radius: 0.5em;
  text-align: center;
  background-color: d.$icon-gradient-1;
  color: d.$font-color-2;

  &:focus,
  &:hover,
  &:active,
  &.active {
    background-color: d.$icon-gradient-0;
    color: d.$font-color-1;
  }
}
</style>
