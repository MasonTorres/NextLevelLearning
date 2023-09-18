import { Route, Routes } from "react-router-dom";
import { routerType } from "../types/router.types";
import pagesData from "./pagesData";
import nllDataFiles from "./MDE/Linux/NextLevelLearning/nllDataFiles.json";
import NextLevelLearning from "./NextLevelLearning";

const Router = () => {
  let computedPagesData = pagesData;

  // nllDataFiles.forEach((file) => {
  //   computedPagesData.push({
  //     path: `${file.data.path}`,
  //     element: <NextLevelLearning content={file.data.data} />,
  //     title: `${file.data.path}`,
  //   });
  // });
  console.log("pagesData", computedPagesData);

  const pageRoutes = computedPagesData.map(
    ({ path, title, element }: routerType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
