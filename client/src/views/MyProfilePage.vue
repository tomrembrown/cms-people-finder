<template>
  <main class="myprofilepage">
    <MyProfilePageEditButton />
    <header class="myprofilepage__header">
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
          @blur="changeFieldLocal('handle', $event)"
        >
          {{ handle }}
        </h2>
        <h3
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__subheading',
          ]"
          :contenteditable="editMode"
          @blur="changeFieldLocal('tagline', $event)"
        >
          {{ tagline }}
        </h3>
        <hr class="myprofilepage__header__break" />
        <p
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__header__text',
          ]"
          :contenteditable="editMode"
          @blur="changeFieldLocal('description', $event)"
        >
          {{ description }}
        </p>
      </section>
    </header>
    <section class="myprofilepage__maincontent">
      <section class="myprofilepage__aboutme">
        <h3 class="myprofilepage__subheading">About Me &amp; My Story</h3>
        <hr class="myprofilepage__maincontent__break" />
        <p
          :class="[
            editMode ? 'myprofilepage--editable' : 'myprofilepage--viewonly',
            'myprofilepage__maincontent__text',
          ]"
          :contenteditable="editMode"
          @blur="changeFieldLocal('aboutme', $event)"
        >
          {{ aboutme }}
        </p>
      </section>
      <section class="myprofilepage__interests">
        <h3 class="myprofilepage__subheading">Interests</h3>
        <hr class="myprofilepage__maincontent__break" />
        <ul class="myprofilepage__maincontent__list">
          <li v-for="(interest, index) in interests" :key="interest">
            <font-awesome-icon
              v-if="editMode"
              class="myprofilepage__deletebutton__icon"
              icon="trash-alt"
              @click="deleteListItemLocal('interests', index)"
            />
            <!-- <font-awesome-icon
              v-if="editMode"
              :class="[
                index === 0 ? 'myprofilepage__icon--invisible' : '',
                'myprofilepage__upbutton__icon',
              ]"
              icon="arrow-up"
              @click="upListItemLocal('interests', index)"
            />
            <font-awesome-icon
              v-if="editMode"
              :class="[
                index === interests.length - 1
                  ? 'myprofilepage__icon--invisible'
                  : '',
                'myprofilepage__downbutton__icon',
              ]"
              icon="arrow-down"
              @click="downListItemLocal('interests', index)"
            /> -->
            {{ interest }}
          </li>
          <li v-if="editMode">
            <font-awesome-icon
              class="myprofilepage__addbutton__icon"
              icon="plus"
            />
            <MyAutoComplete
              id="new_interest"
              :options="all_interests"
              @selection-made="addListItemLocal('interests', $event)"
            />
          </li>
        </ul>
      </section>
      <section class="myprofilepage__skills">
        <h3 class="myprofilepage__subheading">Skills</h3>
        <hr class="myprofilepage__maincontent__break" />
        <ul class="myprofilepage__maincontent__list">
          <li v-for="skill in skills" :key="skill">
            {{ skill }}
          </li>
        </ul>
      </section>
      <section class="myprofilepage__projects">
        <h3 class="myprofilepage__subheading">
          Projects Would Like to Collaborate with Others On
        </h3>
        <hr class="myprofilepage__maincontent__break" />
        <div v-for="project in projects" :key="project.title">
          <p class="myprofilepage__maincontent__text">
            {{ project.title }} ({{ project.user_type }})
          </p>
          <p class="myprofilepage__maincontent__text">
            {{ project.description }}
          </p>
        </div>
      </section>
      <section class="myprofilepage__location">
        <h3 class="myprofilepage__subheading">Location</h3>
        <hr class="myprofilepage__maincontent__break" />
        <p class="myprofilepage__maincontent__text">{{ location }}</p>
      </section>
    </section>
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MyProfilePageEditButton from '@/components/EditProfile/MyProfilePageEditButton'
import MyAutoComplete from '@/components/EditProfile/MyAutoComplete'
import { getProfileImage, getCompleteInterestList } from '../api/api-client'
// import { throttle } from 'lodash'

const { mapState, mapMutations } = createNamespacedHelpers('myprofile')
const { mapActions } = createNamespacedHelpers('modal')

