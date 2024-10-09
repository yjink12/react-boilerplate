import { Route, Routes } from "react-router-dom";
import TestPage from "../pages/test";
import TestReservePage from "../pages/test/reserve";

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
      <Route path="/test/reserve" element={<TestReservePage />} />
    </Routes>
  );
};
export default Router;
