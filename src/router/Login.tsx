import { useForm } from "react-hook-form";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { usersState } from "../atoms";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Container = styled.form`
  margin: 8rem auto 0;
  margin-top: 8rem;
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

// 인터페이스
interface IForm {
  id: string;
  pw: string;
}

//
function Login() {
  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const userList = useRecoilValue(usersState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  // function
  function success({ id, pw }: IForm) {
    const exist = userList.find((user) => user.id === id);
    // 잘못된 id 입력 시 에러처리
    if (!exist) {
      setError("id", { message: "존재하지 않는 id 입니다." }, { shouldFocus: true });
      setValue("id", "");
      setValue("pw", "");
      return;
    }
    // 잘못된 pw 입력 시 에러처리
    if (exist.pw !== pw) {
      setError("id", { message: "비밀번호가 틀렸습니다." }, { shouldFocus: true });
      setValue("pw", "");
      return;
    }
    // localStorage에 로그인 유저 정보 등록
    const idJSON = JSON.stringify({ value: id, expire: Date.now() + 1800000 });
    const pwJSON = JSON.stringify({ value: pw, expire: Date.now() + 1800000 });
    localStorage.setItem("id", idJSON);
    localStorage.setItem("pw", pwJSON);
    // 30분후 localStorage에 로그인 유저 정보 삭제 후 Home으로 이동
    setTimeout(() => {
      localStorage.removeItem("id");
      localStorage.removeItem("pw");
      if (homeMatch) {
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
      <Container style={{ width: mobile ? "80%" : "500px" }} onSubmit={handleSubmit(success)}>
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
      </Container>
    </>
  );
}

export default Login;
