import z from "zod";
import { toNumberWith } from "../../../utils/zod-utils";

export const findNearByQuerySchema = z.object({
  lat: toNumberWith(z.number()),
  lng: toNumberWith(z.number()),
  limit: toNumberWith(z.number().min(1).max(50)).default(10),
  areaM: toNumberWith(z.number()).default(5000),
});

export const findNearbyByDocumentIdQuerySchema = z.object({
  limit: toNumberWith(z.number().min(1).max(50)).default(10),
  areaM: toNumberWith(z.number()).default(5000),
});