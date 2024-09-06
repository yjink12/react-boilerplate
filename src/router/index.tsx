import { Route, Routes } from "react-router-dom";
import TestPage from "../pages/test";
import TestCheckupPage from "../pages/test/checkup";

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
      <Route path="/test/checkup" element={<TestCheckupPage />} />
    </Routes>
  );
};
export default Router;
