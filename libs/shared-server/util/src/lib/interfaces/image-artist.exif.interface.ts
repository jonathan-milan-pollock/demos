export interface ImageArtistExif {
  readonly rating: number;
  readonly artist: string;
  readonly copyright: string;
  readonly rights: string;
  readonly byline: string;
  readonly bylineTitle: string;
  readonly creditLine: string;
  readonly contact: string;
  readonly city: string;
  readonly stateOrProvince: string;
  readonly country: string;
  readonly keywords: Set<string>;
}
