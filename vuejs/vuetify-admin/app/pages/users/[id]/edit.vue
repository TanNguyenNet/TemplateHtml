<template>
  <div>
    <CommonPageHeader title="Edit User" :subtitle="`Editing: ${formData.name || 'Loading...'}`">
      <template #actions>
        <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="navigateTo('/users')">
          Back
        </v-btn>
      </template>
    </CommonPageHeader>

    <v-card class="mx-auto" max-width="600">
      <v-card-text v-if="loadingUser" class="pa-6">
        <div class="d-flex justify-center align-center" style="min-height: 300px">
          <v-progress-circular indeterminate color="primary" size="48" />
        </div>
      </v-card-text>

      <v-card-text v-else class="pa-6">
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <UsersUserFormFields
            v-model="formData"
            :is-create="false"
            :show-password="true"
            :show-status="true"
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
              :loading="saving"
              prepend-icon="mdi-content-save"
            >
              Save Changes
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { UserRole, UserStatus } from '~~/shared/types/user'

interface EditUserForm {
  name: string
  email: string
  password?: string
  role: UserRole | null
  status: UserStatus | null
}

const route = useRoute()
const formRef = ref()
const loadingUser = ref(true)
const saving = ref(false)

const formData = ref<EditUserForm>({
  name: '',
  email: '',
  password: '',
  role: null,
  status: null
})

// Mock user data - replace with API call
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' as UserRole, status: 'Active' as UserStatus },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' as UserRole, status: 'Active' as UserStatus },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' as UserRole, status: 'Inactive' as UserStatus }
]

const loadUser = async () => {
  loadingUser.value = true
  try {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const userId = Number(route.params.id)
    const user = mockUsers.find(u => u.id === userId)
    
    if (user) {
      formData.value = {
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        status: user.status
      }
    } else {
      // User not found, redirect back
      navigateTo('/users')
    }
  } finally {
    loadingUser.value = false
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  saving.value = true
  try {
    // TODO: Implement API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('User updated:', {
      id: route.params.id,
      ...formData.value
    })
    
    navigateTo('/users')
  } catch (error) {
    console.error('Failed to update user:', error)
  } finally {
    saving.value = false
  }
}

// Load user data on mount
onMounted(() => {
  loadUser()
})
</script>
