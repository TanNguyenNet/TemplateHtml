<template>
  <div>
    <CommonPageHeader title="Settings" subtitle="Manage your preferences" />

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Appearance</v-card-title>
          <v-card-text>
            <v-switch
              v-model="darkMode"
              label="Dark Mode"
              color="primary"
              @update:model-value="toggleTheme"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Notifications</v-card-title>
          <v-card-text>
            <v-switch
              v-model="emailNotifications"
              label="Email Notifications"
              color="primary"
            />
            <v-switch
              v-model="pushNotifications"
              label="Push Notifications"
              color="primary"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const darkMode = ref(theme.global.current.value.dark)
const emailNotifications = ref(true)
const pushNotifications = ref(false)

const toggleTheme = (value: boolean) => {
  theme.global.name.value = value ? 'dark' : 'light'
}
</script>
