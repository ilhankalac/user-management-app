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
    <v-card
      class="pb-8"
      max-width="600" 
    >
      <v-card-title 
        class="text-h5 mb-4 card-title"
      >
        User Details
      </v-card-title>

      <template v-if="loading">
        <v-skeleton-loader type="card" />
      </template>

      <template v-else-if="error">
        <v-alert type="error" text="Error loading user details" />
      </template>

      <template v-else-if="user">
        <v-list>
          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-account-box" />
            </template>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item>
          
          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-account" />
            </template>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-email" />
            </template>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-phone" />
            </template>
            <v-list-item-title>{{ user.phone }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-web" />
            </template>
            <v-list-item-title>{{ user.website }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-map-marker" />
            </template>
            <v-list-item-title>{{ formatAddress(user.address) }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.company">
            <template #prepend>
              <v-icon icon="mdi-office-building" />
            </template>
            <v-list-item-title>{{ user.company.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.company.catchPhrase }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </template>

      <template v-else>
        <v-alert type="error">User not found</v-alert>
      </template>
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