export default {
  name: 'MyProfilePage',
  components: {
    MyProfilePageEditButton,
    MyAutoComplete,
  },
  data() {
    return {
      all_interests: [],
    }
  },
  computed: {
    ...mapState([
      'handle',
      'tagline',
      'description',
      'editMode',
      'image_filename',
      'aboutme',
      'location',
      'interests',
      'skills',
      'projects',
    ]),
  },
  methods: {
    ...mapMutations([
      'changeField',
      'deleteListItem',
      'addListItem',
      'upListItem',
      'downListItem',
    ]),
    ...mapActions(['showFailure']),
    changeFieldLocal(field, event) {
      const payload = {
        field: field,
        value: event.target.innerText,
      }
      this.changeField(payload)
    },
    deleteListItemLocal(list, index) {
      const payload = {
        list: list,
        index: index,
      }
      this.deleteListItem(payload)
    },
    addListItemLocal(list, item) {
      const payload = {
        list: list,
        item: item,
      }
      this.addListItem(payload)
    },
    upListItemLocal(list, index) {
      console.log('In upListItemLocal: index: ' + index)
      if (index > 0) {
        const payload = {
          list: list,
          index: index,
        }
        this.upListItem(payload)
      }
    },
    downListItemLocal(list, index) {
      console.log('In downlListItemLocal: index: ' + index)
      if (index < this[list].length - 1) {
        const payload = {
          list: list,
          index: index,
        }
        this.downListItem(payload)
      }
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

            // This is a base 64 string that is saved in the store under the field image_filename
            // This field name is the same as that in the database. On the server side process_image
            // saves the file in a directory and saves the link to the file on the server in the
            // DB field image_filename
            const payload = {
              field: 'image_filename',
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
  mounted() {
    getCompleteInterestList().then((all_interests) => {
      this.all_interests = all_interests
    })

    // Everything loaded - but image - use image filename to get from api
    if (this.image_filename) {
      getProfileImage(this.image_filename).then((image) => {
        if (image) {
          this.$refs.profilePicture.onload = () => {
            URL.revokeObjectURL(this.$refs.profilePicture.src)
          }
          this.$refs.profilePicture.src = URL.createObjectURL(image)
        }
      })
    }
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

.myprofilepage {
  margin: 0 auto;
  width: 92%;
  max-width: 60rem;
  padding: 2.5rem;
  position: relative;
}

.myprofilepage__header {
  text-align: center;
  display: grid;
  grid-template-columns: 16.25rem 1fr;
  grid-template-rows: 19.5rem;
  grid-gap: 1rem;

  grid-template-areas: 'photo  info';
}

.myprofilepage__photo {
  grid-area: photo;
  width: 16rem;
  height: 16.1875rem;
  text-align: left;
  padding: 0;
  margin: 0;
}

.myprofilepage__photo > img {
  width: 100%;
  padding: 0;
  margin: 0;
}

.myprofilepage__photo__uploadbutton {
  margin-top: 0.7rem;
  margin-left: 0rem;
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
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin-bottom: 0.75rem;
}

.myprofilepage__subheading {
  font-family: 'Cabin', sans-serif;
  color: d.$font-color-1;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
}

.myprofilepage__header__break {
  height: 1px;
  margin-bottom: 1em;
}

.myprofilepage__maincontent__break {
  height: 1px;
}

.myprofilepage__header__text {
  font-family: 'Cabin', sans-serif;
  color: d.$font-color-2;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.575rem;
}

.myprofilepage__maincontent__text {
  font-family: 'Cabin', sans-serif;
  color: d.$font-color-2;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  margin-bottom: 1rem;
}

.myprofilepage__maincontent__list {
  font-family: 'Cabin', sans-serif;
  color: d.$font-color-2;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  margin-bottom: 1rem;
  list-style-position: inside;
}

.myprofilepage__deletebutton__icon,
.myprofilepage__upbutton__icon,
.myprofilepage__downbutton__icon {
  cursor: pointer;
  margin: 0 0.1rem;
}

.myprofilepage__addbutton__icon {
  margin: 0 0.1rem;
}

.myprofilepage__icon--invisible {
  cursor: default;
  opacity: 0;
}

.myprofilepage__deletebutton__icon:hover {
  color: red;
}
</style>
