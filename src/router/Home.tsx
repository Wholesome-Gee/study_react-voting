import styled from "styled-components";
import VotingCard from "../components/VotingCard";
import EndVotingCard from "../components/EndVotingCard";
import { useRecoilValue } from "recoil";
import { endVotingsState, sortedByTotalVotings, votingsState } from "../atoms";
import Navigation from "../components/Navigation";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 550px;
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColor};
`;
const SlideBanner = styled.div<{ url: string }>`
  width: 100%;
  height: 600px;
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
`;
const RecommendSection = styled.div`
  display: flex;
`;
const RecommendHot = styled.div`
  padding: 60px 30px;
  width: 100%;
`;
const RecommendAbout = styled(RecommendHot)``;

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
const EndVotingSection = styled.div`
  width: 100%;
  padding: 60px 30px;
`;
const EndVotingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

function Home() {
  const matchHome = useMatch("/");
  const navigate = useNavigate();
  const sortedVotingList = useRecoilValue(sortedByTotalVotings);
  const reverseVotingList = [...sortedVotingList].reverse().slice(0, 3); // 투표수 낮은 voting 3개
  const endVotintgList = useRecoilValue(endVotingsState).slice(0, 3);
  const votingList = useRecoilValue(votingsState);
  const [bannerPage, setBannerPage] = useState(0);

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

  return (
    <>
      <Navigation />
      <Background>
        <Slide>
          <AnimatePresence>
            {["mainbanner1.png", "mainbanner2.jpg"].map((item, index) =>
              index === bannerPage ? (
                <SlideBanner url={process.env.PUBLIC_URL + `/images/${item}`} key={item}>
                  {/* <p>아싸라비요</p> */}
                  {/* <button>링크버튼이여</button> */}
                </SlideBanner>
              ) : null
            )}
            <PrevBtn>&larr;</PrevBtn>
            <NextBtn>&rarr;</NextBtn>
          </AnimatePresence>
        </Slide>
        <Banner>
          <div>
            <Link to={localStorage.getItem("id") ? "/votings/regist" : "/login"}>
              <span>투표 등록하기</span>
              <button>Click!</button>
            </Link>
          </div>
        </Banner>
        <Container>
          <RecommendSection>
            <RecommendHot>
              <SectionTItle>
                <span>요즘 HOT한 투표 🔥</span>
                <Link to={"/votings"}>
                  <span>전체보기</span>
                </Link>
              </SectionTItle>
              <VotingCardList>
                {sortedVotingList.slice(0, 3).map((voting, index) => (
                  <VotingCard isHot={true} index={index} key={voting.id} />
                ))}
              </VotingCardList>
            </RecommendHot>
            <RecommendAbout>
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
            </RecommendAbout>
          </RecommendSection>
          <EndVotingSection>
            <SectionTItle>
              <span>지난 투표 결과 보기 🔍</span>
              <span>전체보기</span>
            </SectionTItle>
            <EndVotingList>
              {endVotintgList.slice(0, 3).map((voting, index) => (
                <EndVotingCard index={index} key={voting.id} />
              ))}
            </EndVotingList>
          </EndVotingSection>
        </Container>
      </Background>
    </>
  );
}

export default Home;
