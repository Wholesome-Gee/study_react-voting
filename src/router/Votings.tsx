import styled from "styled-components";
import Navigation from "../components/Navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IOption, IVoting, votingsSelector } from "../atoms";

const Container = styled.div`
  margin: 0 auto;
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
const PageContents = styled.form`
  padding-bottom: 110px;
  width: 840px;
  height: 600px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;
const Step = styled(motion.h1)`
  padding: 0 100px;
  width: 840px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0;
`;
const StepTitle = styled.div`
  margin-bottom: 2rem;
  font-size: 2rem;
`;
const StepContents = styled.div`
  max-height: 260px;
  overflow-y: auto;
`;
const InputBox = styled.div`
  margin-bottom: 1rem;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > p {
    margin-right: 8px;
    font-size: 1.2rem;
  }
  & > input {
    margin-right: 8px;
    padding: 4px 2px;
    width: 270px;
    border-bottom: 1px solid ${(props) => props.theme.textColor.text};
    color: ${(props) => props.theme.textColor.text};
    font-size: 1.1rem;
    outline: none;
    background-color: transparent;
  }
  & > span {
    color: ${(props) => props.theme.textColor.placeholder};
    font-size: 0.9rem;
  }
`;
const Labels = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  label {
    padding: 8px 0px 8px 8px;
  }
`;
const AddBtn = styled.div`
  margin-top: 1rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
  font-size: 2rem;
  background-color: ${(props) => props.theme.textColor.text};
`;
const DeleteBtn = styled.div<{ id: string }>`
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`;
const Btns = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 30px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
`;
const NextBtn = styled.button`
  margin-bottom: 30px;
  width: 100px;
  height: 50px;
  border-radius: 1rem;
  color: ${(props) => props.theme.textColor.text};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.theme.pointColor.main};
  &:hover {
    color: ${(props) => props.theme.pointColor.sub};
  }
`;
const PrevBtn = styled(NextBtn)`
  background-color: ${(props) => props.theme.textColor.placeholder};
`;

