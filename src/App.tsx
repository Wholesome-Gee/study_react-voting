import { Helmet } from "react-helmet";
import Router from "./Router";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Helmet>
        <title>VOTING | 소중한 한표, 올바른 투표, 공정한 개표</title>
      </Helmet>
      <Navigation />
      <Router />
    </>
  );
}

export default App;
