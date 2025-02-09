<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router'
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay()

const drawer = ref(false);
const items = ref([
  {
    title: 'Users',
    value: 'users',
    prependIcon: 'mdi-account-group',
  },
]);

const handleNavigation = (path: string) => {
  router.push({ path });
  drawer.value = false; 
};
</script>

<template>
  <v-card 
    class="elevation-0"
    :class="smAndDown ? 'pa-4' : 'pa-8'"
    style="height: 100%;"
  >
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="d-flex align-center">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <span>{{ $route.name || 'Users' }}</span>
        </v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :prepend-icon="item.prependIcon"
            :title="item.title"
            @click="handleNavigation(`/${item.value}`)"
            :active="$route.path === `/${item.value}`"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>