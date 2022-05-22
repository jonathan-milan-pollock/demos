<template>
  <nav class="nav" v-if="entityType">
    <div>
      <h4>{{ entityType }}</h4>
      <ul class="nav-items">
        <li v-for="link in entityLinks" :key="link.name">
          <NuxtLink :to="link.to">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
export interface EntityLink {
  readonly to: string;
  readonly text: string;
}

export default {
  props: ['entityType'],
  data() {
    return {
      entityLinks: [
        { to: '/about/dark-rush', text: 'Dark Rush' },
        { to: '/about/milan-pollock', text: 'Milan Pollock' },
      ] as EntityLink[],
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
