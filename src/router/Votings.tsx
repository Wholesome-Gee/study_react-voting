import styled from "styled-components";
import Navigation from "../components/Navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { usersSelector, votingsSelector } from "../atoms";

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
const DeleteBtn = styled.div<{ id: number }>`
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
  const [pageNum, setPageNum] = useState(0);
  const [optionNum, setOptionNum] = useState(3);
  const [options, setOptions] = useState<number[]>([1, 2]);
  const [deleteOption, setDeleteOption] = useState<number[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function success() {}
  function handleClickNextBtn(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPageNum((prev) => (prev === 3 ? 3 : prev + 1));
  }
  function handleClickPrevBtn(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPageNum((prev) => (prev === 0 ? 0 : prev - 1));
  }
  function handleClickAddBtn() {
    setOptions([...options, optionNum]);
    setOptionNum((num) => num + 1);
  }
  function handleClickDeleteBtn(event: React.MouseEvent<HTMLDivElement>) {
    const deleteTargetIndex = options.findIndex((item) => item === Number(event.currentTarget.id));
    const copyOptions = [...options];
    const copyDeleteOption = [...deleteOption];
    copyOptions.splice(deleteTargetIndex, 1);
    copyDeleteOption.push(Number(event.currentTarget.id));
    setOptions(copyOptions);
    //
  }
  console.log(watch());

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
                  {options.map((number, index) => {
                    const inputName = `option${number}Name`;
                    const value = watch(inputName) || "";
                    return (
                      <>
                        <InputBox key={number}>
                          <DeleteBtn onClick={handleClickDeleteBtn} id={number}>
                            -
                          </DeleteBtn>
                          <p>{index + 1}번 항목 : </p>
                          <input {...register(inputName)}></input>
                          <span>({value.length || "0"}/10자)</span>
                        </InputBox>
                      </>
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
                    <input {...register("votingTitle")} type="radio" name="secret"></input>
                    <div>네</div>
                    <input {...register("votingTitle")} type="radio" name="secret"></input>
                    <div>아니요</div>
                  </InputBox>
                </StepContents>
              </Step>
            ) : null}
            <Btns>
              {pageNum === 0 ? null : <PrevBtn onClick={handleClickPrevBtn}>이전</PrevBtn>}
              {pageNum === 2 ? (
                <NextBtn onClick={handleClickNextBtn}>등록</NextBtn>
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
