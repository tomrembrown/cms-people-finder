<template>
  <main id="myprofile">
    <header>
      <div class="profileLogo">
        <p class="logoPlaceholder"><span>LOGO</span></p>
      </div>
      <div class="profilePhoto">
        <img src="@/assets/profilephoto.png" alt="Profile Picture" />
      </div>
      <section class="profileHeader">
        <h2>{{ handle }}</h2>
        <h3>TOTALLY AWESOME MANIFESTATION OF INFINITE CONSCIOUSNESS</h3>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.
        </p>
      </section>
      <!-- Links to Social network accounts -->
      <aside class="socialNetworkNavBar">
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
      </aside>
    </header>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyProfile',
  computed: {
    ...mapState({
      handle: 'user_handle',
    }),
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

#myprofile {
  margin: 0 auto;
  width: 92%;
  max-width: 60rem;
  padding: 1rem;

  header {
    text-align: center;
    display: grid;
    grid-template-columns: 16.25rem 1fr;
    grid-template-rows: 4.375rem 1fr 5rem;
    grid-gap: 1rem;

    grid-template-areas:
      'logo   logo'
      'photo  info'
      'photo  media';

    .profileLogo {
      grid-area: logo;

      .logoPlaceholder {
        background-color: d.$footer-header-bg-color;
        width: 11.75rem;
        text-align: center;

        span {
          font-size: 2rem;
          width: 5rem;
          height: 1.375rem;
          color: d.$font-color-1;
          font-weight: 700;
          line-height: 3.5rem;
        }
      }
    }

    .profilePhoto {
      grid-area: photo;
      background-color: d.$footer-header-bg-color;
      width: 16.1875rem;
      border-radius: 50%;
      height: 16.1875rem;
    }

    .profileHeader {
      text-align: left;
      grid-area: info;

      h2 {
        text-transform: uppercase;
        color: d.$font-color-1;
        font-size: 1.875rem;
        font-weight: 700;
        line-height: 1.5rem;
        margin-bottom: 0.75rem;
      }

      h3 {
        font-family: 'Cabin', sans-serif;
        color: d.$font-color-1;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5rem;
      }

      hr {
        height: 1px;
        margin-bottom: 1em;
      }

      p {
        font-family: 'Cabin', sans-serif;
        color: d.$font-color-2;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.575rem;
      }
    }
    .socialNetworkNavBar {
      grid-area: media;
      text-align: left;

      .socialNetworkNav {
        border-radius: 50%;
        cursor: pointer;
        display: inline;
        padding: 1em;

        img:hover {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
