import styled from "styled-components";
import Navigation from "../components/Navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
`;
const Container = styled.div`
  margin: 0 auto;
  padding: 100px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainTitle = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;
const Form = styled.form`
  margin: 100px 0;
  width: 100%;
  /* border: 1px solid gray; */
  position: relative;
`;
const Section = styled.div`
  margin-bottom: 80px;
  & > input {
    margin-right: 8px;
    width: 60%;
    border-bottom: 1px solid ${(props) => props.theme.textColor.text};
    color: ${(props) => props.theme.textColor.text};
    font-size: 2rem;
    outline: none;
    background-color: transparent;
  }
`;
const SectionTitle = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
`;
const OptionsContainer = styled.div`
  margin: 3rem 0 6rem 0;
  width: 100%;
  display: flex;
  position: relative;
`;
const OptionsLeft = styled.div`
  width: 50%;
`;
const OptionCard = styled.div`
  margin: 0 auto;
  padding: 4rem 1rem;
  width: 70%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 5px 5px 25px 3px ${(props) => props.theme.boxColor};
  background-color: ${(props) => props.theme.boxColor};
`;
const CardIndex = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.8rem;
`;
const CardImg = styled.div`
  margin-bottom: 3rem;
  width: 250px;
  height: 250px;
  background-color: aliceblue;
  border-radius: 50%;
`;
const CardName = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;
const CardDescription = styled.div`
  font-size: 1.1rem;
`;
const OptionsRight = styled.div`
  width: 50%;
  overflow-y: auto;
`;
const OptionBox = styled.div`
  margin-bottom: 3rem;
`;
const OptionTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;
const OptionName = styled.input`
  margin-right: 8px;
  width: 60%;
  border-bottom: 1px solid ${(props) => props.theme.textColor.text};
  font-size: 1.1rem;
  background-color: transparent;
  outline: none;
  color: ${(props) => props.theme.textColor.text};
`;
const OptionDescription = styled.textarea`
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;
  height: 210px;
  font-size: 1.1rem;
`;
const OptionFile = styled.input``;
const AddBtn = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 150px;
  color: ${(props) => props.theme.bgColor};
  font-size: 3rem;
  background-color: ${(props) => props.theme.textColor.text};
`;
const DeleteBtn = styled(AddBtn)<{ id: number }>`
  margin: 0;
  position: absolute;
  top: 0;
  left: auto;
  right: 0;
  margin-bottom: 1rem;
`;
const Btns = styled.div`
  margin-top: 200px;
  display: flex;
  justify-content: center;
  gap: 3rem;
`;
const SubmitBtn = styled.button`
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  color: ${(props) => props.theme.textColor.text};
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.theme.pointColor.main};
  &:hover {
    color: ${(props) => props.theme.pointColor.sub};
  }
`;
const CancelBtn = styled(SubmitBtn)`
  background-color: ${(props) => props.theme.boxColor};
`;
const Error = styled.div`
  margin-top: 1rem;
  color: ${(props) => props.theme.textColor.placeholder};
  font-size: 1.2rem;
`;
const TextLength = styled.span`
  color: ${(props) => props.theme.textColor.placeholder};
