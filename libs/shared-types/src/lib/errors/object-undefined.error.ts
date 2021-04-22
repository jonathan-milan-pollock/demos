export class ObjectUndefinedError extends Error {
  public tag?;
  public objectName?: string;

  private constructor(objectName: string) {
    super(`Object ${objectName} is undefined`);
    this.tag = 'ObjectUndefinedError';
    this.objectName = objectName;
  }

  public static of(objectName: string): ObjectUndefinedError {
    return new ObjectUndefinedError(objectName);
  }
}
