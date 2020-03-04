import { renderHook } from '@testing-library/react-hooks';
import { ThemeType } from 'src/enums/ThemeType';
import { useTheme } from 'src/hooks/UseTheme';

it('should load the Dark theme for the theme type of Dark', () => {
    const { result } = renderHook(() => useTheme(ThemeType.Dark));

    expect(result.current.themeType).toBe(ThemeType.Dark);
});

it('should load the Light theme for the theme type of Light', () => {
    const { result } = renderHook(() => useTheme(ThemeType.Light));

    expect(result.current.themeType).toBe(ThemeType.Light);
});
