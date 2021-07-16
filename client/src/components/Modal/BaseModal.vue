<template>
  <transition name="modal__fade">
    <div
      id="modal"
      class="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal__title"
      aria-describedby="modal__main"
      v-if="visible"
    >
      <div :class="`modal__content ${component_class}`" role="document">
        <header class="modal__header">
          <h3 class="modal__title" id="modal__title">
            {{ title }}
          </h3>
          <button
            type="button"
            class="modal__closebutton"
            aria-label="Close modal"
            @click="close"
          >
            &times;
          </button>
        </header>
        <component :is="component_name" />
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import TheLoginModal from './specificModalComponents/TheLoginModal.vue'
import TheSignupModal from './specificModalComponents/TheSignupModal.vue'
import TheStatusModal from './specificModalComponents/TheStatusModal.vue'

const { mapState, mapMutations } = createNamespacedHelpers('modal')

export default {
  name: 'BaseModal',
  components: {
    TheLoginModal,
    TheSignupModal,
    TheStatusModal,
  },
  computed: {
    ...mapState({
      visible: 'visible',
      component: 'component',
      title: 'title',
    }),
    component_class() {
      return this.component
        ? 'modal__content--' + this.component.toLowerCase()
        : ''
    },
    component_name() {
      return this.component ? 'The' + this.component + 'Modal' : ''
    },
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.visible) {
        this.close()
      }
    }
    document.addEventListener('keydown', escapeHandler)
  },
  methods: {
    ...mapMutations({
      close: 'closeModal',
    }),
  },
}
</script>

<style lang="scss">
@use '@/displaysettings.scss' as d;

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  padding-top: 2%;
  z-index: 2000;
}

.modal__content {
  position: relative;
  overflow: auto;

  border-radius: 0.5em;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  background-color: d.$background-color;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3em auto 3.5em;
  grid-template-areas:
    'modal__header'
    'modal__main'
    'modal__footer';
}

.modal__content--login {
  width: 95vw;
  max-width: 20rem;
  height: 90vh;
  max-height: 19rem;
}

.modal__content--signup {
  width: 95vw;
  max-width: 24rem;
  height: 90vh;
  max-height: 29rem;
}

.modal__content--status {
  width: 95vw;
  max-width: 21rem;
  height: 90vh;
  max-height: 14rem;
}

.modal__header {
  grid-area: modal__header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  background-color: d.$footer-header-bg-color;
}

.modal__title {
  font-family: 'Cabin', sans-serif;
  font-weight: 700;
  font-size: 1.6em;
  color: d.$font-color-1;
}

.modal__closebutton {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: -1rem;
  margin-left: 1rem;
  padding-right: 0;
}

.modal__main {
  align-self: center;
  grid-area: modal__main;
  padding: 0.75rem 2rem 1.5rem 2rem;
  background-color: d.$background-color;
}

.modal__field--subsequentrow {
  margin-top: 0.3rem;
}

.modal__field__label {
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 600;
  display: block;
  text-align: center;
}

.modal__field__label__description {
  font-style: italic;
  font-size: 0.75rem;
}

.modal__field__input {
  text-align: left;
  padding: 0.5rem;
  background-color: transparent;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  overflow: visible;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

.modal__footer {
  grid-area: modal__footer;
  padding: 0.625rem;
  font-size: 0.875rem;
  background-color: d.$footer-header-bg-color;
  color: d.$font-color-1;
  display: flex;
  justify-content: space-between;
}

.modal__error {
  color: red;
  font-style: italic;
  font-size: 0.75rem;
  text-align: left;
}

.modal__error--general {
  text-align: center;
  padding-top: 1rem;
}

.modal__fade-enter,
.modal__fade-leave-to {
  opacity: 0;
}

.modal__fade-enter-active,
.modal__fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
