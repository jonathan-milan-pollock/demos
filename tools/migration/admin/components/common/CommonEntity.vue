<template>
  <article>
    <h5>{{ entityType }}/{{ slug }}</h5>
  </article>
</template>

<script lang="ts">
export default {
  props: ['entityType', 'slug'],
};
</script>
