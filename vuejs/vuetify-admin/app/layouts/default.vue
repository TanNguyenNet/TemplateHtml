<template>
  <v-app>
    <LayoutNavigationDrawer v-model:rail="rail" />
    <LayoutAppBar @toggle-drawer="rail = !rail" />
    <v-main>
      <v-container fluid class="pa-6">
        <LayoutBreadcrumb />
        <slot />
      </v-container>
    </v-main>
    <LayoutFooter />
  </v-app>
</template>

<script setup lang="ts">
const rail = ref(false)
</script>
