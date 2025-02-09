<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetchUser } from '@/composables/useFetchData'
import { IAddress } from '@/types/other'

const route = useRoute()
const router = useRouter()
const { fetchUser, user, loading, error } = useFetchUser()

onBeforeMount(async () => {
  if (typeof route.params.id === 'string') {
    await fetchUser(route.params.id)
  }
})

const formatAddress = (address: IAddress): string => {
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`
}
</script>

<template>
  <v-container fluid class="ma-0 pa-0">
    <v-btn 
      variant="plain"
      class="mb-2"
      width="50"
      @click="router.push('/users')"
    >
      <v-icon 
        icon="mdi-arrow-left"
        class="mr-2"
      />
      Back
    </v-btn>
    
    <v-card class="pb-8" max-width="600">
      <v-card-title class="text-h5 mb-4 card-title">
        User Details
      </v-card-title>

      <v-skeleton-loader 
        v-if="loading" 
        type="card" 
      />
      
      <v-alert 
        v-else-if="error" 
        type="error" 
        text="Error loading user details" 
      />
      
      <v-alert 
        v-else-if="!user" 
        type="error">
        User not found
      </v-alert>
      
      <v-list v-else>
        <v-list-item>
          <v-icon icon="mdi-account-box" class="mr-2" />
          {{ user.name }}
        </v-list-item>
        
        <v-list-item>
          <v-icon icon="mdi-account" class="mr-2" />
          {{ user.username }}
        </v-list-item>

        <v-list-item>
          <v-icon icon="mdi-email" class="mr-2" />
          {{ user.email }}
        </v-list-item>

        <v-list-item>
          <v-icon icon="mdi-phone" class="mr-2" />
          {{ user.phone }}
        </v-list-item>

        <v-list-item>
          <v-icon icon="mdi-web" class="mr-2" />
          {{ user.website }}
        </v-list-item>

        <v-list-item>
          <v-icon icon="mdi-map-marker" class="mr-2" />
          {{ formatAddress(user.address) }}
        </v-list-item>

        <v-list-item v-if="user.company">
          <div class="d-flex align-center">
            <v-icon icon="mdi-office-building" class="mr-2" />
            <div>
              <div class="font-weight-medium">{{ user.company.name }}</div>
              <div class="text-caption text-muted">{{ user.company.catchPhrase }}</div>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.card-title {
  background-color: rgba(var(--v-theme-primary));
  color: white;
  font-size: 1.2rem !important;
}
</style>