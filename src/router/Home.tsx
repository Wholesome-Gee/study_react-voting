import styled from "styled-components";
import VotingCard from "../components/VotingCard";
import EndVotingCard from "../components/EndVotingCard";
import { useRecoilValue } from "recoil";
import { endVotingsState, sortedByTotalVotings, votingsState } from "../atoms";
import Navigation from "../components/Navigation";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Background = styled.div`
  width: 100vw;
  min-width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Slider = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const SlideImg = styled(motion.div)<{ url: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(${(props) => props.url}) no-repeat center center;
  background-size: cover;
`;
const PrevBtn = styled.div`
  margin: auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  font-size: 32px;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pointColor.sub};
  }
`;
const NextBtn = styled(PrevBtn)`
  left: auto;
  right: 40px;
`;
const Banner = styled.div`
  width: 100%;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor.text};
  font-size: 1.5rem;
  font-weight: 600;
  background-color: ${(props) => props.theme.pointColor.main};
  div {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.pointColor.sub};
    }
    &:hover button {
      color: ${(props) => props.theme.textColor.text};
      background-color: ${(props) => props.theme.pointColor.sub};
    }
  }
  button {
    margin-left: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }
`;
const Container = styled.div`
  width: 1200px;
  min-width: 300px;
`;
const RecommendSection = styled.div`
  margin-bottom: 60px;
  display: flex;
  gap: 0 50px;
`;
const HotVotings = styled.div`
  padding-top: 60px;
  width: 100%;
`;
const AboutVotings = styled(HotVotings)``;

const SectionTItle = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  span:first-child {
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }
  span:last-child {
    color: ${(props) => props.theme.textColor.placeholder};
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.pointColor.sub};
    }
  }
`;
const VotingCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
const EndVotingSection = styled.div``;
const EndVotingList = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const slideVariants = {
  start: ({ width, reverseSlide }: { width: number; reverseSlide: boolean }) => ({
    x: reverseSlide ? -width : width,
  }),
  end: { x: 0 },
  out: ({ width, reverseSlide }: { width: number; reverseSlide: boolean }) => ({
    x: reverseSlide ? width : -width,
  }),
};

function Home() {
  const desktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const matchHome = useMatch("/");
  const navigate = useNavigate();
  const sortedVotingList = useRecoilValue(sortedByTotalVotings);
  const reverseVotingList = [...sortedVotingList].reverse().slice(0, 3); // 투표수 낮은 voting 3개
  const endVotintgList = useRecoilValue(endVotingsState).slice(0, 3);
  const votingList = useRecoilValue(votingsState);
  const [slidePage, setSlidePage] = useState(0);
  const [reverseSlide, setReverseSlide] = useState(false);
  const width = window.innerWidth;
  const arr = ["mainbanner1.png", "mainbanner2.jpg", "mainbanner3.jpg"];

  useEffect(() => {
    const json = localStorage.getItem("id");
    if (!json) return;
    const session = JSON.parse(json);
    if (Date.now() > session.expire) {
      localStorage.removeItem("id");
      localStorage.removeItem("pw");
      if (matchHome) {
        window.location.reload();
      } else {
        navigate("/");
      }
      alert("세션이 만료되어 로그아웃 됩니다.");
    }
  }, []);
  useEffect(() => {
    const autoSetSlidePage = setInterval(() => {
      setReverseSlide(false);
      setSlidePage((prev) => (prev === 2 ? 0 : prev + 1));
      console.log("123");
    }, 4000);
    return () => clearInterval(autoSetSlidePage);
  }, [slidePage]);

  function increaseSlidePage() {
    setReverseSlide(false);
    setSlidePage((prev) => (prev === 2 ? 2 : prev + 1));
  }
  function decreaseSlidePage() {
    setReverseSlide(true);
    setSlidePage((prev) => (prev === 0 ? 0 : prev - 1));
  }
  return (
    <>
      <Navigation />
      <Background>
        <Slider style={{ height: mobile ? "350px" : "550px" }}>
          <AnimatePresence
            initial={false}
            onExitComplete={() => {
              /*setIsSliding(false)*/
            }}
            custom={{ width, reverseSlide }}
          >
            {arr.map((item, index) =>
              index === slidePage ? (
                <SlideImg
                  custom={{ width, reverseSlide }}
                  variants={slideVariants}
                  initial="start"
                  animate="end"
                  exit="out"
                  transition={{ type: "tween", duration: 1 }}
                  url={process.env.PUBLIC_URL + `/images/${item}`}
                  key={item}
                ></SlideImg>
              ) : null
            )}
          </AnimatePresence>
          <PrevBtn
            style={{
              width: mobile ? "45px" : "60px",
              height: mobile ? "45px" : "60px",
              fontSize: mobile ? "24px" : "32px",
            }}
            onClick={decreaseSlidePage}
          >
            <FaChevronLeft />
          </PrevBtn>
          <NextBtn
            style={{
              width: mobile ? "45px" : "60px",
              height: mobile ? "45px" : "60px",
              fontSize: mobile ? "24px" : "32px",
            }}
            onClick={increaseSlidePage}
          >
            <FaChevronRight />
          </NextBtn>
        </Slider>
        <Banner>
          <div>
            <Link to={localStorage.getItem("id") ? "/votings/regist" : "/login"}>
              <span>투표 등록하기</span>
              <button>Click!</button>
            </Link>
          </div>
        </Banner>
        <Container style={{ width: desktop ? "1200px" : "90%" }}>
          <RecommendSection style={{ display: desktop ? "flex" : "block" }}>
            <HotVotings>
              <SectionTItle>
                <span>요즘 HOT한 투표 🔥</span>
                <Link to={"/votings"}>
                  <span>전체보기</span>
                </Link>
              </SectionTItle>
              <VotingCardList>
                {sortedVotingList.slice(0, 3).map((voting, index) => (
                  <VotingCard isHot={true} index={index} key={voting.subject} />
                ))}
              </VotingCardList>
            </HotVotings>
            <AboutVotings>
              <SectionTItle>
                <span>이런 투표는 어때요? 😊</span>
                <Link to={"/votings"}>
                  <span>전체보기</span>
                </Link>
              </SectionTItle>
              <VotingCardList>
                {reverseVotingList.map((voting, index) => (
                  <VotingCard isHot={false} index={index} key={voting.id} />
                ))}
              </VotingCardList>
            </AboutVotings>
          </RecommendSection>
          <EndVotingSection>
            <SectionTItle>
              <span>지난 투표 결과 보기 🔍</span>
              <Link to={"/votings/end"}>
                <span>전체보기</span>
              </Link>
            </SectionTItle>
            <EndVotingList>
              {endVotintgList.slice(0, 3).map((voting, index) => (
                <EndVotingCard index={index} key={voting.id + index} />
              ))}
            </EndVotingList>
          </EndVotingSection>
        </Container>
      </Background>
    </>
  );
}

export default Home;