`;
interface IForm {
  votingTitle: string;
  optionName: string;
  optionsDescription: string;
}
export default function Votings() {
  const [count, setCount] = useState(2);
  const [options, setOptions] = useState<number[]>([1]);
  const banWords = ["씨발", "개새끼"];
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>();
  console.log(watch());
  function handleClickAddBtn() {
    const newOptions = [...options, count];
    setCount((prev) => prev + 1);
    setOptions(newOptions);
  }
  function handleClickDeleteBtn(event: React.MouseEvent<HTMLDivElement>) {
    const targetIndex = [...options].findIndex((option) => option === Number(event.currentTarget.id));
    const newOptions = [...options];
    newOptions.splice(targetIndex, 1);
    setOptions(newOptions);
  }
  function success(data: IForm) {
    console.log("성공", data.votingTitle);
  }

  return (
    <>
      <Navigation />
      <Body>
        <Container>
          <MainTitle>투표 등록하기</MainTitle>
          <Form onSubmit={handleSubmit(success)}>
            <Section>
              <SectionTitle>1. 제목을 입력하세요. (16자 이내)</SectionTitle>
              <input
                {...register("votingTitle", {
                  required: "❌ 투표 제목을 입력해주세요.",
                  minLength: { value: 2, message: "❌ 투표 제목은 2글자 이상 16글자 이하로 입력해주세요." },
                  maxLength: { value: 16, message: "❌ 투표 제목은 2글자 이상 16글자 이하로 입력해주세요." },
                  validate: {
                    banWord: (value) =>
                      banWords.find((word) => value.includes(word)) ? "❌ 사용할 수 없는 단어가 포함되었습니다." : true,
                  },
                })}
                type="text"
              ></input>
              {watch().votingTitle ? (
                <TextLength>({watch().votingTitle.length}/16자 )</TextLength>
              ) : (
                <TextLength>(0/16자)</TextLength>
              )}
              <Error>{errors?.votingTitle?.message}</Error>
            </Section>
            <Section>
              <SectionTitle>2. 항목을 입력하세요. </SectionTitle>
              {options.map((option) => (
                <OptionsContainer key={option}>
                  <OptionsLeft>
                    <OptionCard>
                      <CardIndex>{options.findIndex((item) => item === option) + 1}</CardIndex>
                      <CardImg></CardImg>
                      <CardName>한로로</CardName>
                      <CardDescription>
                        <span>
                          일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
                        </span>
                        <span>...더보기</span>
                      </CardDescription>
                    </OptionCard>
                  </OptionsLeft>
                  <OptionsRight>
                    <OptionBox>
                      <OptionTitle>1. 이름 (10자 이내)</OptionTitle>
                      <OptionName
                        {...register("optionName", {
                          required: "❌ 항목의 이름을 입력해주세요.",
                          minLength: { value: 1, message: "❌ 투표 제목은 1글자 이상 16글자 이하로 입력해주세요." },
                          maxLength: { value: 10, message: "❌ 투표 제목은 1글자 이상 16글자 이하로 입력해주세요." },
                          validate: {
                            banWord: (value) =>
                              banWords.find((word) => value.includes(word))
                                ? "❌ 사용할 수 없는 단어가 포함되었습니다."
                                : true,
                          },
                        })}
                      ></OptionName>
                      {watch().optionName ? (
                        <TextLength>({watch().optionName.length}/10자 )</TextLength>
                      ) : (
                        <TextLength>(0/10자)</TextLength>
                      )}
                      <Error>{errors?.optionName?.message}</Error>
                    </OptionBox>
                    <OptionBox>
                      <OptionTitle>2. 설명</OptionTitle>
                      <OptionDescription
                        {...register("optionsDescription", {
                          required: "❌ 항목 설명을 입력해주세요.",
                          minLength: { value: 2, message: "❌ 항목 설명은 1글자 이상 300글자 이하로 입력해주세요." },
                          maxLength: { value: 300, message: "❌ 항목 설명은 1글자 이상 300글자 이하로 입력해주세요." },
                          validate: {
                            banWord: (value) =>
                              banWords.find((word) => value.includes(word))
                                ? "❌ 사용할 수 없는 단어가 포함되었습니다."
                                : true,
                          },
                        })}
                      ></OptionDescription>
                      {watch().optionsDescription ? (
                        <TextLength>({watch().optionsDescription.length}/300자 )</TextLength>
                      ) : (
                        <TextLength>(0/300자)</TextLength>
                      )}
                      <Error>{errors?.optionsDescription?.message}</Error>
                    </OptionBox>
                    <OptionBox>
                      <OptionTitle>3. 이미지 업로드</OptionTitle>
                      <OptionFile type="file"></OptionFile>
                    </OptionBox>
                  </OptionsRight>
                  <DeleteBtn onClick={handleClickDeleteBtn} id={option}>
                    -
                  </DeleteBtn>
                </OptionsContainer>
              ))}
              <AddBtn onClick={handleClickAddBtn}>+</AddBtn>
            </Section>
            <Btns>
              <SubmitBtn>제출하기</SubmitBtn>
              <CancelBtn>취소하기</CancelBtn>
            </Btns>
          </Form>
        </Container>
        ;
      </Body>
    </>
  );
}
