<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

interface IUser {
  id: number
  name: string
  email: string
  phone: string
  company: {
    name: string
  }
}

interface TableFilters {
  page: number
  itemsPerPage: number
  sortBy: any
  search: string
}

const users = ref<IUser[]>([
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    company: { name: "Romaguera-Crona" }
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    company: { name: "Deckow-Crist" }
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    company: { name: "Romaguera-Jacobson" }
  }
])

const router = useRouter()
const { smAndDown } = useDisplay()

const loading = ref(false)
const ready = ref(true)
const search = ref('')

const itemsPerPageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' }
]

const filters = ref<TableFilters>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [{ key: 'name', order: 'asc' }],
  search: ''
})

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
    sortable: true
  }
]

function goToUserDetails(user: IUser) {
  router.push({ 
    name: 'userDetails', 
    params: { 
      id: user.id
    } 
  })
}

async function handleSearch(criteria: { search: string }) {
  search.value = criteria.search
}

onMounted(() => {
  ready.value = true
})
</script>

<template>
  <v-card class="items-wrapper">
    <v-divider class="mb-7" />

    <v-row class="my-3 px-6 d-flex align-center">
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

    <template v-if="!ready">
      <v-skeleton-loader
        class="mt-3 px-6"
        type="table"
        loading
      />
    </template>
    <v-data-table-server
      v-else
      v-model:page="filters.page"
      v-model:items-per-page="filters.itemsPerPage"
      v-model:sort-by="filters.sortBy"
      class="mt-3 px-6"
      must-sort
      :items-per-page-options="itemsPerPageOptions"
      :items="users"
      :headers="headers"
      :loading="loading"
      :search="search"
      :items-length="users.length"
    >
      <template #item.name="{ item }">
        <span
          class="user-name"
          @click="goToUserDetails(item)"
        >
          {{ item.name }}
        </span>
      </template>

      <template #item.email="{ item }">
        {{ item.email }}
      </template>

      <template #item.phone="{ item }">
        {{ item.phone }}
      </template>

      <template #item.company.name="{ item }">
        {{ item.company.name }}
      </template>
    </v-data-table-server>
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

.user-name {
  color: rgba(var(--v-theme-info));
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>