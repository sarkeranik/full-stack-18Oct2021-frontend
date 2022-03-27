import api from './api'

export default {
  GetInitialRestaurantData: (itemCount) =>
    api
      .get(`/Restaurant/GetInitialRestaurantData?itemCount=${itemCount}`)
      .then((response) => response.data),
  GetRestaurantByName: (name) =>
    api
      .get(`/Restaurant/GetRestaurantByName?name=${name}`)
      .then((response) => response.data),
  GetRestaurantByDateTime: (dateTime) =>
    api
      .get(`/Restaurant/GetRestaurantByDateTime?dateTime=${dateTime}`)
      .then((response) => response.data),
  GetRestaurantByNameAndDatetime: (name, datetime) =>
    api
      .get(
        `/Restaurant/GetRestaurantByNameAndDatetime?name=${name}&dateTime=${datetime}`
      )
      .then((response) => response.data),

  RemoveCollectionItemForRestaurant: (name, collectionName) =>
    api
      .post('/Restaurant/RemoveCollectionItemForRestaurant', {
        name,
        collectionName,
      })
      .then((response) => response.data),
  AddRestaurantToCollection: (data) =>
    api
      .post('/Restaurant/AddRestaurantToCollection', {
        Name: data.Name,
        CollectionList: data.CollectionList,
      })
      .then((response) => response.data),
  SyncAllRestaurantsData: () =>
    api
      .get(`/Restaurant/SyncAllRestaurantsData`)
      .then((response) => response.data),
  get: (taskId) =>
    api.get(`/tasks/${taskId}`).then((response) => response.data),
  create: (title, dueTo) =>
    api
      .post('/api/tasks', {
        title,
        dueTo,
      })
      .then((response) => response.data),
}
