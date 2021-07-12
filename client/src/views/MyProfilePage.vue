<template>
  <main class="myprofilepage">
    <MyProfilePageEditButton />
    <header class="myprofilepage__header">
      <div class="myprofilepage__logoholder">
        <p class="myprofilepage__logoplaceholder">
          <span class="myprofilepage__logo">LOGO</span>
        </p>
      </div>
      <div class="myprofilepage__photo">
        <img src="@/assets/profilephoto.png" alt="Profile Picture" />
      </div>
      <section class="myprofilepage__info">
        <h2
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__handle ',
          ]"
          :contenteditable="editMode"
        >
          {{ handle }}
        </h2>
        <h3
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__tagline',
          ]"
          :contenteditable="editMode"
        >
          {{ tagline }}
        </h3>
        <hr class="myprofilepage__break" />
        <p
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__description',
          ]"
          :contenteditable="editMode"
        >
          {{ description }}
        </p>
      </section>
      <!-- Links to Social network accounts -->
      <aside class="myprofilepage__socialnetwork">
        <div class="myprofilepage__socialnetworkicon">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="myprofilepage__socialnetworkicon">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="myprofilepage__socialnetworkicon">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="myprofilepage__socialnetworkicon">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
      </aside>
    </header>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import MyProfilePageEditButton from '@/components/EditProfile/MyProfilePageEditButton'

export default {
  name: 'MyProfilePage',
  components: {
    MyProfilePageEditButton,
  },
  computed: {
    ...mapState('myprofile', ['handle', 'tagline', 'description', 'editMode']),
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

.myprofilepage {
  margin: 0 auto;
  width: 92%;
  max-width: 60rem;
  padding: 1rem;
  position: relative;
}

.myprofilepage__header {
  text-align: center;
  display: grid;
  grid-template-columns: 16.25rem 1fr;
  grid-template-rows: 4.375rem 1fr 5rem;
  grid-gap: 1rem;

  grid-template-areas:
    'logo   logo'
    'photo  info'
    'photo  media';
}

.myprofilepage__logoholder {
  grid-area: logo;
}

.myprofilepage__logoplaceholder {
  background-color: d.$footer-header-bg-color;
  width: 11.75rem;
  text-align: center;
}

.myprofilepage__logo {
  font-size: 2rem;
  width: 5rem;
  height: 1.375rem;
  color: d.$font-color-1;
  font-weight: 700;
  line-height: 3.5rem;
}

.myprofilepage__photo {
  grid-area: photo;
  background-color: d.$footer-header-bg-color;
  width: 16.1875rem;
  border-radius: 50%;
  height: 16.1875rem;
}

.myprofilepage__info {
  grid-area: info;
  text-align: left;
}

.myprofilepage--editable {
  cursor: text;
}

.myprofilepage--viewonly {
  cursor: default;
}

.myprofilepage__handle {
  text-transform: uppercase;
  color: d.$font-color-1;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin-bottom: 0.75rem;
}

.myprofilepage__tagline {
  font-family: 'Cabin', sans-serif;
  color: d.$font-color-1;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
}

.myprofilepage__break {
  height: 1px;
  margin-bottom: 1em;
}

.myprofilepage__description {
  font-family: 'Cabin', sans-serif;
  color: d.$font-color-2;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.575rem;
}

.myprofilepage__socialnetwork {
  grid-area: media;
  text-align: left;
}

.myprofilepage__socialnetworkicon {
  border-radius: 50%;
  cursor: pointer;
  display: inline;
  padding: 1em;

  img:hover {
    opacity: 0.5;
  }
}
</style>
