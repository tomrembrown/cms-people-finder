<template>
  <transition name="modal-fade">
    <div
      id="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      v-if="visible"
    >
      <div class="modal-content" role="document">
        <header>
          <h3 id="modal-title">
            {{ title }}
          </h3>
          <button
            type="button"
            class="close-button"
            aria-label="Close modal"
            @click="close"
          >
            &times;
          </button>
        </header>
        <component :is="component" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Login from './specificModalComponents/Login.vue'
import Signup from './specificModalComponents/Signup.vue'

export default {
  name: 'Modal',
  components: {
    Login,
    Signup,
  },
  computed: {
    ...mapState({
      visible: 'modalVisible',
      component: 'modalComponent',
      title: 'modalTitle',
    }),
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

#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  padding-top: 2%;
  z-index: 2000;

  .modal-content {
    width: 95vw;
    max-width: 20rem;
    height: 90vh;
    max-height: 20rem;

    position: relative;
    overflow: auto;

    border-radius: 0.5em;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3em auto 4em;
    grid-template-areas:
      'modal-header'
      'modal-main'
      'modal-footer';

    header {
      grid-area: modal-header;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.625rem;
      background-color: d.$footer-header-bg-color;

      h3 {
        font-family: 'Cabin', sans-serif;
        font-weight: 700;
        font-size: 1.6em;
        color: d.$font-color-1;
      }

      .close-button {
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: -1rem;
        margin-left: 1rem;
        padding-right: 0;
      }
    }

    .modal-main {
      grid-area: modal-main;
      padding: 0.75rem 2rem 2.5rem 2rem;
      background-color: d.$background-color;
    }

    label {
      font-size: 0.875rem;
      line-height: 1.5;
      font-weight: 600;
      display: block;
      text-align: center;
    }

    input[type] {
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

    footer {
      grid-area: modal-footer;
      padding: 0.625rem;
      font-size: 0.875rem;
      background-color: d.$footer-header-bg-color;
      color: d.$font-color-1;
      display: flex;
      justify-content: space-between;
    }
  }

  .modal-buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
