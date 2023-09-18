import { routerType } from "../types/router.types";
import About from "./About";
import Home from "./Home";
import NextLevelLearning from "./NextLevelLearning";
import MDELinuxCheatSeet from "./MDE/Linux/CheatSheet";
import {
  MDELinuxCentosSetup,
  MDELinuxOracleKernelUpdate,
} from "./MDE/Linux/NextLevelLearning/data";
import MDEMacCheatSeet from "./MDE/MAC/CheatSheet";
import nllDataFiles from "./MDE/Linux/NextLevelLearning/nllDataFiles.json";

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
  // {
  //   path: `${MDELinuxCentosSetup.path}`,
  //   element: <NextLevelLearning content={MDELinuxCentosSetup.data} />,
  //   title: `${MDELinuxCentosSetup.title}`,
  // },
  // {
  //   path: `${MDELinuxOracleKernelUpdate.path}`,
  //   element: <NextLevelLearning content={MDELinuxOracleKernelUpdate.data} />,
  //   title: `${MDELinuxOracleKernelUpdate.title}`,
  // },
];

nllDataFiles.forEach((file) => {
  pagesData.push({
    path: `${file.data.path}`,
    element: <NextLevelLearning content={file.data.data} />,
    title: `${file.data.path}`,
  });
});

export default pagesData;
