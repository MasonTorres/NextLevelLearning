"use client";
import {
  ApplicationInsights,
  ITelemetryItem,
} from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ClickAnalyticsPlugin } from "@microsoft/applicationinsights-clickanalytics-js";

const reactPlugin = new ReactPlugin();
var clickPluginInstance = new ClickAnalyticsPlugin();
var clickPluginConfig = {
  autoCapture: true,
};

const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=bdd6ab31-c0bd-4530-a120-e434c0b7a26a;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/",
    extensions: [reactPlugin, clickPluginInstance],
    extensionConfig: { [clickPluginInstance.identifier]: clickPluginConfig },
    enableAutoRouteTracking: true,
    disableAjaxTracking: false,
    autoTrackPageVisitTime: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
  },
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
  env.tags = env.tags || [];
  env.tags["ai.cloud.role"] = "NLL";
});

export { reactPlugin, appInsights };
