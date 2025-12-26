<template>
  <v-app>
    <v-main class="d-flex align-center justify-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" class="text-center">
            <h1 class="text-h1 font-weight-bold text-primary mb-4">
              {{ error?.statusCode || 500 }}
            </h1>
            <h2 class="text-h5 mb-4">
              {{ error?.statusMessage || 'Something went wrong' }}
            </h2>
            <p class="text-body-1 text-medium-emphasis mb-8">
              {{ error?.message || 'An unexpected error occurred.' }}
            </p>
            <v-btn color="primary" size="large" @click="handleError">
              <v-icon start>mdi-home</v-icon>
              Back to Home
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
