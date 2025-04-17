export enum AppTheme {
    LIGHT = 'light-theme',
    DARK = 'dark-theme',
}

export const getTheme = (stringTheme: string): AppTheme => {
    switch (stringTheme) {
        case AppTheme.LIGHT:
            return AppTheme.LIGHT;
        case AppTheme.DARK:
            return AppTheme.DARK;
        default:
            return AppTheme.LIGHT;
    }
}

export const getThemeFromLocalStorage = (): AppTheme => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        return getTheme(theme);
    } else {
        localStorage.setItem('theme', AppTheme.LIGHT);
        return AppTheme.LIGHT;
    }
}

export const appThemeList = Object.values(AppTheme);