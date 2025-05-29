import { Helmet } from "react-helmet";
import Router from "./Router";
import { useEffect } from "react";

function App() {
  //   const sessionJson = localStorage.getItem("id");
  //   if (!sessionJson) return;
  //   const session = JSON.parse(sessionJson);
  //   if (Date.now() > session.expire) {
  //     window.localStorage.removeItem("id");
  //     window.localStorage.removeItem("pw");
  //     alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
  //   }
  // }, []);
  return (
    <>
      <Helmet>
        <title>VOTING | 소중한 한표, 올바른 투표, 공정한 개표</title>
      </Helmet>
      <Router />
    </>
  );
}

export default App;
