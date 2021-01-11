export default interface Story {
  id: number;
  isPosted: boolean;
  useTileImage: boolean;
  slug: string;
  name: string;
  descriptionParagraphs: string[];
  location: string;
  keywords: string[];
  youTubeVideos: string[];
}
