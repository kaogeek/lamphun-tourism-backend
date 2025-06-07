function patchData(event: any) {
  const { data } = event.params;
  const location = data.location;

  if (data.localtion) {
    data.lat = location.lat;
    data.lng = location.lng;
  }
}

export default {
  beforeCreate(event) {
    patchData(event);
  },
  beforeCreateMany(event) {
    const { data } = event.params;

    for (const entry of data) {
      patchData(entry);
    }
  },
  beforeUpdate(event) {
    patchData(event);
  },
  beforeUpdateMany(event) {
    const { data } = event.params;

    for (const entry of data) {
      patchData(entry);
    }
  },
};
