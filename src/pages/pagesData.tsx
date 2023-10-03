import { routerType } from "../types/router.types";
import About from "./About";
import Home from "./Home";
import NextLevelLearning from "./NextLevelLearning";
import MDEMacCheatSeet from "./MDE/MAC/CheatSheet";
import nllDataFiles from "../content/nllDataFiles.json";
import { Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const pagesData: routerType[] = [
  {
    path: "",
    element: <Home />,
    title: "Home",
  },
  {
    path: "home",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/home",
    element: <Home />,
    title: "Home",
  },
  {
    path: "about",
    element: <About />,
    title: "About",
  },
  {
    path: "/mde/mac-cheatsheet",
    element: <MDEMacCheatSeet />,
    title: "MDE Mac Cheat Sheet",
  },
  {
    path: "mde/mac",
    element: (
      <Typography pt={2} mt={"47px"} sx={{ height: "calc(100vh - 110px)" }}>
        {" "}
        Coming soon... <Icon icon="noto:shushing-face" fontSize={35} />{" "}
      </Typography>
    ),
    title: "MDE Mac",
  },
];

nllDataFiles.sort((a, b) => {
  let titlea = a.data.title.toLowerCase(),
    titleb = b.data.title.toLowerCase();

  if (titlea < titleb) {
    return -1;
  }
  if (titlea > titleb) {
    return 1;
  }
  return 0;
});

// Add Next Level Learning pages
nllDataFiles.forEach((file) => {
  pagesData.push({
    path: `${file.data.path}`,
    element: (
      <NextLevelLearning
        content={file.data.data}
        description={file.data.description}
      />
    ),
    title: `${file.data.title}`,
  });
});

export default pagesData;
