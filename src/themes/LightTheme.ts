import ApplicationLayout from 'src/constants/ApplicationLayout';
import Application from 'src/constants/Application';
import Theme from 'src/models/Theme';

export const lightTheme: Theme = {
    fontFamily: Application.FONT_FAMILY,
    accentColor: Application.ACCENT_COLOR,
    bottomButtonFontSize: 12,
    kabobMenuFontSize: 14,
    smallFontSize: 16,
    mediumFontSize: 18,
    largeFontSize: 20,
    textColor: 'rgb(44, 64, 76)',
    textBackgroundColor: 'rgb(255, 255, 255)',
    iconColor: 'rgba(0, 0, 0, 0.9)',
    buttonAccentColor: Application.ACCENT_COLOR,
    hyperlinkColor: 'rgba(0, 0, 0, 0.9)',
    hyperlinkUnderlineColor: 'rgba(0, 0, 0, 0.9)',
    mainBackgroundColor: Application.ACCENT_COLOR,
    masterBackgroundColor: 'transparent',
    detailBackgroundColor: 'rgb(66, 88, 102)',
    headerBackgroundColor: 'rgb(255, 255, 255)',
    headerIconColor: Application.ACCENT_COLOR,
    headerAccentColor: 'rgba(0, 0, 0, 0.9)',
    bottomDividerBorder: `${ApplicationLayout.BOTTOM_DIVIDER_HEIGHT}px solid rgb(182, 195, 204)`,
    footerBackgroundColor: 'rgb(255, 255, 255)',
    bottomButtonColor: 'rgba(0, 0, 0, 0.9)'
};
