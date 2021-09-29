export const videoSchema = {
  id: { type: String, required: true },
  entityId: { type: String, required: true },
  blobPathId: { type: String, required: true },
  fileName: { type: String, required: true },
};
