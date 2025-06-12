import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SlideMenuBar from "./SlideMenuBar";
import SlideMenuBarMobile from "./SlideMenuBarMobile";

//네비게이션바 전체
const Container = styled.div`
  width: 100%;
  min-width: 375px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor.text};
  background-color: black;
  // 각 메뉴 hover시 color 변화
  & > div {
    transition: all 0.2s ease-in-out;
  }
  & > div:first-child:hover,
  & > div:nth-child(2):hover {
    color: ${(props) => props.theme.textColor.placeholder};
  }
`;

// 메뉴 박스
const LeftBox = styled.div`
  width: 33%;
  display: flex;
  // hover시 메뉴바 90도 회전
  &:hover div:first-child {
    transform: rotate(90deg);
  }
`;
const MenuBar = styled.div`
  margin-right: 8px;
  transition: 0.3s;
`;

// 로고 박스
const Logo = styled.div`
  width: 33%;
  text-align: center;
`;

// 회원가입,로그인 박스
const RightBox = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  // 각 기능 hover시 color 변화
  div {
    transition: 0.3s;
  }
  div:hover {
    color: ${(props) => props.theme.textColor.placeholder};
  }
`;
const Join = styled.div`
  margin-right: 32px;
`;
const Login = styled.div``;
const Logout = styled.div``;

export default function Navigation() {
  const desktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const navigate = useNavigate();
  const [clickMenu, setClickMenu] = useState(false);
  function toggleSetMenu() {
    setClickMenu((prev) => !prev);
  }
  function clickLogout() {
    localStorage.removeItem("id");
    localStorage.removeItem("pw");
    navigate("/");
    alert("로그아웃 되었습니다.");
  }
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);
  return (
    <>
      <Container
        style={{
          padding: desktop ? "1.5% 3%" : tablet ? "3% 3%" : "3% 3%",
          position: mobile ? "fixed" : "relative",
          top: mobile ? "0" : "auto",
          zIndex: mobile ? "5" : "0",
        }}
        ref={ref}
      >
        <LeftBox onClick={toggleSetMenu}>
          <MenuBar>
            <RxHamburgerMenu />
          </MenuBar>
          {mobile ? "" : "메뉴"}
        </LeftBox>
        <Logo>
          <Link to="/">VOTING</Link>
        </Logo>
        <RightBox>
          {mobile ? null : localStorage.getItem("id") ? (
            <Logout onClick={clickLogout}>로그아웃</Logout>
          ) : (
            <>
              <Join>
                <Link to="/join">회원가입</Link>
              </Join>
              <Login>
                <Link to="/login">로그인</Link>
              </Login>
            </>
          )}
        </RightBox>
      </Container>
      <AnimatePresence>
        {clickMenu ? (
          mobile ? (
            <SlideMenuBarMobile height={height} toggleSetMenu={toggleSetMenu} />
          ) : (
            <SlideMenuBar desktop={desktop} toggleSetMenu={toggleSetMenu} />
          )
        ) : null}
      </AnimatePresence>
    </>
  );
}
