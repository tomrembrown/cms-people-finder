<template>
  <TheHeader />
  <router-view />
  <BaseModal />
  <TheFooter />
</template>

<script>
import TheHeader from '@/components/Header/TheHeader'
import BaseModal from '@/components/Modal/BaseModal'
import TheFooter from '@/components/Footer/TheFooter'

export default {
  name: 'App',
  components: {
    TheHeader,
    BaseModal,
    TheFooter,
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

:root {
  font-size: 16px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Work Sans', sans-serif;
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

.button {
  text-decoration: none;
  display: block;
  border: 1.5px solid #555;
  padding: 0.5em 1em;
  font-size: 0.9em;
  width: 8em;
  margin: 0.3em;
  border-radius: 0.5em;
  text-align: center;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  top: 0px;
  cursor: pointer;
  background-color: d.$icon-gradient-1;
  color: d.$font-color-2;
  transition: background-color 0.2s, color 0.2s, top 0.1s, box-shadow 0.1s;

  &.disabled,
  &:disabled {
    border-color: #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus,
  &:hover {
    background-color: d.$icon-gradient-0;
    color: d.$font-color-1;
  }

  &:active,
  &.active {
    top: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
}
</style>
