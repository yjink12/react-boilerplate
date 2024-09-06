import { useLocation } from "react-router-dom";
import "./App.css";
import DrawerComponent from "./components/test/DrawerComponent";
import Header from "./layout/Header";
import Router from "./router";

function App() {
  const currentPath = useLocation();
  console.log("currentPath", currentPath.pathname);

  const backspacePath = ["/test", "/test/checkup"];

  return (
    <div className="App">
      <div className="w-full h-auto min-w-[360px] max-w-[768px] mx-auto bg-white">
        {backspacePath.includes(currentPath.pathname) && (
          <Header pathName={currentPath.pathname} />
        )}
        <Router />
      </div>
      <DrawerComponent />
    </div>
  );
}

export default App;
