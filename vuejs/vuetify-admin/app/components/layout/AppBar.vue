<template>
  <v-app-bar flat color="surface" class="border-b">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    
    <v-spacer />

    <!-- Search -->
    <v-text-field
      hide-details
      density="compact"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search..."
      variant="solo-filled"
      flat
      class="mr-4"
      style="max-width: 300px"
    />

    <!-- Theme Toggle -->
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <!-- Notifications -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-badge color="error" dot>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list width="300">
        <v-list-subheader>Notifications</v-list-subheader>
        <v-list-item
          v-for="n in 3"
          :key="n"
          prepend-icon="mdi-message"
        >
          <v-list-item-title>Notification {{ n }}</v-list-item-title>
          <v-list-item-subtitle>Just now</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- User Menu -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="ml-2">
          <v-avatar color="primary" size="32">
            <span class="text-caption">AD</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item prepend-icon="mdi-account" to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-cog" to="/settings">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item prepend-icon="mdi-logout" @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

defineEmits<{
  'toggle-drawer': []
}>()

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

const logout = () => {
  navigateTo('/auth/login')
}
</script>
