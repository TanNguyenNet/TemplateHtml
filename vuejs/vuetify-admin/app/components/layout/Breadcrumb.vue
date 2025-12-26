<template>
  <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-4">
    <template #prepend>
      <v-icon icon="mdi-home" size="small" />
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(p => p)
  const items = [{ title: 'Home', to: '/', disabled: false }]
  
  let path = ''
  pathArray.forEach((segment, index) => {
    path += `/${segment}`
    items.push({
      title: segment.charAt(0).toUpperCase() + segment.slice(1),
      to: path,
      disabled: index === pathArray.length - 1
    })
  })
  
  return items
})
</script>
