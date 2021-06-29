export interface ExifImageArtist {
  readonly Rating: number;
  readonly Artist: string;
  readonly 'dc:creator': string;
  readonly Creator: string;
  readonly 'photoshop:credit': string;
  readonly Credit: string;
  readonly 'xmp-plus:licensor': {
    LicensorName: string;
    LicensorCity: string;
    LicensorRegion: string;
    LicensorCountry: string;
    LicensorEmail: string;
    LicensorTelephone1: string;
    LicensorTelephoneType1: string;
    LicensorURL: string;
  };
  readonly 'Keywords+': string[];
  readonly CreateDate: string;
  readonly 'xmp:MetadataDate': string;
  readonly FileModifyDate: string;
  readonly Copyrighted: boolean;
  readonly 'xmpRights:Marked': boolean;
  readonly Copyright: string;
  readonly 'dc:rights': string;
  readonly CopyrightNotice: string;
  readonly Licence: string;
  readonly 'xmpRights:WebStatement': string;
  readonly Rights: string;
  readonly 'xmpRights:UsageTerms': string;
  readonly XPComment: string;
}
