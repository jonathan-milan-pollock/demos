export interface JsonLdNewsArticle {
  readonly '@context': string;
  readonly '@type': string;
  mainEntityOfPage: {
    readonly '@type': string;
    readonly '@id': string;
  };
  readonly headline: string;
  readonly description: string;
  readonly image: string[];
  readonly publishedDate: string;
  author: {
    readonly '@type': string;
    readonly name: string;
  };
  publisher: {
    readonly '@type': string;
    readonly name: string;
    logo: {
      readonly '@type': string;
      readonly url: string;
    };
  };
}
