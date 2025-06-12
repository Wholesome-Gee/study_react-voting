import { useForm } from "react-hook-form";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { usersState } from "../atoms";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Form = styled.form`
  margin: 8rem auto 0;
  height: 400px;
  border: 1px solid ${(props) => props.theme.textColor.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 1rem;
`;
const IdInput = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
    text-align: center;
  }
  input {
    padding-bottom: 2px;
    border-bottom: 1px solid ${(props) => props.theme.textColor.text};
    color: ${(props) => props.theme.textColor.text};
    outline: none;
    background-color: transparent;
  }
`;
const PwInput = styled(IdInput)``;
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
const ErrorMessage = styled.div`
  margin-bottom: 1rem;
`;
const LoginLink = styled.div`
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;

interface IForm {
  id: string;
  pw1: string;
  pw2: string;
}
function Join() {
  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const navigate = useNavigate();
  const [userList, setUserList] = useRecoilState(usersState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  // function
  function successSubmit({ id, pw1, pw2 }: IForm) {
    // 중복된 id 입력 시 에러처리
    const exist = userList.find((user) => user.id === id);
    if (exist) {
      setError("id", { message: "이미 존재하는 id입니다." }, { shouldFocus: true });
      setValue("id", "");
      return;
    }
    // 비밀번호, 비밀번호 재입력 불일치 시 에러처리
    if (pw1 !== pw2) {
      setError("pw1", { message: "비밀번호가 일치하지 않습니다." }, { shouldFocus: true });
      setValue("pw1", "");
      setValue("pw2", "");
      return;
    }
    // userState atom에 유저정보 추가가
    const newUserList = [...userList, { id, pw: pw1 }];
    setUserList(newUserList);
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  }

  return (
    <>
      <Navigation />
      <Form
        style={{ width: mobile ? "80%" : "500px", fontSize: mobile ? "0.9rem" : "1.2rem" }}
        onSubmit={handleSubmit(successSubmit)}
      >
        <IdInput>
          <span style={{ width: mobile ? "70px" : "100px" }}>ID</span>
          <input
            {...register("id", {
              required: "id를 입력하세요.",
              pattern: { value: /^[a-zA-Z0-9_-]+$/, message: "영어와 숫자만 사용할 수 있습니다." },
            })}
            placeholder="id를 입력하세요."
            type="text"
            autoComplete="off"
            style={{ width: mobile ? "160px" : "210px" }}
          />
        </IdInput>
        <PwInput>
          <span style={{ width: mobile ? "70px" : "100px" }}>P/W</span>
          <input
            {...register("pw1", { required: "비밀번호를 입력하세요." })}
            placeholder="비밀번호를 입력하세요."
            type="password"
            style={{ width: mobile ? "160px" : "210px" }}
          />
        </PwInput>
        <PwInput>
          <span style={{ width: mobile ? "70px" : "100px" }}>P/W 확인</span>
          <input
            {...register("pw2", { required: "비밀번호를 입력하세요." })}
            placeholder="비밀번호를 재입력하세요."
            type="password"
            style={{ width: mobile ? "160px" : "210px" }}
          />
        </PwInput>
        {errors.id?.message ? (
          <ErrorMessage>{errors.id?.message}</ErrorMessage>
        ) : errors.pw1?.message ? (
          <ErrorMessage>{errors.pw1?.message}</ErrorMessage>
        ) : errors.pw2?.message ? (
          <ErrorMessage>{errors.pw2?.message}</ErrorMessage>
        ) : null}
        <Btn>Join</Btn>
        <LoginLink>
          <Link to="/login">로그인하기 →</Link>
        </LoginLink>
      </Form>
    </>
  );
}

export default Join;
