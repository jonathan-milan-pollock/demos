export default interface Image {
    imageNumber: number;
    fileName: string;
    fileNameWithoutExtension: string;
    thumbnail: string;
    original: string;
    src: string; // Used for Grid
    width: number; // Used for Grid
    height: number; // Used for Grid
    large: string; // Used for Download
}
