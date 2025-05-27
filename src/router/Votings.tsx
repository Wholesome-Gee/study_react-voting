import React from "react";
import { useRecoilValue } from "recoil";
import { votingsState } from "../atoms";
import Navigation from "../components/Navigation";

function Votings() {
  const votingList = useRecoilValue(votingsState);
  console.log(votingList);
  return (
    <>
      <Navigation />
      <div></div>
    </>
  );
}

export default Votings;
