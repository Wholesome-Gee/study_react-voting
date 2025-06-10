import { Link } from "react-router-dom";
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
const MenuContainer = styled(motion.div)`
  width: 40%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  background-color: ${(props) => props.theme.bgColor};
`;
const CloseBtn = styled.div`
  /* padding: 32px; */
  padding: 8% 12%;
  color: ${(props) => props.theme.textColor.text};
  border-bottom: 1px solid ${(props) => props.theme.textColor.placeholder};
  & svg {
    font-size: 32px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  & svg:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;
const Menues = styled.div`
  margin: 16% 0;
  padding: 0 12%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  // 각 메뉴 hover시 color 변경
  p {
    color: ${(props) => props.theme.textColor.text};
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  p:hover {
    color: ${(props) => props.theme.pointColor.main};
  }
`;

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

interface IProps {
  toggleSetMenu: any;
  desktop: boolean;
}
function SlideMenuBar({ toggleSetMenu, desktop }: IProps) {
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
        transition={{ type: "tween", duration: 0.2 }}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <CloseBtn>
          <MdClose onClick={toggleSetMenu} style={{ fontSize: desktop ? "32px" : "28px" }} />
        </CloseBtn>
        <Menues>
          <Link to={localStorage.getItem("id") ? "/votings/regist" : "/login"}>
            <p style={{ fontSize: desktop ? "32px" : "20px" }}>투표 등록하기 →</p>
          </Link>
          <Link to={"/votings"}>
            <p style={{ fontSize: desktop ? "32px" : "20px" }}>진행중인 투표 →</p>
          </Link>
          <Link to={"/votings/end"}>
            <p style={{ fontSize: desktop ? "32px" : "20px" }}>종료된 투표 →</p>
          </Link>
        </Menues>
      </MenuContainer>
    </>
  );
}

export default SlideMenuBar;
