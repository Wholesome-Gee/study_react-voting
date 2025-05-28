import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const ResultBox = styled.div``;
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
  overflow-y: scroll;
`;
const Option = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  & * {
    cursor: pointer;
  }
  & label {
    transition: all 0.2s ease-in-out;
  }
  &:hover label {
    color: ${(props) => props.theme.pointColor.main};
  }
`;
const CloseBtn = styled.div``;
const SubmitBtn = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 8px;
  color: ${(props) => props.theme.textColor.text};
  font-size: 20px;
  background-color: ${(props) => props.theme.pointColor.main};
`;
function Voting() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [count, setCount] = useState(1);
  const [votingList, setVotingList] = useRecoilState(votingsState);
  const voting = votingList.find((voting) => voting.id === id);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === "") {
      alert("항목을 선택해주세요");
      return;
    }
    if (!votingList) return;
    if (!voting) return;
    const copyVoting = { ...voting };
    // voting의 option에 count를 1개 추가하는 작업
    if (!copyVoting) return;
    const targetOptionIndex = copyVoting.options.findIndex((item) => item.name === value); // 0
    const targetOption = copyVoting.options[targetOptionIndex]; // {id: '1001', index: 1, name: '떡볶이', count: 7650, image: ''}
    const newOption = { ...targetOption, count: targetOption.count + 1 }; // {id: '1001', index: 1, name: '떡볶이', count: 7651, image: ''}
    const newOptions = [...copyVoting.options];
    newOptions.splice(targetOptionIndex, 1, newOption);
    const newVoting = { ...copyVoting, options: newOptions }; // 이걸 votingList에 추가
    // 작업된 voting을 votingList에 적용하는 작업
    const copyVotingList = [...votingList];
    const targetListIndex = copyVotingList.findIndex((voting) => voting.id === newVoting.id);
    copyVotingList.splice(targetListIndex, 1, newVoting);
    console.log("votingList", votingList);
    console.log("copyVotingList2", copyVotingList);
    setVotingList(copyVotingList);
    setCount((prev) => prev + 1);
  }
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
          <ResultBox>asd</ResultBox>
        )
      ) : (
        <div>Loading...</div>
      )}
      {/* <CloseBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          x
        </CloseBtn> */}
    </Container>
  );
}

export default Voting;
