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
  ],
};
