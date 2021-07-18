export interface ImageExif {
  readonly Title: string;
  readonly 'dc:description': string;
  readonly 'Keywords+': string[];
  readonly 'xmp:MetadataDate': string;
  readonly FileModifyDate: string;
  readonly 'Iptc4xmpCore:Location'?: string;
  readonly City?: string;
  readonly State?: string;
  readonly Country: string;
}
