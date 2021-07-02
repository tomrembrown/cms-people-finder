<template>
  <div class="homepage__graphic">
    <div class="homepage__graphic__logo"><LogoCorporate size="60" /></div>
    <div><h2 class="homepage__graphic__title">Ashroh Enterprises</h2></div>
    <div>
      <p class="homepage__graphic__slogan">Separation is an Illusion</p>
    </div>
  </div>
</template>

<script>
import LogoCorporate from '../svg/LogoCorporate'

export default {
  name: 'HomePageGraphic',
  components: {
    LogoCorporate,
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

.homepage__graphic {
  margin: 0 auto;
  padding: 2em 0;
  width: auto;
  display: grid;
  gap: 0em;
  grid-template-columns: 15% 85%;
}

.homepage__graphic__logo {
  grid-row: span 2;
  width: 60px;
  justify-items: center;
  align-self: center;
}

.homepage__graphic__title {
  font-family: 'Cabin', sans-serif;
  font-weight: 700;
  font-size: 1.6em;
  color: d.$font-color-1;
  margin: -0.2em 0 0 -1em;
  padding: 0 0 0 0.4em;
}

.homepage__graphic__slogan {
  text-transform: uppercase;
  font-family: 'Work Sans', sans-serif;
  letter-spacing: 0.1em;
  font-size: 0.9em;
  font-weight: 300;
  color: d.$font-color-2;
  margin: 0.9em 0 0 0;
  padding: 0 0 0 0.7em;
}
</style>
