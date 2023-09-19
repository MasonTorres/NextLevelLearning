import { routerType } from "../types/router.types";
import About from "./About";
import Home from "./Home";
import NextLevelLearning from "./NextLevelLearning";
import MDELinuxCheatSeet from "./MDE/Linux/CheatSheet";
import MDEMacCheatSeet from "./MDE/MAC/CheatSheet";
import nllDataFiles from "../content/nllDataFiles.json";

// Add static pages
const pagesData: routerType[] = [
  {
    path: "",
    element: <Home />,
    title: "home",
  },
  {
    path: "home",
    element: <Home />,
    title: "home",
  },
  {
    path: "about",
    element: <About />,
    title: "about",
  },
  {
    path: "mde/linux-cheatsheet",
    element: <MDELinuxCheatSeet />,
    title: "MDE Linux Cheat Sheet",
  },
  {
    path: "mde/mac-cheatsheet",
    element: <MDEMacCheatSeet />,
    title: "MDE Mac Cheat Sheet",
  },
];

// Add Next Level Learning pages
nllDataFiles.forEach((file) => {
  pagesData.push({
    path: `${file.data.path}`,
    element: <NextLevelLearning content={file.data.data} />,
    title: `${file.data.path}`,
  });
});

export default pagesData;
