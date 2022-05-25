import { Theme } from '../interfaces/theme.interface';
import { ApplicationLayout } from './application-layout.constants';
import { Application } from './application.constants';

//TODO: Add font weights to this!!!
export const darkTheme: Theme = {
  fontFamily: Application.FONT_FAMILY,
  accentColor: Application.ACCENT_COLOR,
  bottomButtonFontSize: 12,
  kabobMenuFontSize: 14,
  smallFontSize: 16,
  mediumFontSize: 18,
  largeFontSize: 20,
  textColor: 'rgb(160, 160, 160)',
  textBackgroundColor: 'rgb(36, 36, 36)',
  iconColor: 'rgb(230, 230, 230)',
  buttonAccentColor: 'rgb(255, 255, 255)',
  hyperlinkColor: 'rgb(230, 230, 230)',
  hyperlinkUnderlineColor: 'rgba(200, 200, 200, 0.6)',
  mainBackgroundColor: 'rgb(30, 30, 30)',
  masterBackgroundColor: 'rgb(21, 21, 21)',
  detailBackgroundColor: 'rgb(30, 30, 30)',
  topHeaderBackgroundColor: 'rgb(0, 0, 0)',
  headerBackgroundColor: 'rgb(0, 0, 0)',
  headerIconColor: 'rgb(230, 230, 230)',
  topHeaderAccentColor: 'rgb(255, 255, 255)',
  headerAccentColor: 'rgb(255, 255, 255)',
  titleBarBackButtonIconColor: Application.ACCENT_COLOR,
  topNavigationBarBackButtonIconColor: Application.ACCENT_COLOR,
  bottomDividerBorder: `${ApplicationLayout.BOTTOM_DIVIDER_HEIGHT}px solid rgb(0, 0, 0)`,
  footerBackgroundColor: 'rgb(0, 0, 0)',
  bottomButtonColor: 'rgb(185, 185, 185)',
  imageGalleryButtonColor: 'rgb(255, 255, 255)',
  bottomButtonIconColor: 'rgb(230, 230, 230)',
  imageGalleryDisabledButtonColor: 'rgb(128, 128, 128)',
  optionsBarButtonColor: 'rgb(255, 255, 255)',
  masterImageGalleryBackgroundColor: 'transparent',
  imageGalleryContainerBackgroundColor: 'rgba(33, 33, 33, 0.95)',
};
