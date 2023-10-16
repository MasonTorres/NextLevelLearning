"use client";

// Import necessary dependencies from 'react'
// import { useEffect, useState } from "react";
// Import necessary dependencies from '@fluentui/react-components'
import {
  createDOMRenderer,
  RendererProvider,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  SSRProvider,
  teamsDarkTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { createContext, useReducer } from "react";

import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./ApplicationInsightsService";

// Create a DOM renderer for Fluent UI.
const renderer = createDOMRenderer();

export const PageInfoContext = createContext<any | null>(null);

const reducer = (state: any, pair: any) => ({ ...state, ...pair });

const initialState = {
  home: "Home",
  drawer: true,
  theme: "light",
};

/**
 * Providers component.
 *
 * This component wraps other components with a set of providers
 * for Fluent UI, SSR, and a custom renderer.
 *
 * @param {Object} props - The properties for the Providers component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the Providers.
 * @returns {React.Element} The Providers component with child components.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [pageInfo, setPageInfo] = useReducer(reducer, initialState);
  //   // Declare a state variable named 'hasMounted' and a function named 'setHasMounted' to update it.
  //   const [hasMounted, setHasMounted] = useState(false);

  //   // Use the 'useEffect' hook to set 'hasMounted' to true once the component has mounted.
  //   useEffect(() => {
  //     setHasMounted(true);
  //   }, []);

  // If the component hasn't mounted yet, return nothing.
  //   if (!hasMounted) {
  //     return null;
  //   }

  // If the component has mounted, return a set of providers.
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <PageInfoContext.Provider value={{ pageInfo, setPageInfo }}>
        <RendererProvider renderer={renderer || createDOMRenderer()}>
          <SSRProvider>
            <FluentProvider
              theme={
                pageInfo.theme === "light" ? webLightTheme : webDarkTheme
                // pageInfo.theme === "light" ? teamsLightTheme : teamsDarkTheme
              }
            >
              {children}
            </FluentProvider>
          </SSRProvider>
        </RendererProvider>
      </PageInfoContext.Provider>
    </AppInsightsContext.Provider>
  );
}
