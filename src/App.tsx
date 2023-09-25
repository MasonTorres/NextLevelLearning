import { BrowserRouter } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { PageInfoProvider } from "./appContext";
import NavSideBar from "./components/NavSideBar";

// Analytics
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory({});
var reactPlugin = new ReactPlugin();

var appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=bdd6ab31-c0bd-4530-a120-e434c0b7a26a;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/",
    // *** If you're adding the Click Analytics plug-in, delete the next line. ***
    extensions: [reactPlugin],
    // *** Add the Click Analytics plug-in. ***
    // extensions: [reactPlugin, clickPluginInstance],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
      enableAutoRouteTracking: true,
      // *** Add the Click Analytics plug-in. ***
      // [clickPluginInstance.identifier]: clickPluginConfig
    },
  },
});
appInsights.loadAppInsights();

function App() {
  return (
    <PageInfoProvider>
      <BrowserRouter>
        <NavSideBar />
      </BrowserRouter>
    </PageInfoProvider>
  );
}

export default App;
