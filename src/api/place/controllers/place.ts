/**
 * place controller
 */

import { factories } from '@strapi/strapi'
import { findNearbyByDocumentIdQuerySchema, findNearByQuerySchema } from './place.validator';
// TODO find solution to use path alias
import { handleZodError } from '../../../utils/controller-utils';

export default factories.createCoreController("api::place.place", {
  findNearBy: async (ctx, next) => {
    const parseResult = findNearByQuerySchema.safeParse(ctx.query);

    if (!parseResult.success) {
      return handleZodError(ctx, parseResult.error);
    }

    const { lat, lng, areaM, limit } = parseResult.data;

    const results = await strapi.service("api::place.place").findNearBy({
      lat,
      lng,
      areaM,
      limit
    });

    return results;
  },
  async findNearbyByDocumentId(ctx) {
    const parseResult = findNearbyByDocumentIdQuerySchema.safeParse(ctx.query);

    if (!parseResult.success) {
      return handleZodError(ctx, parseResult.error);
    }

    const { areaM, limit } = parseResult.data;

    const { documentId } = ctx.params;

    if (!documentId) {
      return ctx.badRequest("document_id is required");
    }

    const place = await strapi.documents("api::place.place").findOne({
      documentId: documentId,
      status: 'published'
    });

    if (!place) {
      return ctx.notFound("Place not found");
    }

    const { lat, lng } = place;

    const results = await strapi
      .service("api::place.place")
      .findNearBy({ lat, lng, ignoreDocId: documentId, areaM, limit });

    return results;
  },
});
