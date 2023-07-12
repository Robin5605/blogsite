"use client";

import React, { createContext, useState } from "react";

export enum Theme {
    Light,
    Dark,
}

interface ThemeContextInterface {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
    theme: Theme.Light,
    setTheme: () => {
        console.log("default was called");
    },
});

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>(Theme.Light);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <body
                className={
                    theme === Theme.Dark ? "dark bg-nord-200" : "bg-nord-500"
                }
            >
                {children}
            </body>
        </ThemeContext.Provider>
    );
}
