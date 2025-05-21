import { useForm } from "react-hook-form";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { usersState } from "../atoms";
import { Link, useNavigate } from "react-router-dom";

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
  & > div {
    margin: 0 auto;
    width: 300px;
    display: flex;
    align-items: center;
    input {
      width: 200px;
      padding-bottom: 2px;
      border-bottom: 1px solid ${(props) => props.theme.textColor.text};
      color: ${(props) => props.theme.textColor.text};
      font-size: 1.2rem;
      outline: none;
      background-color: transparent;
    }
  }
`;
const PwInput = styled.div`
  margin-bottom: 1rem;
  & > div {
    margin: 0 auto;
    width: 300px;
    display: flex;
    align-items: center;
    input {
      width: 200px;
      padding-bottom: 2px;
      border-bottom: 1px solid ${(props) => props.theme.textColor.text};
      color: ${(props) => props.theme.textColor.text};
      font-size: 1.2rem;
      outline: none;
      background-color: transparent;
    }
  }
`;
const InputName = styled.p`
  width: 100px;
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
const Login = styled.div`
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
  pw1: string;
  pw2: string;
}
function Join() {
  // reactHooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const [userList, setUserList] = useRecoilState(usersState);
  const navigate = useNavigate();

  // function
  function successSubmit({ id, pw1, pw2 }: IForm) {
    const existId = userList.find((user) => user.id === id);
    if (existId) {
      setError("id", { message: "이미 존재하는 id입니다." }, { shouldFocus: true });
      setValue("id", "");
      return;
    }
    if (pw1 !== pw2) {
      setError("pw1", { message: "비밀번호가 일치하지 않습니다." }, { shouldFocus: true });
      setValue("pw1", "");
      setValue("pw2", "");
      return;
    }
    const newUserList = [...userList, { id, pw: pw1 }];
    setUserList(newUserList);
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  }

  return (
    <>
      <Navigation />
      <Container>
        <Form onSubmit={handleSubmit(successSubmit)}>
          <IdInput>
            <div>
              <InputName>ID</InputName>
              <input
                {...register("id", {
                  required: "id를 입력하세요.",
                  pattern: { value: /^[a-zA-Z0-9_-]+$/, message: "영어와 숫자만 사용할 수 있습니다." },
                })}
                placeholder="id를 입력하세요."
                type="text"
                autoComplete="off"
              />
            </div>
          </IdInput>
          <PwInput>
            <div>
              <InputName>P/W</InputName>
              <input
                {...register("pw1", { required: "비밀번호를 입력하세요." })}
                placeholder="비밀번호를 입력하세요."
                type="password"
              />
            </div>
          </PwInput>
          <PwInput>
            <div>
              <InputName>P/W 확인</InputName>
              <input
                {...register("pw2", { required: "비밀번호를 입력하세요." })}
                placeholder="비밀번호를 한번 더 입력하세요."
                type="password"
              />
            </div>
          </PwInput>
          {errors.id?.message ? (
            <Error>{errors.id?.message}</Error>
          ) : errors.pw1?.message ? (
            <Error>{errors.pw1?.message}</Error>
          ) : errors.pw2?.message ? (
            <Error>{errors.pw2?.message}</Error>
          ) : null}
          <Btn>Join</Btn>
          <Login>
            <Link to="/login">로그인하기 →</Link>
          </Login>
        </Form>
      </Container>
    </>
  );
}

export default Join;
