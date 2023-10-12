import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/layout/Navigation";
// Import custom providers
import { Providers } from "./providers";

import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./ApplicationInsightsService";

//Defaults
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Level Learning",
  description: "Next Level Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Providers>
            <AppInsightsContext.Provider value={reactPlugin}>
              <Navigation>{children}</Navigation>
            </AppInsightsContext.Provider>
          </Providers>
        </>
      </body>
    </html>
  );
}
