<template>
  <main id="home">
    <div id="home__inner">
      <HomePageGraphic />
      <div id="home__buttons" class="button">
        <button @click="showSignup">Sign Up</button>
        <button @click="showLogin">Log In</button>
        <router-link to="/browse">Find People</router-link>
        <router-link to="/about">About Us</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import HomePageGraphic from '@/components/Home/HomePageGraphic.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomePageGraphic,
  },
  methods: {
    ...mapActions(['showLogin', 'showSignup']),
  },
}
</script>

<style lang="scss">
#home {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;

  #home__inner {
    display: inline-block;

    #home__buttons {
      display: grid;

      grid-template-columns: repeat(2, 1fr);
      padding-bottom: 1em;
    }
  }
}
</style>
