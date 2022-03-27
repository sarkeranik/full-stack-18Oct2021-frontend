<template>
  <v-main class="overflow-hidden">
    <app-bar
      :background="'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'"
    ></app-bar>

    <v-container>
      <restaurant-search></restaurant-search>
    </v-container>
  </v-main>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
import RestaurantSearch from '@/components/RestaurantSearch.vue'

export default {
  data: () => ({
    loading: false,
    tasks: [],
    showTaskCreateDialog: false,
    showTaskUpdateDialog: false,
    task: null,
    snackbar: false,
    snackbar_text: null,
  }),
  methods: {
    showError(error) {
      this.snackbar_text = error
      this.snackbar = true
    },
  },
  components: {
    AppBar,
    RestaurantSearch,
  },
}
</script>

<style lang="scss"></style>
