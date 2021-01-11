export default interface PhotoOfTheWeek {
  isPosted: boolean;
  useTileImage: boolean;
  slug: string;
  name: string;
  location: Location;
  keywords: string[];
}
