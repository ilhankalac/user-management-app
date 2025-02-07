<template>
  <v-card 
    class="elevation-0"
    style="height: 100%;"
  >
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Users</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>

      <v-main>
          <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const drawer = ref(false);
const group = ref<string | null>(null);
const items = ref([
  {
    title: 'Users',
    value: 'users',
  },
]);
</script>

<style>
:root {
  height: 100%;
}
body {
	/* background-color: rgba(var(--v-theme-primary)); */
  font-size: 1rem !important;
  /* Smaller font size for mobile devices */
  @media (max-width: 600px) {
    font-size: 0.9rem !important;
  }
}
</style>