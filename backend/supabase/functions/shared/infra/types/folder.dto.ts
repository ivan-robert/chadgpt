import { z } from "@zod";

export const folderSchema = z.object({
  id: z.number().optional(),
  count: z.number(),
  name: z.string(),
  created_at: z.string(),
  owner_clerk_id: z.string(),
  is_public: z.boolean(),
});

export type Folder = z.infer<typeof folderSchema>;
