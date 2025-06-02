import React, { useState } from "react";
import { IOption } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  & * {
    cursor: pointer;
    outline: none;
  }
  & label {
    padding-left: 8px;
    transition: all 0.2s ease-in-out;
  }
  &:hover label {
    color: ${(props) => props.theme.pointColor.main};
  }
  & div:first-child p > span:nth-child(2) {
    color: ${(props) => props.theme.textColor.placeholder};
    font-size: 12px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.pointColor.sub};
    }
  }
`;
const ProgressBar = styled.div`
  margin-top: 8px;
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  background-color: transparent;
  p {
    padding-left: 10px;
    width: 55px;
    color: ${(props) => props.theme.pointColor.sub};
  }
`;
const Progress = styled.div<{ percent: number }>`
  width: ${(props) => props.percent}%;
  height: 8px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.pointColor.main};
`;
const VotingUserList = styled.div`
  margin-top: 8px;
  padding: 8px;
  width: 300px;
  max-height: 300px;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${(props) => props.theme.textColor.placeholder};
  z-index: 5;
  & > p {
    margin-bottom: 4px;
  }
  & span {
    display: inline-block;
    margin: 0 32px 4px 0;
  }
`;

interface IProps {
  item: IOption;
  index: number;
  percent: number;
  secret: boolean;
}

function Option({ item, index, percent, secret }: IProps) {
  const [showVotingUserList, setShowVotingUserList] = useState(false);
  return (
    <Container>
      <div key={item.id}>
        <p style={{ fontSize: "18px", position: "relative" }}>
          {index + 1}. {item.name} (<span>{item.count}표</span>){" "}
          {secret ? null : (
            <span
              onClick={() => {
                if (secret) {
                  return;
                } else {
                  setShowVotingUserList((prev) => !prev);
                }
              }}
            >
              {showVotingUserList ? "투표자 목록 접기" : "투표자 목록 펼치기"}
            </span>
          )}
        </p>
        <ProgressBar>
          <Progress percent={percent}></Progress>
          <p>{percent}%</p>
        </ProgressBar>
      </div>
      {showVotingUserList ? (
        <VotingUserList>
          <p>{item.name}에 투표한 인원</p>
          <div>
            {item.voter.map((voter, index) => (
              <span key={index + "key"}>
                {index + 1}. {voter}
              </span>
            ))}
          </div>
        </VotingUserList>
      ) : null}
    </Container>
  );
}

export default Option;
