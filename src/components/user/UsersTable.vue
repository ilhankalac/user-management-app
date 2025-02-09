<script setup lang="ts">
import { useFetchUsers } from '@/composables/useFetchData'
import User from '@/models/User'
import router from '@/router'
import { onBeforeMount, ref } from 'vue'
import { useDisplay } from 'vuetify'

const { fetchUsers, users, ready, loading } = useFetchUsers()

const search = ref('')

const { smAndDown } = useDisplay()

const itemsPerPageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' }
]

const headers = [
  {
    title: 'Name',
    key: 'name',
    sortable: true
  },
  {
    title: 'Email',
    key: 'email',
    sortable: true
  },
  {
    title: 'Phone',
    key: 'phone',
    sortable: false
  },
  {
    title: 'Company',
    key: 'company.name',
    sortable: false
  }
]

function goToUserDetails(user: User) {
  router.push({ 
    name: 'UserDetails', 
    params: { 
      id: user.id
    } 
  })
}

onBeforeMount(async () => {
  await fetchUsers()
  ready.value = true
})
</script>

<template>
  <v-card 
    class="items-wrapper"
    variant="flat"
  >
    <v-divider class="mb-7" />

    <v-row>
      <v-col class="d-flex align-top">
        <v-icon
          class="mr-2"
          icon="mdi-account-group"
          size="20"
        />
        <div
          class="info-message"
          data-cy="user-management-description"
        >
          View and manage system users.
        </div>
      </v-col>
      <v-col
        class="d-flex"
        :class="smAndDown ? 'justify-center' : 'justify-end'"
        cols="12"
        md="8"
      >
      </v-col>
    </v-row>

    <v-data-table
      must-sort
      :items-per-page-options="itemsPerPageOptions"
      :items="users"
      :headers="headers"
      :loading="loading"
      :search="search"
      :items-length="users.length"
    >
      <template #item="{ item }">
        <tr 
          @click="goToUserDetails(item)"
          class="clickable-row"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.company?.name }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>


<style lang="scss" scoped>
.rounded-icon-background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #F2F2F2;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(var(--v-theme-info), 0.1);
  }
}
</style>