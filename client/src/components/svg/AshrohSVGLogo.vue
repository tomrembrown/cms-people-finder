<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30.43 42.62"
    :width="size"
    :height="size"
    aria-labelledby="Ashroh Enterprises Logo"
  >
    <defs>
      <linearGradient
        id="a"
        x1="-280.24"
        y1="416.65"
        x2="-279.24"
        y2="416.65"
        gradientTransform="matrix(27.58 18.01 12.86 -38.62 2366.32 21152.59)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#da6e2a" />
        <stop offset="1" stop-color="#e39e5a" />
      </linearGradient>
    </defs>
    <path
      d="M30.37 15.15 15.22 0 .07 15.15 15.22 30.3zM15.22 8l7.12 7.13-7.12 7.13-7.13-7.11zm15.21 11.93-7.54 7.55v15.14h7.54zM7.54 27.48 0 19.93v22.69h7.54z"
      fill="url(#a)"
    />
  </svg>
</template>

<script>
export default {
  name: 'AshrohSVGLogo',
  props: {
    size: { type: [Number, String], default: 25 },
  },
}
</script>

<style lang="scss"></style>
