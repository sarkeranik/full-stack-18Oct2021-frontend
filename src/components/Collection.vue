<template>
  <v-main class="overflow-hidden">
    <app-bar
      :background="'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'"
    ></app-bar>

    <v-container>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="CollectionItems"
          :search="search"
        ></v-data-table>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import CollectionApiService from '@/api/collection.api.js'
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'RestaurantSearch',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Restaurant Name',
          align: 'start',
          filterable: true,
          value: 'restaurantName',
        },
        { text: 'Favorite Collection Name', value: 'favoriteCollectionName' },
      ],
      CollectionItems: [],
    }
  },
  methods: {
    getAllFavCollectionItems: function () {
      console.log('getAllFavCollectionItems')

      CollectionApiService.GetAllFavCollectionItems()
        .then((response) => {
          var availableDateTimes = response.Data || response.data
          if (
            availableDateTimes != 'undefined' &&
            availableDateTimes &&
            response.data.length > 0
          ) {
            this.CollectionItems = response.Data || response.data
            console.log(this.CollectionItems)
          }
        })
        .catch((error) => {
          if (error.toJSON().message === 'Network Error') {
            this.snackbar = true
            this.text = 'Please configure the backend api server correctly'
          } else {
            console.log(error)
          }
        })
        .finally(() => {})
    },
  },
  computed: {},
  beforeMount() {
    this.getAllFavCollectionItems()
  },
  components: {
    AppBar,
  },
}
</script>

<style scoped></style>
