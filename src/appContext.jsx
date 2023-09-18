import React, { createContext, useReducer } from "react";

export const PageInfoContext = createContext();

const reducer = (state, pair) => ({ ...state, ...pair });

const initialState = {
  home: "Home",
};

export function PageInfoProvider(props) {
  const [pageInfo, setPageInfo] = useReducer(reducer, initialState);

  return (
    <PageInfoContext.Provider value={{ pageInfo, setPageInfo }}>
      {props.children}
    </PageInfoContext.Provider>
  );
}
