<script setup lang="ts">
import { useFetchUsers } from '@/composables/useFetchData'
import User from '@/models/User'
import router from '@/router'
import { onBeforeMount, ref } from 'vue'
import { useDisplay } from 'vuetify'
// import pinia
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const store = useAppStore()

const { loadingItem, contactItems, dataLoaded } = storeToRefs(store)

const { getItems } = store




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

function fetchContacts() {
  if(dataLoaded.value) return
  getItems()
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
      <v-col 
        class="d-flex"
        :class="smAndDown ? 'flex-column ga-2' : 'justify-space-between ga-10'"
      >
        <div class="d-flex align-center">
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
        </div>
        <v-text-field 
          v-model="search"
          label="Search by name, email, phone, or any other field..."
          variant="outlined"
          density="compact"
          :max-width="smAndDown ? '100%' : '500'"
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
        />
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
          class="clickable-row"
          @click="goToUserDetails(item)"
        >
          <td>
            <div class="rounded-icon-background">
              <v-icon
                icon="mdi-account"
                size="20"
              />
            </div>
          {{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.company?.name }}</td>

          <v-select
            :items="contactItems"
            :loading="loadingItem"
            :disabled="loadingItem"
            dense
            outlined
            hide-details
            class="mr-2"
            @click.stop="fetchContacts"
          />
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