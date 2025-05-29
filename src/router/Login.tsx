import { useForm } from "react-hook-form";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { usersState } from "../atoms";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  margin-top: 8rem;
  width: 500px;
  height: 400px;
  border: 1px solid ${(props) => props.theme.textColor.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const IdInput = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  input {
    width: 150px;
    padding-bottom: 2px;
    border-bottom: 1px solid ${(props) => props.theme.textColor.text};
    color: ${(props) => props.theme.textColor.text};
    font-size: 1.2rem;
    outline: none;
    background-color: transparent;
  }
`;
const PwInput = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  input {
    width: 150px;
    padding-bottom: 2px;
    border-bottom: 1px solid ${(props) => props.theme.textColor.text};
    color: ${(props) => props.theme.textColor.text};
    font-size: 1.2rem;
    outline: none;
    background-color: transparent;
  }
`;
const InputName = styled.p`
  width: 3.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;
const Btn = styled.button`
  margin-top: 2rem;
  width: 150px;
  height: 50px;
  color: ${(props) => props.theme.textColor.text};
  font-weight: 600;
  border-radius: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.pointColor.main};
`;
const Error = styled.div`
  margin-bottom: 1rem;
`;
const Join = styled.div`
  position: absolute;
  bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;

interface IForm {
  id: string;
  pw: string;
}
function Login() {
  // reactHooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const userList = useRecoilValue(usersState);
  const navigate = useNavigate();
  const match = useMatch("/");
  // function
  function successSubmit({ id, pw }: IForm) {
    const isExist = userList.find((user) => user.id === id);
    if (!isExist) {
      setError("id", { message: "존재하지 않는 id 입니다." }, { shouldFocus: true });
      setValue("id", "");
      setValue("pw", "");
      return;
    }
    if (isExist.pw !== pw) {
      setError("id", { message: "비밀번호가 틀렸습니다." }, { shouldFocus: true });
      setValue("id", "");
      setValue("pw", "");
      return;
    }
    const idObj = JSON.stringify({ value: id, expire: Date.now() + 1800000 });
    const pwObj = JSON.stringify({ value: pw, expire: Date.now() + 1800000 });
    localStorage.setItem("id", idObj);
    localStorage.setItem("pw", pwObj);
    setTimeout(() => {
      localStorage.removeItem("id");
      localStorage.removeItem("pw");
      console.log("로그인 30분경과로 인한 자동 로그아웃");
      if (match) {
        window.location.reload();
      } else {
        navigate("/");
      }
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
    }, 1800000);
    navigate("/");
  }

  return (
    <>
      <Navigation />
      <Container>
        <Form onSubmit={handleSubmit(successSubmit)}>
          <IdInput>
            <InputName>ID</InputName>
            <input
              {...register("id", {
                required: "id를 입력하세요.",
                pattern: { value: /^[a-zA-Z0-9_-]+$/, message: "영어와 숫자만 사용할 수 있습니다." },
              })}
              placeholder="test1"
              type="text"
              autoComplete="off"
            />
          </IdInput>
          <PwInput>
            <InputName>P/W</InputName>
            <input {...register("pw", { required: "비밀번호를 입력하세요." })} placeholder="1234" type="password" />
          </PwInput>
          {errors.id?.message ? (
            <Error>{errors.id?.message}</Error>
          ) : errors.pw?.message ? (
            <Error>{errors.pw?.message}</Error>
          ) : null}
          <Btn>Log In</Btn>
          <Join>
            <Link to="/join">회원가입하기 →</Link>
          </Join>
        </Form>
      </Container>
    </>
  );
}

export default Login;
