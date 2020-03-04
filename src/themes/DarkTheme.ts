import ApplicationLayout from 'src/constants/ApplicationLayout';
import Application from 'src/constants/Application';
import { ThemeType } from 'src/enums/ThemeType';
import Theme from 'src/models/Theme';

export const darkTheme: Theme = {
    themeType: ThemeType.Dark,
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
    headerBackgroundColor: 'rgb(0, 0, 0)',
    headerIconColor: 'rgb(230, 230, 230)',
    headerAccentColor: 'rgb(255, 255, 255)',
    bottomDividerBorder: `${ApplicationLayout.BOTTOM_DIVIDER_HEIGHT}px solid rgb(0, 0, 0)`,
    footerBackgroundColor: 'rgb(0, 0, 0)',
    bottomButtonColor: 'rgb(185, 185, 185)'
};
