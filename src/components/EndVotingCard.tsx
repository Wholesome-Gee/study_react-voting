import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { endVotingsState } from "../atoms";
import { useMediaQuery } from "react-responsive";

const CardContainer = styled.div`
  padding: 1rem 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.textColor.text};
  border-radius: 1rem;
  position: relative;
`;
const Header = styled.div`
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
const Total = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.textColor.placeholder};
`;
const Contents = styled.div`
  padding: 4px 1.5rem;
  height: 80px;
  display: flex;
  align-items: center;
`;
const FirstOption = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;

  & > span:first-child {
    // 메달
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }
  & > span:nth-child(2) {
    // 메달 옆 텍스트
    margin-right: 1rem;
    font-weight: 600;
  }
  & > div {
    // 득표수,투표율 박스
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0.5rem;
    font-size: 1.5rem;
  }
`;
const OtherOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1rem;
  gap: 0.8rem;
`;
const OtherOption = styled.div`
  span {
    margin-right: 0.5rem;
  }
  span:first-child {
    margin-right: 0;
  }
`;

interface IProps {
  index: number;
}
function EndVotingCard({ index }: IProps) {
  const desktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const endVotingList = useRecoilValue(endVotingsState).slice(0, 3);
  const endVoting = endVotingList[index];
  const sortedEndVoting = [...endVotingList[index].options].sort((a, b) => b.count - a.count);

  return (
    <CardContainer>
      <Header>
        <Title style={{ fontSize: "1rem" }}>{endVoting.subject}</Title>
        {mobile ? null : <Total>총 투표수: {endVoting.total}표</Total>}
      </Header>
      {mobile ? (
        <Contents style={{ marginBottom: "16px", flexDirection: "column", alignItems: "flex-start" }}>
          <FirstOption></FirstOption>
          <OtherOptions>
            <OtherOption>
              <span>🥇</span>
              <span>{sortedEndVoting[0].name}</span>
              <span>
                {sortedEndVoting[0].count}표 ( {Math.floor((sortedEndVoting[0].count / endVoting.total) * 1000) / 10}% )
              </span>
            </OtherOption>
            <OtherOption>
              <span>🥈</span>
              <span>{sortedEndVoting[1].name}</span>
              <span>
                {sortedEndVoting[1].count}표 ( {Math.floor((sortedEndVoting[1].count / endVoting.total) * 1000) / 10}% )
              </span>
            </OtherOption>
            <OtherOption>
              <span>🥉</span>
              <span>{sortedEndVoting[2].name}</span>
              <span>
                {sortedEndVoting[2].count}표 ( {Math.floor((sortedEndVoting[2].count / endVoting.total) * 1000) / 10}% )
              </span>
            </OtherOption>
          </OtherOptions>
        </Contents>
      ) : (
        <Contents>
          <FirstOption style={{ width: mobile ? "100%" : "50%" }}>
            <span>🥇</span>
            <span>{sortedEndVoting[0].name}</span>
            <div style={{ fontSize: desktop ? "1.2rem" : "1rem" }}>
              <span>득표수: {sortedEndVoting[0].count}표</span>
              <span>득표율: {Math.floor((sortedEndVoting[0].count / endVoting.total) * 1000) / 10}%</span>
            </div>
          </FirstOption>
          <OtherOptions>
            <OtherOption>
              <span>🥈</span>
              <span>{sortedEndVoting[1].name}</span>
              <span>득표수: {sortedEndVoting[1].count}표</span>
              <span>득표율: {Math.floor((sortedEndVoting[1].count / endVoting.total) * 1000) / 10}%</span>
            </OtherOption>
            <OtherOption>
              <span>🥉</span>
              <span>{sortedEndVoting[2].name}</span>
              <span>득표수: {sortedEndVoting[2].count}표</span>
              <span>득표율: {Math.floor((sortedEndVoting[2].count / endVoting.total) * 1000) / 10}%</span>
            </OtherOption>
          </OtherOptions>
        </Contents>
      )}
      {mobile ? (
        <Total style={{ position: "absolute", bottom: "8px", right: "16px" }}>총 투표수: {endVoting.total}표</Total>
      ) : null}
    </CardContainer>
  );
}

export default EndVotingCard;
