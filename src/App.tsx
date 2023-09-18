import { HashRouter } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { PageInfoProvider } from "./appContext";
import NavSideBar from "./components/NavSideBar";

function App() {
  return (
    <PageInfoProvider>
      <HashRouter>
        <NavSideBar />
      </HashRouter>
    </PageInfoProvider>
  );
}

export default App;
