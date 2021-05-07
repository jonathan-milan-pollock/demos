import * as multipart from 'parse-multipart';

//req.headers['content-type']
const multipartImageBoundary = (contentType: string): ArrayBuffer =>
  multipart.getBoundary(contentType);

//  req: HttpRequest req.body
const multipartImageBodyBuffer = (requestBody: ArrayBuffer): Buffer =>
  Buffer.from(requestBody);

const parseMultipartImage = (
  boundary: string,
  bodyBuffer: Buffer
): {
  filename: string;
  data: Buffer;
} =>
  multipart.Parse(bodyBuffer, boundary)[0] as {
    filename: string;
    data: Buffer;
  };

export {
  multipartImageBoundary,
  multipartImageBodyBuffer,
  parseMultipartImage,
};
