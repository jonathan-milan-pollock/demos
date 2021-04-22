export class ObjectPropertyUndefinedError extends Error {
  public tag?;
  public objectName?: string;
  public propertyName?: string;

  private constructor(objectName: string, propertyName: string) {
    super(`Object ${objectName} property ${propertyName} is undefined`);
    this.tag = 'ObjectPropertyUndefinedError';
    this.objectName = objectName;
    this.propertyName = propertyName;
  }

  public static of(objectName: string) {
    return (propertyName: string): ObjectPropertyUndefinedError =>
      new ObjectPropertyUndefinedError(objectName, propertyName);
  }
}
