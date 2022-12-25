import React from "react";

interface IThemeContext {
    theme: "DARK" | "LIGHT",
    setTheme: (theme: "DARK" | "LIGHT") => void,
}

export const ThemeContext = React.createContext<IThemeContext>({
    theme: "DARK",
    setTheme: () => {},
});
