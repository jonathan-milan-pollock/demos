import { ThemeType } from 'src/enums/ThemeType';

export default interface Theme {
    themeType: ThemeType;
    fontFamily: string;
    accentColor: string;
    bottomButtonFontSize: number;
    kabobMenuFontSize: number;
    smallFontSize: number;
    mediumFontSize: number;
    largeFontSize: number;
    textColor: string;
    textBackgroundColor: string;
    iconColor: string;
    buttonAccentColor: string;
    hyperlinkColor: string;
    hyperlinkUnderlineColor: string;
    mainBackgroundColor: string;
    masterBackgroundColor: string;
    detailBackgroundColor: string;
    headerBackgroundColor: string;
    headerIconColor: string;
    headerAccentColor: string;
    bottomDividerBorder: string;
    footerBackgroundColor: string;
    bottomButtonColor: string;
}
