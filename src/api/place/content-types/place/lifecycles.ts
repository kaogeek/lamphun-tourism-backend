export default {
  beforeCreate(event) {
    const { data } = event.params;
    const location = data.location;

    if (data.localtion) {
      data.lat = location.lat;
      data.lng = location.lng;
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    const location = data.location;

    console.log(data);

    if (data.location) {
      data.lat = location.lat;
      data.lng = location.lng;
    }
  },
};