<template>
  <nav>
    <ul>
      <li key="signup" class="button">
        <button>Sign Up</button>
      </li>
      <li key="login" class="button">
        <button>Log In</button>
      </li>
      <li key="browse" class="button">
        <router-link to="/browse">Find People</router-link>
      </li>
      <li key="about" class="button">
        <router-link to="/about">About Us</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
}
</script>

<style lang="scss">
nav {
  margin-right: 0.5rem;

  ul {
    display: flex;
    justify-content: flex-end;
    font-size: 0.875rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;

    li {
      display: inline;
    }
  }
}
</style>
