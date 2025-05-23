import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 1rem 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor.text};
  background-color: black;
  & > div {
    width: 33%;
    transition: all 0.2s ease-in-out;
  }
  & > div:first-child:hover,
  & > div:nth-child(2):hover {
    color: ${(props) => props.theme.textColor.placeholder};
  }
`;
const Menu = styled.div`
  display: flex;
  &:hover div:first-child {
    transform: rotate(90deg);
  }
`;
const MenuIcon = styled.div`
  margin-right: 8px;
  transition: 0.3s;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
`;
const LoginBox = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
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
const MenuContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;
const MenuBar = styled(motion.div)`
  width: 25%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  background-color: ${(props) => props.theme.bgColor};
`;
const CloseBtn = styled.div`
  padding: 32px;
  font-size: 2rem;
  color: ${(props) => props.theme.textColor.text};
  border-bottom: 1px solid ${(props) => props.theme.textColor.placeholder};
  & svg {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  & svg:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;
const Menues = styled.div`
  margin: 100px 0;
  padding: 0 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  p {
    margin: 50px 0;
    color: ${(props) => props.theme.textColor.text};
    font-size: 2rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  p:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;
const Logout = styled.div``;

const MenuContainerVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0 },
};
const MenuBarVariant = {
  start: { x: "-100%", opacity: 0 },
  end: { x: "0", opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};
export default function Navigation() {
  const [clickMenu, setClickMenu] = useState(false);
  function toggleSetMenu() {
    setClickMenu((prev) => !prev);
  }
  function clickLogout() {
    localStorage.removeItem("id");
    localStorage.removeItem("pw");
    window.location.reload();
  }
  return (
    <>
      <Container>
        <Menu onClick={toggleSetMenu}>
          <MenuIcon>
            <RxHamburgerMenu />
          </MenuIcon>
          메뉴
        </Menu>
        <Logo>
          <Link to="/">VOTING</Link>
        </Logo>
        <LoginBox>
          {localStorage.getItem("id") ? (
            <Logout onClick={clickLogout}>로그아웃</Logout>
          ) : (
            <>
              <Join>
                <Link to="/">회원가입</Link>
              </Join>
              <Login>
                <Link to="/login">로그인</Link>
              </Login>
            </>
          )}
        </LoginBox>
      </Container>
      <AnimatePresence>
        {clickMenu ? (
          <>
            <MenuContainer
              variants={MenuContainerVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ type: "tween", duration: 0.2 }}
              onClick={toggleSetMenu}
            ></MenuContainer>
            <MenuBar
              variants={MenuBarVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ type: "tween", duration: 0.2 }}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
            >
              <CloseBtn>
                <MdClose onClick={toggleSetMenu} />
              </CloseBtn>
              <Menues>
                <p>투표 등록하기 →</p>
                <p>진행중인 투표 →</p>
                <p>종료된 투표 →</p>
              </Menues>
            </MenuBar>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
