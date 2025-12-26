<template>
  <v-navigation-drawer
    permanent
    :rail="rail"
    :width="300"
    :rail-width="72"
    color="surface"
    class="border-e"
  >
    <!-- Logo Area -->
    <div 
      class="d-flex align-center" 
      :class="rail ? 'justify-center' : 'px-4'"
      style="height: 64px;"
    >
      <v-avatar color="primary" size="40">
        <span class="text-h6">VA</span>
      </v-avatar>
      <span v-if="!rail" class="text-h6 font-weight-bold ml-3">
        Vuetify Admin
      </span>
    </div>

    <v-divider />

    <!-- Menu Items -->
    <v-list nav density="compact">
      <!-- Dashboard -->
      <v-list-item to="/" prepend-icon="mdi-view-dashboard">
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <!-- Users Group - Show as group when expanded -->
      <template v-if="!rail">
        <v-list-group value="Users">
          <template #activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-group">
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>
          </template>
          
          <v-list-item to="/users" prepend-icon="mdi-format-list-bulleted">
            <v-list-item-title>List</v-list-item-title>
          </v-list-item>
          
          <v-list-item to="/users/create" prepend-icon="mdi-plus">
            <v-list-item-title>Create</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>

      <!-- Popup menu when rail mode -->
      <template v-else>
        <v-menu location="end" open-on-hover :close-on-content-click="true">
          <template #activator="{ props }">
            <v-list-item 
              v-bind="props" 
              prepend-icon="mdi-account-group"
              :active="$route.path.startsWith('/users')"
            />
          </template>
          <v-list density="compact" nav>
            <v-list-subheader>Users</v-list-subheader>
            <v-list-item to="/users" prepend-icon="mdi-format-list-bulleted">
              <v-list-item-title>List</v-list-item-title>
            </v-list-item>
            <v-list-item to="/users/create" prepend-icon="mdi-plus">
              <v-list-item-title>Create</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <!-- Settings -->
      <v-list-item to="/settings" prepend-icon="mdi-cog">
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const rail = defineModel<boolean>('rail', { default: false })
</script>
