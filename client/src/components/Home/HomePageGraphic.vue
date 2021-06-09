<template>
  <div id="home__graphic">
    <div id="home__graphic__logo"><AshrohSVGLogo size="60" /></div>
    <div id="home__graphic__title"><h2>Ashroh Enterprises</h2></div>
    <div id="home__graphic__slogan"><p>Separation is an Illusion</p></div>
  </div>
</template>

<script>
import AshrohSVGLogo from '../svg/AshrohSVGLogo'

export default {
  name: 'HomePageGraphic',
  components: {
    AshrohSVGLogo,
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

#home__graphic {
  margin: 0 auto;
  padding: 2em 0;
  width: 18em;
  display: grid;
  gap: 0.8em;
  grid-template-columns: 15% 85%;
}

#home__graphic__logo {
  grid-row: span 2;
  justify-items: center;
  align-self: center;
}

#home__graphic__title > h2 {
  font-family: 'Cabin', sans-serif;
  font-weight: 700;
  font-size: 1.6em;
  color: d.$font-color-1;
  margin: 0;
  margin-top: -0.2em;
  padding: 0;
  padding-left: 0.4em;
}

#home__graphic__slogan > p {
  text-transform: uppercase;
  font-family: 'Work Sans', sans-serif;
  letter-spacing: 0.1em;
  font-size: 0.9em;
  font-weight: 300;
  color: d.$font-color-2;
  margin: 0;
  margin-top: -0.1em;
  padding: 0;
  padding-left: 0.7em;
}
</style>
