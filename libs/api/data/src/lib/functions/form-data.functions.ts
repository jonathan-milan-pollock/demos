export const getFormData = (
  fileBuffer: Buffer,
  fileName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FormData = require('form-data');
  const formData = new FormData();

  formData.append('file', fileBuffer, fileName);
  formData.append('fileName', fileName);
  return formData;
};
