import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { votingsState } from "../atoms";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Voting from "./Voting";

const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 80px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PageTitle = styled.p`
  margin: 80px 0 60px;
  font-size: 2.5rem;
  font-weight: 600;
`;
const PageContents = styled.div`
  width: 100%;
  padding: 30px;
  padding-bottom: 138px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 44px;
  position: relative;
`;
const Card = styled.div`
  padding: 24px 16px;
  border: 1px solid white;
  border-radius: 1rem;
  width: 350px;
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
const DetailBtn = styled.div`
  margin: 0 auto;
  padding: 12px;
  width: 50%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
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
function Votings() {
  const [count, setCount] = useState(1);
  const votingList = useRecoilValue(votingsState);
  const visibleVotingList = votingList.slice(0, 3 * count);
  const match = useMatch("/votings/:id");
  const navigate = useNavigate();
  // console.log(match);
  // console.log(votingList);
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
  return (
    <>
      <Navigation />
      <Container>
        {votingList ? (
          <>
            <PageTitle>진행중인 투표</PageTitle>
            <PageContents>
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
                      navigate(item.id);
                    }}
                  >
                    자세히 보기
                  </DetailBtn>
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
