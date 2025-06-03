import React, { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { endVotingsState, sortedEndVoting, votingsState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Option from "./Option";
import { a } from "framer-motion/dist/types.d-CtuPurYT";

const Container = styled.div`
  padding: 70px 100px;
  width: 800px;
  height: 650px;
  border-radius: 32px;
  position: fixed;
  background-color: ${(props) => props.theme.bgColor};
`;

const ResultBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  width: 100%;
`;
const Badge = styled.span<{ secret: string }>`
  margin-bottom: 24px;
  padding: 4px 8px;
  border-radius: 8px;
  display: inline-block;
  font-size: 24px;
  background-color: ${(props) => (props.secret === "true" ? props.theme.pointColor.sub : props.theme.pointColor.main)};
`;
const Title = styled.div`
  margin-bottom: 32px;
  font-size: 32px;
  font-weight: 600;
`;
const Contents = styled.div`
  margin-bottom: 40px;
  padding: 25px;
  width: 420px;
  max-height: 300px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 26px;
    /* border: 1px solid ${(props) => props.theme.textColor.placeholder}; */
    border-radius: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.textColor.placeholder};
    border-radius: 16px;
    border: 8px solid ${(props) => props.theme.bgColor};
    &:hover {
      background-color: ${(props) => props.theme.textColor.text};
    }
  }
  &::-webkit-scrollbar-button {
    height: 2px;
  }
`;
const OptionInput = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
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
`;
const SubmitBtn = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor.text};
  font-size: 20px;
  background-color: ${(props) => props.theme.pointColor.main};
`;

const CloseBtn = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor.text};
  font-size: 20px;
  background-color: ${(props) => props.theme.pointColor.main};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pointColor.sub};
  }
`;
const ExitBtn = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: rotateZ(90deg);
  }
`;

// Component
export default function EndVoting() {
  const matchHome = useMatch("/");
  const navigate = useNavigate();
  const { id } = useParams();
  const votingList = useRecoilValue(sortedEndVoting);
  console.log(votingList);
  const voting = votingList.find((voting) => voting.id === id);

  useEffect(() => {
    const json = localStorage.getItem("id");
    if (!json) return;
    else {
      const session = JSON.parse(json);
      if (Date.now() > session.expire) {
        localStorage.removeItem("id");
        localStorage.removeItem("pw");
        alert("세션이 만료되어 로그아웃 됩니다.");
        if (matchHome) {
          window.location.reload();
        } else {
          navigate("/");
        }
      }
    }
  }, []);

  // JSX
  return (
    <Container>
      {voting ? (
        <ResultBox>
          <Header>
            <Badge secret={String(voting.isSecret)}>{voting.isSecret ? "비밀투표" : "공개투표"}</Badge>
            <Title>{voting.subject}</Title>
          </Header>
          <Contents>
            {voting.options.map((item, index) => {
              const count = item.count;
              const percent = Math.floor((count / voting.total) * 100); // 70
              return (
                <Option key={item.id} item={item} index={index} percent={percent} secret={voting.isSecret}></Option>
              );
            })}
          </Contents>
          <CloseBtn
            onClick={() => {
              navigate(-1);
            }}
          >
            창닫기
          </CloseBtn>
        </ResultBox>
      ) : (
        <div>Loading...</div>
      )}
      <ExitBtn
        onClick={() => {
          navigate(-1);
        }}
      >
        ❌
      </ExitBtn>
    </Container>
  );
}
