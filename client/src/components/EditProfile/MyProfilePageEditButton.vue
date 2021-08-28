<template>
  <button class="myprofilepage__editbutton" @click="switch_editable">
    <font-awesome-icon
      v-if="!editMode"
      class="myprofilepage__editbutton__icon"
      icon="pencil-alt"
    />
    <p class="myprofilepage__editbutton__text">{{ button_text }}</p>
  </button>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } =
  createNamespacedHelpers('myprofile')

export default {
  name: 'MyProfilePageEditButton',
  computed: {
    ...mapState({
      editMode: 'editMode',
    }),
    button_text() {
      return this.editMode ? 'View & Save' : 'Edit Page'
    },
  },
  methods: {
    ...mapMutations(['setEditMode']),
    ...mapActions(['updateProfileStore']),
    switch_editable() {
      if (this.editMode) {
        this.updateProfileStore()
      }
      this.setEditMode(!this.editMode)
    },
  },
}
</script>

<style lang="scss">
.myprofilepage__editbutton {
  border: none;
  position: relative;
  top: 0;
  right: 0;
  color: white;
  background-color: black;
  padding: 0.3rem;
  display: flex;
  width: 7em;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
}

.myprofilepage__editbutton__text {
  margin-left: 0.3rem;
}
</style>
