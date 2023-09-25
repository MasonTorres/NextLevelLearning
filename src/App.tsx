import { BrowserRouter } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./ApplicationInsightsService";
import { PageInfoProvider } from "./appContext";
import NavSideBar from "./components/NavSideBar";

function App() {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <PageInfoProvider>
        <BrowserRouter>
          <NavSideBar />
        </BrowserRouter>
      </PageInfoProvider>
    </AppInsightsContext.Provider>
  );
}

export default App;
