import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./router/Home";
import Login from "./router/Login";
import Join from "./router/Join";
import Votings from "./router/Votings";
import Regist from "./router/Regist";
import Voting from "./router/Voting";
import EndVotings from "./router/EndVotings";

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/votings/regist" element={<Regist />} />
        <Route path="/votings/end" element={<EndVotings />}>
          <Route path="/votings/end/:id" element={<Voting />}></Route>
        </Route>
        <Route path="/votings" element={<Votings />}>
          <Route path="/votings/:id" element={<Voting />}></Route>
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
