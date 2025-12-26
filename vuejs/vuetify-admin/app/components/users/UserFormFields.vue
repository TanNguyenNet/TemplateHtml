<template>
  <div>
    <!-- Name Field -->
    <v-text-field
      v-model="model.name"
      label="Full Name"
      prepend-inner-icon="mdi-account"
      variant="outlined"
      :rules="[rules.required]"
      class="mb-4"
    />

    <!-- Email Field -->
    <v-text-field
      v-model="model.email"
      label="Email Address"
      type="email"
      prepend-inner-icon="mdi-email"
      variant="outlined"
      :rules="[rules.required, rules.email]"
      class="mb-4"
    />

    <!-- Password Field -->
    <v-text-field
      v-if="showPassword"
      v-model="model.password"
      label="Password"
      :type="showPasswordText ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPasswordText ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPasswordText = !showPasswordText"
      variant="outlined"
      :rules="isCreate ? [rules.required, rules.minLength(8)] : [rules.minLength(8)]"
      :hint="isCreate ? 'Required, minimum 8 characters' : 'Leave empty to keep current password'"
      persistent-hint
      class="mb-4"
    />

    <!-- Role Field -->
    <v-select
      v-model="model.role"
      label="Role"
      :items="roleOptions"
      prepend-inner-icon="mdi-shield-account"
      variant="outlined"
      :rules="[rules.required]"
      class="mb-4"
    />

    <!-- Status Field (Edit only) -->
    <v-select
      v-if="showStatus"
      v-model="model.status"
      label="Status"
      :items="statusOptions"
      prepend-inner-icon="mdi-checkbox-marked-circle"
      variant="outlined"
      :rules="[rules.required]"
      class="mb-4"
    />
  </div>
</template>

<script setup lang="ts">
import type { UserRole, UserStatus } from '~~/shared/types/user'

interface UserFormModel {
  name: string
  email: string
  password?: string
  role: UserRole | null
  status?: UserStatus | null
}

const props = defineProps<{
  isCreate?: boolean
  showPassword?: boolean
  showStatus?: boolean
}>()

const model = defineModel<UserFormModel>({ required: true })

const showPasswordText = ref(false)

const roleOptions: UserRole[] = ['Admin', 'Editor', 'Viewer']
const statusOptions: UserStatus[] = ['Active', 'Inactive', 'Pending']

const rules = {
  required: (v: string | null) => !!v || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Invalid email format',
  minLength: (min: number) => (v: string) => !v || v.length >= min || `Minimum ${min} characters`
}
</script>
