<template>
  <v-card class="pa-4">
    <v-card-title class="text-center">
      <v-avatar color="primary" size="64" class="mb-4">
        <span class="text-h5">VA</span>
      </v-avatar>
      <h1 class="text-h5">Create Account</h1>
      <p class="text-body-2 text-medium-emphasis">Get started with your account</p>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleRegister" ref="formRef">
        <v-text-field
          v-model="name"
          label="Full Name"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          :rules="[rules.required]"
          class="mb-4"
        />

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
          :rules="[rules.required, rules.minLength]"
          class="mb-4"
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-check"
          variant="outlined"
          :rules="[rules.required, rules.match]"
          class="mb-6"
        />

        <v-btn
          type="submit"
          block
          size="large"
          color="primary"
          :loading="loading"
        >
          Create Account
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <span class="text-body-2">Already have an account?</span>
      <NuxtLink to="/auth/login" class="text-primary text-decoration-none ml-1">
        Sign in
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const loading = ref(false)
const formRef = ref()

const rules = {
  required: (v: string) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Invalid email format',
  minLength: (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
  match: (v: string) => v === password.value || 'Passwords do not match'
}

const handleRegister = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo('/auth/login')
  } finally {
    loading.value = false
  }
}
</script>
