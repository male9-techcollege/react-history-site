/* Source: 
Wallywood code-along dated 2026-02-02
Instructions about useContext on Moodle */

import { useState } from "react";
import { ThemeContextByMariePierreLessard } from "./ThemeContext";

// TS - interface til Provideren
interface ThemeContextProviderInterfaceByMariePierreLessard {
  children: React.ReactNode;
};

// Her oprettes AuthContextProvider
// Dette er den provider vi wrapper vores komponenter i, som skal have adgang til
// alle de værdier/states vi vil bruge på tværs af appen.
/* The said wrapping is done in main.tsx. The App component is a child of AuthContextProvider.
See notes in AuthContext.tsx about contexts and context providers. The following is an old way of creating a React context. */
export const ThemeContextProviderByMariePierreLessard = ({ children }: ThemeContextProviderInterfaceByMariePierreLessard) => {
  const [isLightModeByMariePierreLessard, setIsLightModeByMariePierreLessard] = useState<boolean>(false);

  // funktion til at skifte staten
  const changeColourThemeByMariePierreLessard = () => {
    if (isLightModeByMariePierreLessard) {
      setIsLightModeByMariePierreLessard(false);
    } else {
      setIsLightModeByMariePierreLessard(true);
    }
  };

  // Returner AuthContext med alle de values vi vil bruge rundt om i appen
  /* I was wondering why do all the hooks above had to be fed to AuthContext as props from AuthContextProvider,
  using the .Provider property of AuthContext, which is the name given by Kasper to a context created with 
  createContext (instead of just using the context). 
  This is the old way of doing things. In the version of React that we are using, we could use
  AuthContext to wrap the App component, without any provider, which was exactly my thought. More straightforward!  
  */
  return <ThemeContextByMariePierreLessard.Provider value={{ isLightModeByMariePierreLessard, changeColourThemeByMariePierreLessard }}>
    {children}
  </ThemeContextByMariePierreLessard.Provider>
};
