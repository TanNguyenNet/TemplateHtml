<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <!-- Placeholder for chart -->
      <div class="d-flex align-center justify-center" style="height: 300px;">
        <div class="text-center text-medium-emphasis">
          <v-icon size="64" class="mb-4">mdi-chart-line</v-icon>
          <p>Chart component will be integrated here</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
