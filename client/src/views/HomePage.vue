<template>
  <main class="homepage">
    <div class="homepage__inner">
      <HomePageGraphic />
      <div class="homepage__buttons">
        <button class="button" @click="showLogin" v-if="!isSignedIn">
          Log In
        </button>
        <button class="button" @click="showSignup" v-if="!isSignedIn">
          Sign Up
        </button>
        <router-link class="button" to="/browse">Find People</router-link>
        <router-link class="button" to="/about">About Us</router-link>
        <button
          @click="signout"
          v-if="isSignedIn"
          class="button homepage__buttons--center"
        >
          Sign Out
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import HomePageGraphic from '@/components/Home/HomePageGraphic.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('auth')
const { mapActions } = createNamespacedHelpers('modal')

export default {
  name: 'HomePage',
  components: {
    HomePageGraphic,
  },
  computed: {
    ...mapState(['isSignedIn']),
  },
  methods: {
    ...mapMutations(['signout']),
    ...mapActions(['showLogin', 'showSignup']),
  },
}
</script>

<style lang="scss">
.homepage {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
}

.homepage__inner {
  display: inline-block;
}

.homepage__buttons {
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  padding-bottom: 1em;
}

.homepage__buttons--center {
  justify-self: center;
  grid-column: 1 / -1;
}
</style>
