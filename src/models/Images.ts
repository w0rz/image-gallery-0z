import { z } from "zod";

export type Photo = z.infer<typeof PhotoSchema>
export type ImagesResults = z.infer<typeof ImagesSChemaWithPhotos>


const BasicImageSchema = z.object({
  page: z.number(),
per_page: z.number(),
prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
})

const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  src: z.object({
    large: z.string(),
  }),
  alt: z.string(),
  blurredDataUrl: z.string().optional(),
})
{
  "per_page": 1,
  "next_page": "https://api.pexels.com/v1/curated/?page=2&per_page=1"
}

export const ImagesSChemaWithPhotos = BasicImageSchema.extend({
  photos: z.array(PhotoSchema)
})

