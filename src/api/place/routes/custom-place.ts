export default {
  routes: [
    {
      method: "GET",
      path: "/places/nearby",
      handler: "place.findNearBy",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/places/:documentId/nearby",
      handler: "place.findNearbyByDocumentId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
