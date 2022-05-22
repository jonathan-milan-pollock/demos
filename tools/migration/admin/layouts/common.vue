<template>
  <div class="container">
    <CommonLogo class="logo" />
    <CommonEntityTypesNav class="entity-types-nav" />
    <CommonEntitiesNav
      class="entities-nav"
      :entityType="$route?.params?.entityType"
    />
    <main class="main">
      <CommonEntity
        :entityType="$route?.params?.entityType"
        :slug="$route?.params?.slug"
      />
    </main>
    <div class="footer">
      <CommonFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-areas:
    'logo logo logo'
    'nav1 nav2 main'
    'footer footer footer';
  grid-template-columns: 5em 5em 1fr;
  grid-template-rows: 115px 1fr 2em;
  height: 100vh;
}

.logo {
  grid-area: logo;
}

.entity-types-nav {
  grid-area: nav1;
}

.entities-nav {
  grid-area: nav2;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
  align-self: end;
}
</style>
