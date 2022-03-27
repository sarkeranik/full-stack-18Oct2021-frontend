<template>
  <v-card>
    <v-layout justify-end>
      <v-flex xs6>
        <v-select
          dir="rtl"
          v-model="selectedCollection"
          :items="collectionsNames"
          attach
          chips
          label="Add to your collections"
          multiple
        ></v-select>
      </v-flex>
      <v-btn x-small color="secondary" dark v-on:click="copyURL"> Share </v-btn>
    </v-layout>

    <v-card-text>
      <div>#{{ restaurantDetails.id }}</div>
      <p class="ma-0 pa-0 text-h5 text--primary">
        {{ restaurantDetails.name || restaurantDetails.Name }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title
            >Available:
            {{
              restaurantDetails.timePeriod || restaurantDetails.TimePeriod
            }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import CollectionApiService from '@/api/collection.api.js'

export default {
  name: 'RestaurantCard',
  props: ['restaurantDetails', 'favCollection'],
  data: () => ({
    collectionsNames: ['VegetarianFavorites', 'MeatLovers'],
    selectedCollection: [],
  }),
  mounted: function () {
    this.getAllFavCollectionItemsForRestaurants(this.restaurantDetails.name)
  },
  methods: {
    getAllFavCollectionItemsForRestaurants: function (name) {
      this.isLoading = true
      CollectionApiService.GetAllFavCollectionItemsForRestaurants(name)
        .then((response) => {
          var collectionItems = response.Data || response.data
          if (
            collectionItems != 'undefined' &&
            collectionItems &&
            collectionItems.length > 0
          ) {
            this.selectedCollection = collectionItems
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
    async copyURL() {
      try {
        await navigator.clipboard.writeText('http://localhost:8080/collection')
        alert('Link Copied! Paste it to your friend ;)')
      } catch ($e) {
        alert('Cannot copy')
      }
    },
  },
  watch: {
    selectedCollection() {
      var selFavCol = this.selectedCollection
      var namesWithoutSpaces = selFavCol.map(function (el) {
        return el.replace(' ', '')
      })
      var data = {
        Name: this.restaurantDetails.name,
        CollectionList: namesWithoutSpaces,
      }

      this.$emit('add-to-collection-button-clicked', data)
    },
  },
}
</script>
