import styled from "styled-components";
import Card from "../components/RecommendVotingCard";
import EndVotingCard from "../components/EndVotingCard";
import { useRecoilValue } from "recoil";
import { endVotingsState, sortedByTotalVotings, votingsState } from "../atoms";
import Navigation from "../components/Navigation";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Slide = styled.div`
  width: 100%;
  height: 550px;
  background-color: ${(props) => props.theme.bgColor};
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
const Recommend = styled.div`
  display: flex;
`;
const RecommnedSection = styled.div`
  padding: 60px 30px;
  width: 100%;
`;

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
const VotingCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
const EndVotingSection = styled.div`
  width: 100%;
  padding: 60px 30px;
`;
const EndVotings = styled.div`
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
        <Slide></Slide>
        <Banner>
          <div>
            <Link to={localStorage.getItem("id") ? "/votings/regist" : "/login"}>
              <span>투표 등록하기</span>
              <button>Click!</button>
            </Link>
          </div>
        </Banner>
        <Container>
          <Recommend>
            <RecommnedSection>
              <SectionTItle>
                <span>요즘 HOT한 투표 🔥</span>
                <Link to={"/votings"}>
                  <span>전체보기</span>
                </Link>
              </SectionTItle>
              <VotingCards>
                {sortedVotingList.slice(0, 3).map((voting, index) => (
                  <Card isHot={true} index={index} key={voting.id} />
                ))}
              </VotingCards>
            </RecommnedSection>
            <RecommnedSection>
              <SectionTItle>
                <span>이런 투표는 어때요? 😊</span>
                <Link to={"/votings"}>
                  <span>전체보기</span>
                </Link>
              </SectionTItle>
              <VotingCards>
                {reverseVotingList.map((voting, index) => (
                  <Card isHot={false} index={index} key={voting.id} />
                ))}
              </VotingCards>
            </RecommnedSection>
          </Recommend>
          <EndVotingSection>
            <SectionTItle>
              <span>지난 투표 결과 보기 🔍</span>
              <span>전체보기</span>
            </SectionTItle>
            <EndVotings>
              {endVotintgList.slice(0, 3).map((voting, index) => (
                <EndVotingCard index={index} key={voting.id} />
              ))}
            </EndVotings>
          </EndVotingSection>
        </Container>
      </Background>
    </>
  );
}

export default Home;
