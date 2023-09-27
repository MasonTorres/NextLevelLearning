import { Route, Routes } from "react-router-dom";
import { routerType } from "../types/router.types";
import pagesData from "./pagesData";
import { useContext, useEffect } from "react";
import { PageInfoContext } from "../appContext";

import { ReactNode } from "react";

interface UpdateCurrentPathProps {
  title: string;
  children: ReactNode;
}

const UpdateCurrentPath = ({ title, children }: UpdateCurrentPathProps) => {
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);
  useEffect(() => {
    setPageInfo({ ...pageInfo, home: title });
  }, [title, pageInfo.home]);
  return <>{children}</>;
};

const Router = () => {
  let computedPagesData = pagesData;
  const pageRoutes = computedPagesData.map(
    ({ path, element, title }: routerType) => {
      return (
        <Route
          key={title}
          path={`/${path}`}
          element={<UpdateCurrentPath title={title} children={element} />}
        />
      );
    }
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
