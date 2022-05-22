import { Env } from '@dark-rush-photography/api/types';
import { loadEnvironment } from '@dark-rush-photography/api/util';
import { environment } from '../environments/environment';

export default (): Env => {
  return loadEnvironment(
    environment.production,
    process.env.NX_GOOGLE_DRIVE_CLIENT_EMAIL,
    process.env.NX_GOOGLE_DRIVE_PRIVATE_KEY,
    process.env.NX_GOOGLE_DRIVE_WEBSITES_WATERMARKED_FOLDER_ID,
    process.env.NX_GOOGLE_DRIVE_WEBSITES_WITHOUT_WATERMARK_FOLDER_ID,
    process.env.NX_MONGO_DB_CONNECTION_STRING,
    process.env.AZURE_STORAGE_CONNECTION_STRING,
    process.env.AZURE_STORAGE_CONNECTION_STRING_PUBLIC,
    process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME_PUBLIC,
    process.env.NX_TINY_PNG_API_KEY,
    process.env.NX_AYRSHARE_API_KEY
  );
};
