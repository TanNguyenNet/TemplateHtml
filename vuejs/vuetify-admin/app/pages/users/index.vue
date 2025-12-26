<template>
  <div>
    <CommonPageHeader title="Users" subtitle="Manage user accounts">
      <template #actions>
        <v-btn color="primary" prepend-icon="mdi-plus">
          Add User
        </v-btn>
      </template>
    </CommonPageHeader>

    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
        >
          <template #top>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              variant="outlined"
              density="compact"
              class="mb-4"
              style="max-width: 300px"
            />
          </template>

          <template #item.avatar="{ item }">
            <v-avatar size="32" color="primary">
              <span>{{ item.name.charAt(0) }}</span>
            </v-avatar>
          </template>

          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'Active' ? 'success' : 'error'"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.actions>
            <v-btn icon size="small" variant="text">
              <v-icon size="small">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" variant="text" color="error">
              <v-icon size="small">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~~/shared/types/user'

const search = ref('')

const headers = [
  { title: '', key: 'avatar', sortable: false, width: 50 },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' as const }
]

const users: Partial<User>[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' }
]
</script>
