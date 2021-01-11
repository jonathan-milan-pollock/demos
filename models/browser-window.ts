interface IFocusable {
    focus(): void;
}

export default interface BrowserWindow {
    open(url: string, windowName: string): IFocusable;
}
