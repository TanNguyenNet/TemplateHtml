<template>
  <v-card>
    <v-card-title>Recent Activity</v-card-title>
    <v-card-text class="pa-0">
      <v-list>
        <v-list-item
          v-for="activity in activities"
          :key="activity.id"
          :prepend-avatar="activity.avatar"
        >
          <v-list-item-title>{{ activity.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const activities = [
  { id: 1, title: 'New user registered', time: '5 minutes ago', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, title: 'Order #1234 completed', time: '15 minutes ago', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, title: 'Payment received', time: '1 hour ago', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, title: 'New comment on post', time: '2 hours ago', avatar: 'https://i.pravatar.cc/40?img=4' }
]
</script>
