<template>
  <main id="home">
    <div id="home__inner">
      <HomePageGraphic />
      <div id="home__buttons" class="button">
        <router-link to="/about">About Us</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import HomePageGraphic from '@/components/Home/HomePageGraphic.vue'

export default {
  name: 'Home',
  components: {
    HomePageGraphic,
  },
}
</script>

<style lang="scss">
#home {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;

  #home__inner {
    display: inline-block;

    #home__buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 1em;
    }

    #home__buttons > a {
      width: 6em;
    }
  }
}
</style>
