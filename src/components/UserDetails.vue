<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchUser } from '@/composables/useFetchData'

const route = useRoute()
const { fetchUser, user, loading } = useFetchUser()

onBeforeMount(async () => {
  if (typeof route.params.id === 'string') {
    await fetchUser(route.params.id)
  }
})
</script>

<template>
  <v-container 
    fluid 
    class="ma-0 pa-0"
  >
    <v-card variant="flat">
      <v-card-title class="text-h5 mb-4">User Details</v-card-title>

      <template v-if="loading">
        <v-skeleton-loader type="card" />
      </template>

      <template v-else-if="user">
        <v-list>
          <v-list-item>
            <template #prepend>
              <v-icon icon="mdi-account" />
            </template>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
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

          <v-list-item v-if="user.company?.name">
            <template #prepend>
              <v-icon icon="mdi-office-building" />
            </template>
            <v-list-item-title>{{ user.company.name }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-btn 
            variant="plain"
            @click="$router.push('/users')"
          >
          <v-icon 
            icon="mdi-arrow-left"
            class="mr-2"
          />
            Back
          </v-btn>
        </v-card-actions>
      </template>

      <template v-else>
        <v-alert type="error">User not found</v-alert>
      </template>
    </v-card>
  </v-container>
</template>