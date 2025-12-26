<template>
  <div>
    <CommonPageHeader title="Dashboard" subtitle="Welcome back, Admin!" />
    
    <!-- Stats Row -->
    <v-row class="mb-6">
      <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
        <DashboardStatsCard
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
          :trend="stat.trend"
        />
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row>
      <v-col cols="12" lg="8">
        <DashboardChartCard title="Revenue Overview" />
      </v-col>
      <v-col cols="12" lg="4">
        <DashboardActivityList />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { title: 'Total Users', value: '1,234', icon: 'mdi-account-group', color: 'primary', trend: '+12%' },
  { title: 'Revenue', value: '$45,678', icon: 'mdi-currency-usd', color: 'success', trend: '+8%' },
  { title: 'Orders', value: '567', icon: 'mdi-cart', color: 'warning', trend: '+23%' },
  { title: 'Visitors', value: '8,901', icon: 'mdi-eye', color: 'info', trend: '+5%' }
]
</script>
