import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./ApplicationInsightsService";

import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-components";

import NavSideBar from "./components/NavSideBar";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { PageInfoContext } from "./appContext";
initializeIcons();

function App() {
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);

  return (
    <FluentProvider
      theme={pageInfo.theme === "light" ? teamsLightTheme : teamsDarkTheme}
    >
      <AppInsightsContext.Provider value={reactPlugin}>
        <BrowserRouter>
          <NavSideBar />
        </BrowserRouter>
      </AppInsightsContext.Provider>
    </FluentProvider>
  );
}

export default App;
