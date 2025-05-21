import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import Join from "./router/Join";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
