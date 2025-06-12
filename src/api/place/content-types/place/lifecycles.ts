const { ValidationError } = require("@strapi/utils").errors;

async function patchData(event: any) {
  const { data } = event.params;

  const defaultLocale = await strapi
    .plugin("i18n")
    .service("locales")
    .getDefaultLocale();

  const isDefaultLocale = data?.locale === defaultLocale;

  // validate
  if (isDefaultLocale) {
    if (data.slug == null) {
      throw new ValidationError("slug in default local not be null");
    }
  }

  const location = data.location;

  // patch data
  if (data.localtion) {
    data.lat = location.lat;
    data.lng = location.lng;
  }

  if (!isDefaultLocale) {
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
