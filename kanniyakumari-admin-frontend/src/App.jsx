import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProblems from "./pages/AdminProblems";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminProblems />} />
      </Routes>
    </BrowserRouter>
  );
}
