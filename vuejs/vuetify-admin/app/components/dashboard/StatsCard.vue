<template>
  <v-card class="hover-scale">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <div>
          <p class="text-caption text-medium-emphasis mb-1">{{ title }}</p>
          <h3 class="text-h4 font-weight-bold">{{ value }}</h3>
          <p class="text-caption mt-2" :class="trendColor">
            <v-icon size="small">{{ trendIcon }}</v-icon>
            {{ trend }} vs last month
          </p>
        </div>
        <v-avatar :color="color" size="56">
          <v-icon size="32" color="white">{{ icon }}</v-icon>
        </v-avatar>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string
  icon: string
  color: string
  trend: string
}>()

const isPositive = computed(() => props.trend.startsWith('+'))
const trendColor = computed(() => isPositive.value ? 'text-success' : 'text-error')
const trendIcon = computed(() => isPositive.value ? 'mdi-trending-up' : 'mdi-trending-down')
</script>
