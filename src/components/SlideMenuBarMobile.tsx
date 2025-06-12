import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

// on/off 메뉴창의 overlay
const MenuOverlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

// on/off 메뉴창
const MenuContainer = styled(motion.div)<{ height: number }>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  background-color: ${(props) => props.theme.bgColor};
`;
const CloseBtn = styled.div`
  margin: auto;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor.text};
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  & svg {
    font-size: 28px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;
const TopBox = styled.div`
  margin: 80px 0;
  padding: 0 12%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  font-size: 20px;
`;

const BottomBox = styled.div`
  margin-bottom: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  font-size: 20px;
`;
const MenuContainerVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0 },
};
const MenuBarVariant = {
  start: { y: "-100%", opacity: 0 },
  end: { y: "0", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

interface IProps {
  toggleSetMenu: any;
  height: number;
}
function SlideMenuBarMobile({ toggleSetMenu, height }: IProps) {
  const navigate = useNavigate();
  function clickLogout() {
    localStorage.removeItem("id");
    localStorage.removeItem("pw");
    navigate("/");
    alert("로그아웃 되었습니다.");
  }
  return (
    <>
      <MenuOverlay
        variants={MenuContainerVariant}
        initial="start"
        animate="end"
        exit="exit"
        transition={{ type: "tween", duration: 0.2 }}
        onClick={toggleSetMenu}
      ></MenuOverlay>
      <MenuContainer
        variants={MenuBarVariant}
        initial="start"
        animate="end"
        exit="exit"
        height={height}
        transition={{ type: "tween", duration: 0.2 }}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <CloseBtn>
          <MdClose onClick={toggleSetMenu} />
        </CloseBtn>
        <TopBox>
          <Link to={localStorage.getItem("id") ? "/votings/regist" : "/login"}>
            <p>투표 등록하기</p>
          </Link>
          <Link to={"/votings"}>
            <p>진행중인 투표</p>
          </Link>
          <Link to={"/votings/end"}>
            <p>종료된 투표</p>
          </Link>
        </TopBox>
        <BottomBox>
          {localStorage.getItem("id") ? (
            <p onClick={clickLogout}>로그아웃</p>
          ) : (
            <>
              <Link to={localStorage.getItem("id") ? "/votings/regist" : "/join"}>
                <p>회원가입하기</p>
              </Link>
              <Link to={localStorage.getItem("id") ? "/votings/regist" : "/login"}>
                <p>로그인하기</p>
              </Link>
            </>
          )}
        </BottomBox>
      </MenuContainer>
    </>
  );
}

export default SlideMenuBarMobile;
