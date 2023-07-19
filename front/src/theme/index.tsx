import React, { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LocalStorageService } from '../utils/local-storage';

export type Theme = 'dark' | 'light';

type ThemeContext = {
    change: (theme: Theme)=> void;
    toggle: ()=> void;
    current: Theme,
}

const themeContext = React.createContext<ThemeContext>({
    change: ()=> {return;},
    toggle: ()=> {return;},
    current: 'light',
});

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
}

const THEME_KEY = 'SITE_THEME';

const themeWhiteList = new Set<Theme>(['light', 'dark']);

export const ThemeProvider = (props: ThemeProviderProps) => {
    const {children, defaultTheme = 'light'} = props;
    const initialized = useRef(false);

    const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

    const change: ThemeContext['change'] = useCallback((theme)=> {
        setCurrentTheme(theme);
        LocalStorageService.setItem(THEME_KEY, theme);
    },[])

    const toggle:ThemeContext['toggle'] = useCallback(()=> {
        change(currentTheme === 'light' ? 'dark' : 'light');
    },[currentTheme, change])

    useLayoutEffect(() => {
        if (!initialized.current){
            const restoredTheme = LocalStorageService.getItem(THEME_KEY);
            if (typeof restoredTheme === 'string' && themeWhiteList.has(restoredTheme as Theme)){
                change(restoredTheme as Theme);
            }
            initialized.current = true;
        }
    },[])

    const contextValue: ThemeContext = useMemo(()=> ({
        change,
        toggle,
        current: currentTheme,
    }),[currentTheme, change, toggle]);

    return <themeContext.Provider value={contextValue}>
        <main className={`theme-${currentTheme}`}>
            {children}
        </main>
    </themeContext.Provider>
}

export const useThemeContext = () => useContext(themeContext);