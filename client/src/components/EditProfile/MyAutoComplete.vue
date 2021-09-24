<template>
  <span class="myautocomplete">
    <input type="text" v-model="searchText" @keyup="changeText" />
    <ul v-if="open" class="myautocomplete__suggestionlist">
      <li
        v-for="suggestion in matches"
        :value="suggestion"
        :key="suggestion"
        @mousedown.prevent
        @click="suggestionSelected(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </span>
</template>

<script>
export default {
  name: 'MyAutoComplete',
  props: {
    value: null,
    options: {
      type: Object,
      required: true,
    },
  },
  emits: ['selectionMade'],
  data() {
    return {
      searchText: '',
      selectedOption: null,
      open: false,
      matches: [],
    }
  },
  methods: {
    changeText() {
      let results = []
      const searchTextTrimmedUpper = this.searchText.trim().toUpperCase()
      if (searchTextTrimmedUpper.length >= 3) {
        for (let key in this.options) {
          if (
            this.options[key].toUpperCase().indexOf(searchTextTrimmedUpper) !==
            -1
          ) {
            results.push(this.options[key])
          }
        }
      }
      if (results.length > 0) this.open = true
      this.matches = results
    },
    suggestionSelected(suggestion) {
      this.open = false
      this.searchText = ''
      this.$emit('selectionMade', suggestion)
    },
  },
}
</script>

<style lang="scss">
.myautocomplete {
  display: inline-block;
  position: relative;
}
.myautocomplete__suggestionlist {
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #ddd;
  list-style: none;
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 2;

  li {
    cursor: pointer;
  }

  li:hover {
    color: #fff;
    background-color: #ccc;
  }
}
</style>
