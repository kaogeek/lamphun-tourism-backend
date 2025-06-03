/**
 * place service
 */

import { factories } from '@strapi/strapi';

type PlaceDistanceRow = {
  id: number;
  document_id: string;
  distance_m: number;
};

export default factories.createCoreService("api::place.place", {
  async findNearBy({
    lat,
    lng,
    ignoreDocId,
    areaM,
    limit,
  }: {
    lat: number;
    lng: number;
    areaM: number;
    ignoreDocId?: string;
    limit: number;
  }) {
    const knex = strapi.db.connection;

    const distanceExpression = knex.raw(
      `
      6371000 * acos(
        cos(radians(:lat)) * cos(radians(p.lat)) * cos(radians(p.lng) - radians(:lng)) +
        sin(radians(:lat)) * sin(radians(p.lat))
      )
    `,
      {
        lat, lng
      }
    );

    const query = knex("places as p")
      .select(
        "p.id",
        "p.document_id",
        knex.raw(distanceExpression + "as distance_m")
      )
      .whereNotNull("p.published_at")
      .andWhere(function () {
        this.whereRaw(`${distanceExpression.toQuery()} <= ?`, [areaM]);
      });
    
    if (ignoreDocId) {
      query.whereNot("p.document_id", ignoreDocId);
    }

    const result = await query.orderBy("distance_m", "asc").limit(limit);

    const rows = result as PlaceDistanceRow[];

    // TODO: Maybe this could be done with a single query?
    // Currently using two queries because we want to leverage Strapi's document API,
    // but the trade-off is needing to query twice to get both full entity data and distance.

    const rawQueryMetaDataMap = new Map<string, PlaceDistanceRow>();

    for (const row of rows) {
      rawQueryMetaDataMap.set(row.document_id, row);
    }
    const documentIds = rows.map((r) => r.document_id);

    const places = await strapi.documents("api::place.place").findMany({
      filters: {
        documentId: {
          $in: documentIds,
        },
      },
      status: "published",
      fields: ["name", "shortDescription", "createdAt", "updatedAt", "address"],
      populate: ["coverImage", "placeImages", "placeCategory"],
    });

    const placesWithDistance = places
      .map((place) => {
        const rawMetaData = rawQueryMetaDataMap.get(place.documentId);

        if (!rawMetaData) {
          return place;
        }

        return { ...place, ...rawMetaData };
      })
      .sort((a: any, b: any) => {
        // TODO find solution make this typesafe
        const distA = a.distance_m ?? Infinity;
        const distB = b.distance_m ?? Infinity;
        return distA - distB;
      });

    return placesWithDistance;
  },
});
