import {
  IMAGE_UPLOADS_BLOB_CONNECTION_STRING,
  getEnvVar,
} from '../../../src/constants/environment-variables';

describe('environmental-variables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('will get environment variable if set', () => {
    // arrange
    const connectionString = 'http://imageuploads';
    process.env.IMAGE_UPLOADS_BLOB_CONNECTION_STRING = connectionString;

    // act
    const envVar = getEnvVar(IMAGE_UPLOADS_BLOB_CONNECTION_STRING);

    // assert
    expect(envVar).toBe(connectionString);
  });

  test('will throw error if environment variable is not set', () => {
    // arrange
    process.env.IMAGE_UPLOADS_BLOB_CONNECTION_STRING = '';

    // act
    const thrownEnvVarError = () => {
      getEnvVar(IMAGE_UPLOADS_BLOB_CONNECTION_STRING);
    };

    // assert
    expect(thrownEnvVarError).toThrow(Error);
  });
});
