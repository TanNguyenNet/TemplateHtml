<template>
  <v-card class="pa-4">
    <v-card-title class="text-center">
      <v-avatar color="primary" size="64" class="mb-4">
        <v-icon size="32">mdi-lock-reset</v-icon>
      </v-avatar>
      <h1 class="text-h5">Forgot Password?</h1>
      <p class="text-body-2 text-medium-emphasis">
        Enter your email to reset your password
      </p>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleReset" ref="formRef">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          :rules="[rules.required, rules.email]"
          class="mb-6"
        />

        <v-btn
          type="submit"
          block
          size="large"
          color="primary"
          :loading="loading"
        >
          Send Reset Link
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <NuxtLink to="/auth/login" class="text-primary text-decoration-none">
        <v-icon size="small">mdi-arrow-left</v-icon>
        Back to login
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const loading = ref(false)
const formRef = ref()

const rules = {
  required: (v: string) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Invalid email format'
}

const handleReset = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Show success message
  } finally {
    loading.value = false
  }
}
</script>
