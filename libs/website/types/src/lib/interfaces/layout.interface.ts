export interface Layout {
  readonly width: number;
  readonly height: number;
  readonly detailWidth: number;
  readonly headerHeight: number;
  readonly mainHeight: number;
  readonly footerHeight: number;
  readonly isLargeWindowWidth: boolean;
  readonly isAdditionalContactBarDisplayed: boolean;
  readonly isBottomNavigationBarDisplayed: boolean;
}
