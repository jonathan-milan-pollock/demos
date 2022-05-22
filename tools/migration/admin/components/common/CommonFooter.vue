<template>
  <footer>
    <small class="copyright"
      >&copy;{{ year }} Dark Rush Photography - All Rights Reserved</small
    >
  </footer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
}
</style>
