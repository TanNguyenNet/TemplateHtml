<template>
  <v-card class="pa-4">
    <v-card-title class="text-center">
      <v-avatar color="primary" size="64" class="mb-4">
        <span class="text-h5">VA</span>
      </v-avatar>
      <h1 class="text-h5">Welcome Back</h1>
      <p class="text-body-2 text-medium-emphasis">Sign in to your account</p>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleLogin" ref="formRef">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          :rules="[rules.required, rules.email]"
          class="mb-4"
        />
        
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          :rules="[rules.required]"
          class="mb-4"
        />

        <div class="d-flex justify-space-between align-center mb-6">
          <v-checkbox v-model="remember" label="Remember me" hide-details />
          <NuxtLink to="/auth/forgot-password" class="text-primary text-decoration-none">
            Forgot password?
          </NuxtLink>
        </div>

        <v-btn
          type="submit"
          block
          size="large"
          color="primary"
          :loading="loading"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <span class="text-body-2">Don't have an account?</span>
      <NuxtLink to="/auth/register" class="text-primary text-decoration-none ml-1">
        Sign up
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)
const loading = ref(false)
const formRef = ref()

const rules = {
  required: (v: string) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Invalid email format'
}

const handleLogin = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    // TODO: Implement actual login
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo('/')
  } finally {
    loading.value = false
  }
}
</script>
