/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
export const getFormData = (fileBuffer: Buffer, fileName: string): any => {
  const FormData = require('form-data');
  const formData = new FormData();

  formData.append('file', fileBuffer, fileName);
  return formData;
};
