<template>
  <section class="modal__main" id="modal__main">
    <p>{{ message }}</p>
  </section>
  <footer class="modal__footer modal__footer--right">
    <button @click="close" class="button" aria-label="Close modal">OK</button>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('modal')

export default {
  name: 'TheStatusModal',
  computed: {
    ...mapState(['message']),
  },
  methods: {
    ...mapMutations({
      close: 'closeModal',
    }),
  },
}
</script>

<style lang="scss">
.modal__footer--right {
  justify-content: flex-end;
}
</style>
