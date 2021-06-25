import { DocumentType } from '@dark-rush-photography/shared-types';

export const getFormData = (
  fileBuffer: Buffer,
  fileName: string,
  entityId: string,
  documentType: DocumentType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FormData = require('form-data');
  const formData = new FormData();

  formData.append('file', fileBuffer, fileName);
  formData.append('fileName', fileName);
  formData.append('id', entityId);
  formData.append('type', documentType);
  return formData;
};
