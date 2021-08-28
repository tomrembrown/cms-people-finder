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
        <img
          src="@/assets/profilephoto.png"
          alt="Profile Picture"
          ref="profilePicture"
        />
        <input
          style="display: none"
          type="file"
          ref="fileInput"
          @change="onFileChange($event.target.files)"
        />
        <button
          v-if="editMode"
          class="myprofilepage__photo__uploadbutton"
          @click="openFileInput"
        >
          <font-awesome-icon
            class="myprofilepage__photo__uploadbutton__icon"
            icon="portrait"
          />
          <p class="myprofilepage__photo__uploadbutton__text">
            Upload New Profile Picture
          </p>
        </button>
      </div>
      <section class="myprofilepage__info">
        <h2
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__handle ',
          ]"
          :contenteditable="editMode"
          @input="changeFieldLocal('handle', $event)"
        >
          {{ handle }}
        </h2>
        <h3
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__tagline',
          ]"
          :contenteditable="editMode"
          @input="changeFieldLocal('tagline', $event)"
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
          @input="changeFieldLocal('description', $event)"
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
import { createNamespacedHelpers } from 'vuex'
import MyProfilePageEditButton from '@/components/EditProfile/MyProfilePageEditButton'

const { mapState, mapMutations } = createNamespacedHelpers('myprofile')
const { mapActions } = createNamespacedHelpers('modal')

export default {
  name: 'MyProfilePage',
  components: {
    MyProfilePageEditButton,
  },
  computed: {
    ...mapState(['handle', 'tagline', 'description', 'editMode']),
  },
  methods: {
    ...mapMutations(['changeField']),
    ...mapActions(['showFailure']),
    changeFieldLocal(field, event) {
      const payload = {
        field: field,
        value: event.target.innerText,
      }
      this.changeField(payload)
    },
    openFileInput() {
      this.$refs.fileInput.value = null
      this.$refs.fileInput.click()
    },
    onFileChange(files) {
      if (files.length > 0) {
        let imageFile = files[0]

        if (!imageFile.type.match('image.*')) {
          this.showFailure('Please choose an image file')
        } else if (imageFile.size > 256 * 1024) {
          this.showFailure('Please select an image under 250 KB')
        } else {
          // Code to turn image to base64 string comes from https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
          // Get around CORS restrictions
          this.$refs.profilePicture.crossOrigin = 'Anonymous'

          // Once the picture has loaded
          this.$refs.profilePicture.onload = () => {
            // Create a canvas, put image on it, and extract base64String from canvas
            let canvas = document.createElement('CANVAS')
            let ctx = canvas.getContext('2d')

            canvas.height = this.$refs.profilePicture.naturalHeight
            canvas.width = this.$refs.profilePicture.naturalWidth
            ctx.drawImage(this.$refs.profilePicture, 0, 0)

            // This is a base 64 string that is saved in the store under the field image_link
            // This field name is the same as that in the database. On the server side process_image
            // saves the file in a directory and saves the link to the file on the server in the
            // DB field image_link
            const payload = {
              field: 'image_link',
              value: canvas.toDataURL(imageFile.type),
            }
            this.changeField(payload)

            // Revoke object URL now picture has loaded
            URL.revokeObjectURL(this.$refs.profilePicture.src)
          }
          this.$refs.profilePicture.src = URL.createObjectURL(imageFile)
        }
      }
    },
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
  width: 16.1875rem;
  height: 16.1875rem;
}

.myprofilepage__photo > img {
  width: 16rem;
}

.myprofilepage__photo__uploadbutton {
  margin-top: 0.7rem;
  margin-left: 0.7rem;
  border: none;
  color: white;
  background-color: black;
  padding: 0.3rem;
  display: flex;
  cursor: pointer;
}

.myprofilepage__photo__uploadbutton__text {
  margin-left: 0.3rem;
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
