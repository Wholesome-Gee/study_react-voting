import React, { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { votingsState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const Container = styled.div`
  padding: 70px 100px;
  width: 800px;
  height: 650px;
  border-radius: 32px;
  position: fixed;
  background-color: ${(props) => props.theme.bgColor};
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const Option = styled.div`
  width: 50%;
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
const CloseBtn = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor.text};
  font-size: 20px;
  background-color: ${(props) => props.theme.pointColor.main};
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
`;

// Component
export default function Voting() {
  const matchHome = useMatch("/");
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(1);
  const [votingList, setVotingList] = useRecoilState(votingsState);
  const voting = votingList.find((voting) => voting.id === id);
  const loginUser = JSON.parse(localStorage.getItem("id") || "");
  console.log(loginUser.value);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!votingList) return;
    if (!voting) return;
    const copyVoting = { ...voting };
    if (!copyVoting) return;
    // 항목을 선택안했을 시
    if (value === "") {
      alert("항목을 선택해주세요");
      return;
    }
    // 선택한 항목의 득표수를 1개 추가하는 작업 (voting의 option에 count를 + 1)
    const targetOptionIndex = copyVoting.options.findIndex((item) => item.name === value); // 0
    const targetOption = copyVoting.options[targetOptionIndex]; // {id: '1001', index: 1, name: '떡볶이', count: 7650, image: ''}
    const newOption = { ...targetOption, count: targetOption.count + 1 }; // {id: '1001', index: 1, name: '떡볶이', count: 7651, image: ''}
    const newOptions = [...copyVoting.options];
    newOptions.splice(targetOptionIndex, 1, newOption);
    const newVoteUser = [...copyVoting.voteUser, loginUser.value];
    const newVoting = { ...copyVoting, options: newOptions, total: voting.total + 1, voteUser: newVoteUser }; // 이걸 votingList에 추가
    // 작업된 voting을 votingList에 적용하는 작업
    const copyVotingList = [...votingList];
    const targetListIndex = copyVotingList.findIndex((voting) => voting.id === newVoting.id);
    copyVotingList.splice(targetListIndex, 1, newVoting);
    console.log("votingList", votingList);
    console.log("copyVotingList2", copyVotingList);
    setVotingList(copyVotingList);
    setCount((prev) => prev + 1);
  }

  useEffect(() => {
    const json = localStorage.getItem("id");
    if (!json) return;
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
    const didVote = voting?.voteUser.find((user) => user === session.value);
    if (!didVote) return;
    setCount(2);
  }, []);

  // JSX
  return (
    <Container>
      {voting ? (
        count === 1 ? (
          <Form onSubmit={handleSubmit}>
            <Header>
              <Badge secret={String(voting.isSecret)}>{voting.isSecret ? "비밀투표" : "공개투표"}</Badge>
              <Title>{voting.subject}</Title>
            </Header>
            <Contents>
              {voting.options.map((option) => (
                <Option key={option.id}>
                  <input
                    type="radio"
                    name="radio"
                    id={option.id}
                    value={option.name}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      setValue(event.currentTarget.value);
                    }}
                  />
                  <label htmlFor={option.id}>{option.name}</label>
                </Option>
              ))}
            </Contents>
            <SubmitBtn>투표후 결과보기</SubmitBtn>
          </Form>
        ) : (
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
                  <div key={item.id}>
                    <p style={{ fontSize: "18px" }}>
                      {index + 1}. {item.name} ({item.count}표)
                    </p>
                    <ProgressBar>
                      <Progress percent={percent}></Progress>
                      <p>{percent}%</p>
                    </ProgressBar>
                  </div>
                );
              })}
            </Contents>
            <CloseBtn
              onClick={() => {
                navigate("/votings");
              }}
            >
              창닫기
            </CloseBtn>
          </ResultBox>
        )
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
