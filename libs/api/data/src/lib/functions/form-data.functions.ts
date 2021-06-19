export const getFormData = (
  file: Express.Multer.File,
  fileName: string,
  entityId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FormData = require('form-data');
  const formData = new FormData();

  formData.append('file', file.buffer, fileName);
  formData.append('fileName', fileName);
  formData.append('entityId', entityId);
  return formData;
};
