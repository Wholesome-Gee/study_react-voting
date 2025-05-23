import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import Join from "./router/Join";
import Votings from "./router/Votings";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/votings/regist" element={<Votings />} />
        <Route path="/votings" element={<Votings />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
