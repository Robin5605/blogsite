import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeContext } from "../common/context";
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"LIGHT" | "DARK">("LIGHT");
  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "DARK" ? "dark" : ""}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  );
}
