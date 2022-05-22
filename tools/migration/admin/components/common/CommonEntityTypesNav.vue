<template>
  <nav class="nav">
    <div>
      <h2>Entity Types</h2>
      <ul class="nav-items">
        <li v-for="link in entityTypeLinks" :key="link.to">
          <NuxtLink :to="link.to">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
export interface EntityTypeLink {
  readonly to: string;
  readonly text: string;
}

export default {
  data() {
    return {
      entityTypeLinks: [
        { to: '/about', text: 'About' },
        { to: '/best-of', text: 'BestOf' },
        { to: '/destinations', text: 'Destinations' },
        { to: '/favorites', text: 'Favorites' },
        { to: '/review-media', text: 'Review Media' },
        { to: '/image-videos', text: 'Image Videos' },
        { to: '/events', text: 'Events' },
        { to: '/photo-of-the-week', text: 'Photo of the Week' },
      ] as EntityTypeLink[],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  list-style: none;
}

.nav-items {
  padding-left: 0;
  list-style-type: none;
}

.nav-items > li + li {
  margin-top: 0.2em;
}
</style>
