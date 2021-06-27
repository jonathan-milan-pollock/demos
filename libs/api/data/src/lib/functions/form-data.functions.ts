import { Entity, EntityType } from '@dark-rush-photography/shared-types';

export const getFormData = (
  fileBuffer: Buffer,
  fileName: string,
  entity: Entity,
  entityType: EntityType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FormData = require('form-data');
  const formData = new FormData();

  formData.append('file', fileBuffer, fileName);
  formData.append('fileName', fileName);
  formData.append('entityId', entity.id);
  formData.append('entityType', entityType);
  formData.append('entityGroup', entity.group);
  formData.append('entitySlug', entity.slug);
  return formData;
};
