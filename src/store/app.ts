// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    contactItems: [] as string[],
    loadingItem: false,
    dataLoaded: false,
  }),
  // getters
  getters: {
    getLoading: (state) => state.loadingItem,
  },

  actions: {
    getItems() {
      this.loadingItem = true;
      setTimeout(() => { 
        const items = ['item 1', 'item 2'];
        this.contactItems = items;
        this.loadingItem = false;
        this.dataLoaded = true;
      }, 2000);
    }
  },
})
