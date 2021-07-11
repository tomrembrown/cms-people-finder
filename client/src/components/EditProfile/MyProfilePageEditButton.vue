<template>
  <div class="myprofilepage__editbutton">
    <font-awesome-icon
      class="myprofilepage__editbutton__icon"
      icon="pencil-alt"
    />
    <p class="myprofilepage__editbutton__text">Edit Page</p>
  </div>
</template>

<script>
export default {
  name: 'MyProfilePageEditButton',
}
</script>

<style lang="scss">
.myprofilepage__editbutton {
  position: relative;
  top: 0;
  right: 0;
  color: white;
  background-color: black;
  padding: 0.3rem;
  display: flex;
  width: 6.5em;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
}

.myprofilepage__editbutton__text {
  margin-left: 0.3rem;
}
</style>
