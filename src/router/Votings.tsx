import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { votingsState } from "../atoms";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import Voting from "./Voting";
import { useMediaQuery } from "react-responsive";

const Container = styled.div<IDisplay>`
  margin: 0 auto;
  margin-bottom: 80px;
  width: ${(props) => (props.display === "desktop" ? "1200px" : "98%")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PageTitle = styled.p<IDisplay>`
  margin: ${(props) => (props.display === "desktop" ? "80px 0 60px" : "80px 0 10px")};
  font-size: 2.5rem;
  font-weight: 600;
`;
const PageContents = styled.div<IDisplay>`
  width: 100%;
  padding: 30px;
  padding-bottom: 138px;
  display: flex;
  justify-content: ${(props) => (props.display === "desktop" ? "flex-start" : "center")};
  flex-wrap: wrap;
  gap: 44px;
  position: relative;
`;
const Card = styled.div`
  padding: 24px 16px;
  width: 350px;
  border: 1px solid white;
  border-radius: 1rem;
  position: relative;
`;
const Badge = styled.span<{ secret: string }>`
  margin-bottom: 16px;
  padding: 4px 8px;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  background-color: ${(props) => (props.secret === "true" ? props.theme.pointColor.sub : props.theme.pointColor.main)};
`;
const CardTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 600;
`;
const Total = styled.div`
  margin-bottom: 8px;
`;
const DDay = styled.div`
  margin-bottom: 32px;
`;
const DetailBtn = styled.div<IDisplay>`
  margin: 0 auto;
  padding: 12px;
  width: 50%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.display === "mobile" ? "20px" : "24px")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.theme.textColor.placeholder};
  &:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;
const AddBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 44px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 48px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.theme.textColor.placeholder};
  &:hover {
    transform: scale(1.1);
  }
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.5);
`;
const VotingMark = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #ff8484;
`;

interface IDisplay {
  display: string;
}

function Votings() {
  const [display, setDisplay] = useState("");
  const desktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const [count, setCount] = useState(1);
  const [loginUser, setLoginUser] = useState("");
  const [votingMark, setVotingMark] = useState(false);
  const votingList = useRecoilValue(votingsState);
  const visibleVotingList = votingList.slice(0, 3 * count);
  const match = useMatch("/votings/:id");
  const matchHome = useMatch("/");
  const navigate = useNavigate();
  function getDDay(endDate: string) {
    const today = new Date();
    const endDay = new Date(endDate);
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;
    if (todayString === endDate) {
      return "D-Day";
    }
    return `D-${Math.ceil((endDay.getTime() - today.getTime()) / 86400000)}`;
  }

  function handleClickAddBtn() {
    setCount((prev) => prev + 1);
  }

  useEffect(() => {
    if (desktop) {
      setDisplay("desktop");
    } else if (tablet) {
      setDisplay("tablet");
    } else {
      setDisplay("mobile");
    }
    const json = localStorage.getItem("id");
    if (!json) return;
    const session = JSON.parse(json);
    console.log("Votings.tsx 134", session);
    setLoginUser(session.value);
    if (Date.now() > session.expire) {
      localStorage.removeItem("id");
      localStorage.removeItem("pw");
      if (matchHome) {
        window.location.reload();
      } else {
        navigate("/");
      }
      alert("세션이 만료되어 로그아웃 됩니다.");
    }
  }, []);

  return (
    <>
      <Navigation />
      <Container display={display}>
        {votingList ? (
          <>
            <PageTitle display={display}>진행중인 투표</PageTitle>
            <PageContents display={display}>
              {visibleVotingList.map((item) => (
                <Card key={item.id}>
                  {item.isSecret ? (
                    <Badge secret={String(item.isSecret)}>비밀투표</Badge>
                  ) : (
                    <Badge secret={String(item.isSecret)}>공개투표</Badge>
                  )}

                  <CardTitle>{item.subject}</CardTitle>
                  <Total>총 투표수 : {item.total}표</Total>
                  <DDay>투표 종료일 : {getDDay(item.end)}</DDay>
                  <DetailBtn
                    onClick={() => {
                      localStorage.getItem("id") ? navigate(item.id) : navigate("/login");
                    }}
                    display={display}
                  >
                    자세히 보기
                  </DetailBtn>
                  {item.voteUser.find((user) => user === loginUser) ? <VotingMark>투표완료</VotingMark> : null}
                </Card>
              ))}
              {count * 3 < votingList.length ? <AddBtn onClick={handleClickAddBtn}>+</AddBtn> : null}
            </PageContents>
          </>
        ) : null}
        {match ? (
          <Overlay>
            <Voting />
          </Overlay>
        ) : null}
      </Container>
    </>
  );
}

export default Votings;
