import ApplicationUi from '../constants/app-ui-constants';
import ThemeVariables from './theme-variables';

export const darkVariables: ThemeVariables = {
  textColor: '#a0a0a0',
  textBackgroundColor: '#242424',
  iconColor: '#e6e6e6',
  buttonAccentColor: '#ffffff',
  hyperlinkColor: '#e6e6e6',
  hyperlinkUnderlineColor: 'rgba(200, 200, 200, 0.6)',
  mainBackgroundColor: '#1e1e1e',
  masterBackgroundColor: '#151515',
  detailBackgroundColor: '#1e1e1e',
  topHeaderBackgroundColor: '#000000',
  headerBackgroundColor: '#000000',
  headerIconColor: '#e6e6e6',
  headerAccentColor: '#ffffff',
  bottomDividerBorder: `${ApplicationUi.BOTTOM_DIVIDER_HEIGHT}px solid #000000`,
  footerBackgroundColor: '#000000',
  bottomButtonColor: '#b9b9b9',
  bottomButtonIconColor: '#e6e6e6',
  imageGalleryDisabledButtonColor: '#808080',
  optionsBarButtonColor: '#ffffff',
  masterImageGalleryBackgroundColor: 'transparent',
  imageGalleryContainerBackgroundColor: 'rgba(33, 33, 33, 0.95)', //TODO: Can I really tell the difference???
  imageGalleryButtonColor: '#ffffff',
  topNavigationBarBackButtonIconColor: ApplicationUi.PRIMARY_COLOR,
  topHeaderAccentColor: '#ffffff',
};
