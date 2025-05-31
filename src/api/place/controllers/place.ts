/**
 * place controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController("api::place.place", {
  findNearBy: async (ctx, next) => {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
});
