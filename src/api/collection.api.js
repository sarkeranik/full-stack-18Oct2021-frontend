import api from './api'

export default {
  GetAllFavCollectionItemsForRestaurants: (name) =>
    api
      .get(`/Collection/GetCollectionByRestaurantName?restaurantName=${name}`)
      .then((response) => response.data),

  GetAllFavCollectionItems: () =>
    api
      .get(`/Collection/GetAllFavCollectionItems`)
      .then((response) => response.data),
}
