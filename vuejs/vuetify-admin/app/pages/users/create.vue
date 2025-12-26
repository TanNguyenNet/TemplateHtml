<template>
  <div>
    <CommonPageHeader title="Create User" subtitle="Add a new user to the system">
      <template #actions>
        <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="navigateTo('/users')">
          Back
        </v-btn>
      </template>
    </CommonPageHeader>

    <v-card class="mx-auto" max-width="600">
      <v-card-text class="pa-6">
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <UsersUserFormFields
            v-model="formData"
            :is-create="true"
            :show-password="true"
            :show-status="false"
          />

          <v-divider class="my-6" />

          <div class="d-flex justify-end gap-3">
            <v-btn
              variant="text"
              @click="navigateTo('/users')"
            >
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
              prepend-icon="mdi-check"
            >
              Create User
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { ref } from 'vue'
import type { UserRole } from '~~/shared/types/user'

interface CreateUserForm {
  name: string
  email: string
  password: string
  role: UserRole | null
}

const formRef = ref()
const loading = ref(false)

const formData = ref<CreateUserForm>({
  name: '',
  email: '',
  password: '',
  role: null
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    // TODO: Implement API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    console.log('User created:', formData.value)
    
    navigateTo('/users')
  } catch (error) {
    console.error('Failed to create user:', error)
  } finally {
    loading.value = false
  }
}
</script>