export default function Votings() {
  const [pageNum, setPageNum] = useState(0); // 0 : 투표제목입력 page // 1: 투표항목입력page // 2: 비밀투표선택page // 3: 완료페이지
  const [voting, setVoting] = useState<IVoting>(); //
  const [options, setOptions] = useState<IOption[]>([]);
  const [count, setCount] = useState(3);
  const [optionCount, setOptionCount] = useState<number[]>([1, 2]);
  const [inputNames, setInputNames] = useState<string[]>(["option1", "option2"]);
  const [isSecret, setIsSecret] = useState(false);
  const [votingList, setVotingList] = useRecoilState(votingsSelector);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 함수정의
  function success(data: any) {
    const optionKeys = Object.keys(data).filter((key) => key.includes("option")); // ['option1','option2',...]
    const optionValues = Object.values(data).filter((value, index) => index !== 0) as string[]; // ['이재명','김문수','이준석']
    const options = optionValues.map((value, index) => {
      const option: IOption = { id: crypto.randomUUID(), index, name: value, count: 0, image: "" }; // {id:'random', index:0, name:'이재명', count:0, image:""}
      return option;
    });
    setOptions(options); // [{id:'random', index:0, name:'이재명', count:0, image:""},{id:'random', index:1, name:'김문수', count:0, image:""},...]
    // console.log(data); // {votingTitle: '1', option1: '1', option2: '2'}
    // console.log(optionKeys, "-------", optionValues);
    function startDate() {
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, "0");
      const date = String(new Date().getDate()).padStart(2, "0");
      return `${year}-${month}-${date}`;
    }
    function endDate() {
      const today = new Date();
      const after7days = new Date(today.setDate(today.getDate() + 7));
      const year = after7days.getFullYear();
      const month = String(after7days.getMonth() + 1).padStart(2, "0");
      const date = String(after7days.getDate()).padStart(2, "0");
      return `${year}-${month}-${date}`;
    }
    const newVoting = {
      id: crypto.randomUUID(),
      subject: data.votingTitle,
      start: startDate(),
      end: endDate(),
      total: 0,
      owner: "test1",
      isSecret,
      isEnd: false,
      options,
    };
    setVoting(newVoting);
    const newVotingList = [...votingList, newVoting];
    setVotingList(newVotingList);
    setPageNum((prev) => (prev === 3 ? 3 : prev + 1));
  }
  function handleClickNextBtn(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPageNum((prev) => (prev === 3 ? 3 : prev + 1));
  }
  function handleClickPrevBtn(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPageNum((prev) => (prev === 0 ? 0 : prev - 1));
  }
  function handleClickAddBtn() {
    setInputNames([...inputNames, `option${count}`]);
    setOptionCount([...optionCount, count]);
    setCount((num) => num + 1);
    // id: number;
    // index: number;
    // name: string;
    // count: number;
    // image: string;
  }
  function handleClickDeleteBtn(event: React.MouseEvent<HTMLDivElement>) {
    /*
     */
    const newOptions = inputNames.filter((inputNames) => inputNames !== event.currentTarget.id);
    setInputNames(newOptions);
    const targetIndex = inputNames.findIndex((item) => item === event.currentTarget.id);
    const newOptionCount = optionCount.filter((count, index) => index !== targetIndex);
    setOptionCount(newOptionCount);
    // console.log(optionCount);
    // console.log(newOptionCount);
    // const copyOptions = [...optionCount];
    // const copyDeleteOption = [...deleteOption];
    // copyOptions.splice(deleteTargetIndex, 1);
    // copyDeleteOption.push(Number(event.currentTarget.id));
    // setOptionCount(copyOptions);
    // console.log(targetIndex);
    //
  }

  return (
    <>
      <Navigation />
      <Container>
        <PageTitle>투표 등록하기</PageTitle>
        <AnimatePresence>
          <PageContents onSubmit={handleSubmit(success)}>
            {pageNum === 0 ? (
              <Step>
                <StepTitle>STEP1. 투표 제목을 입력하세요.</StepTitle>
                <StepContents>
                  <InputBox>
                    <input {...register("votingTitle")}></input>
                    <span>({watch("votingTitle")?.length || "0"}/16자)</span>
                  </InputBox>
                </StepContents>
              </Step>
            ) : pageNum === 1 ? (
              <Step>
                <StepTitle>STEP2. 투표 항목을 입력하세요.</StepTitle>
                <StepContents>
                  {optionCount.map((number, index) => {
                    const inputName = `option${number}`;
                    const value = watch(inputName) || "";
                    return (
                      <div key={number}>
                        <InputBox>
                          <DeleteBtn onClick={handleClickDeleteBtn} id={`option${number}`}>
                            -
                          </DeleteBtn>
                          <p>{index + 1}번 항목 : </p>
                          <input {...register(inputName)}></input>
                          <span>({value.length || "0"}/10자)</span>
                        </InputBox>
                      </div>
                    );
                  })}
                </StepContents>
                <AddBtn onClick={handleClickAddBtn}>+</AddBtn>
              </Step>
            ) : pageNum === 2 ? (
              <Step>
                <StepTitle>STEP3. 비밀투표로 진행하시겠습니까?</StepTitle>
                <StepContents>
                  <InputBox>
                    <Labels>
                      <input
                        type="radio"
                        name="secret"
                        id="yes"
                        onChange={() => {
                          !isSecret && setIsSecret(true);
                        }}
                      ></input>
                      <label htmlFor="yes">네</label>
                    </Labels>
                    <Labels>
                      <input
                        type="radio"
                        name="secret"
                        id="no"
                        onChange={() => {
                          isSecret && setIsSecret(false);
                        }}
                      ></input>
                      <label htmlFor="no">아니요</label>
                    </Labels>
                  </InputBox>
                </StepContents>
              </Step>
            ) : null}
            <Btns>
              {pageNum === 0 || pageNum === 3 ? null : <PrevBtn onClick={handleClickPrevBtn}>이전</PrevBtn>}
              {pageNum === 2 ? (
                <NextBtn
                  onClick={() => {
                    handleSubmit(success);
                    // setPageNum((prev) => (prev === 3 ? 3 : prev + 1));
                  }}
                >
                  등록
                </NextBtn>
              ) : pageNum === 3 ? (
                <Link to="/">
                  <NextBtn>메인으로</NextBtn>
                </Link>
              ) : (
                <NextBtn onClick={handleClickNextBtn}>다음</NextBtn>
              )}
            </Btns>
          </PageContents>
        </AnimatePresence>
      </Container>
    </>
  );
}
