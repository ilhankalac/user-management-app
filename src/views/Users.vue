<template>
  <div class="d-flex align-center justify-space-between mb-3">
    <h1
      class="text-primary"
      data-cy="user-management-heading"
    >
      User List Page
    </h1>
  </div>
  <UsersTable />
</template>

<script lang="ts" setup>
import UsersTable from '@/components/user/UsersTable.vue';
</script>