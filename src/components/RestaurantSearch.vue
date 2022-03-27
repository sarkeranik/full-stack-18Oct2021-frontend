<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card color="light-blue darken-3" dark>
        <v-card-title class="text-h5 black lighten-3"> Name </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="searchByName"
            :items="initialRestaurantItems"
            :loading="isLoading"
            color="white"
            hide-no-data
            hide-selected
            label="Restaurants"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!searchByName"
            color="primary"
            @click="searchByName = null"
          >
            Clear
            <v-icon right> mdi-close-circle </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card color="green lighten-2" dark>
        <v-card-title class="text-h5 black lighten-3">
          Date and Time
        </v-card-title>
        <v-layout justify-center style="background: #00897b">
          <v-datetime-picker label="Select Datetime" v-model="searchByDate">
          </v-datetime-picker>
        </v-layout>
      </v-card>
    </v-col>
    <v-container fluid>
      <v-card v-show="showEmptyCard">
        <v-card>
          <v-card-text>
            <p class="ma-0 pa-0 text-h5">
              No Available Restaurant's Date Time to Show
            </p>
          </v-card-text>
        </v-card>
      </v-card>
      <br />
      <v-row dense>
        <v-col
          v-for="restaurant in restaurantItems"
          :key="restaurant.id"
          :cols="6"
        >
          <restaurant-card
            @add-to-collection-button-clicked="addRestaurantToCollection"
            :restaurantDetails="restaurant"
            :favCollection="restaurant.CollectionModels"
          ></restaurant-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import RestaurantCard from '@/components/RestaurantCard.vue'
import RestaurantApiService from '@/api/restaurant.api.js'
import moment from 'moment'

export default {
  name: 'RestaurantSearch',
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    showEmptyCard: true,
    searchByName: null,
    searchByDate: null,
    restaurantItems: [],
    initialRestaurantItems: [],

    snackbar: false,
    text: '',
  }),
  methods: {
    getInitialRestaurantItems: function () {
      this.isLoading = true

      RestaurantApiService.GetInitialRestaurantData(999999)
        .then((response) => {
          if (response.Succeeded || response.succeeded) {
            this.initialRestaurantItems = response.Data || response.data
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
        .finally(() => {
          this.isLoading = false
        })
    },
    addRestaurantToCollection: function (data) {
      if (data.Name && data.CollectionList.length > 0) {
        RestaurantApiService.AddRestaurantToCollection(data)
          .then((response) => {
            if (response.Succeeded || response.succeeded) {
              this.snackbar = true
              this.text = response.Message || response.message
            }
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    getRestaurantByNameAndDatetime: function (name, dateTime) {
      this.isLoading = true
      RestaurantApiService.GetRestaurantByNameAndDatetime(name, dateTime)
        .then((response) => {
          var availableDateTimes = response.Data || response.data
          if (
            availableDateTimes != 'undefined' &&
            availableDateTimes &&
            response.data.length > 0
          ) {
            this.restaurantItems = availableDateTimes
            this.snackbar = true
            this.text = response.Message || response.message
          } else {
            this.snackbar = true
            this.text = response.Message || response.message
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
        .finally(() => {
          this.isLoading = false
        })
    },
    getRestaurantByDatetime: function (datetime) {
      this.isLoading = true
      RestaurantApiService.GetRestaurantByDateTime(datetime)
        .then((response) => {
          if (response.Succeeded || response.succeeded) {
            this.restaurantItems = response.Data || response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getRestaurantByName: function (name) {
      this.isLoading = true
      RestaurantApiService.GetRestaurantByName(name)
        .then((response) => {
          if (response.Succeeded || response.succeeded) {
            this.restaurantItems = response.Data || response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
  computed: {},

  watch: {
    searchByDate(val) {
      if (!val) return
      val = moment(val).format('MM-DD-YYYY HH:mm')
      this.restaurantItems = []
      if (this.searchByName) {
        this.getRestaurantByNameAndDatetime(this.searchByName, val)
      }
    },
    restaurantItems(val) {
      if (!val) return

      if (val.length > 0) {
        this.showEmptyCard = false
      } else {
        this.showEmptyCard = true
      }
    },
  },
  beforeMount() {
    this.getInitialRestaurantItems()
  },
  unmounted() {
    localStorage.clear()
  },
  components: { RestaurantCard },
}
</script>

<style scoped></style>
