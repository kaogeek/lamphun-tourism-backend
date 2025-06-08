async function patchData(event: any) {
  const { data } = event.params;
  const location = data.location;

  if (data.localtion) {
    data.lat = location.lat;
    data.lng = location.lng;
  }

  const defaultLocale = await strapi
    .plugin("i18n")
    .service("locales")
    .getDefaultLocale();

  if (data.locale && data.locale !== defaultLocale) {
    data.slug = null;
  }
}

export default {
  async beforeCreate(event) {
    await patchData(event);
  },
  async beforeCreateMany(event) {
    const { data } = event.params;

    for (const entry of data) {
      await patchData(entry);
    }
  },
  async beforeUpdate(event) {
    await patchData(event);
  },
  async beforeUpdateMany(event) {
    const { data } = event.params;

    for (const entry of data) {
      await patchData(entry);
    }
  },
};
