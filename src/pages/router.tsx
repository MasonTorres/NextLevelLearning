import { Route, Routes } from "react-router-dom";
import { routerType } from "../types/router.types";
import pagesData from "./pagesData";

const Router = () => {
  let computedPagesData = pagesData;

  const pageRoutes = computedPagesData.map(
    ({ path, title, element }: routerType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
