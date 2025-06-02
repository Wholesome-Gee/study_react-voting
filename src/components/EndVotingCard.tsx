import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { endVotingsState } from "../atoms";

const CardContainer = styled.div`
  padding: 1rem 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.textColor.text};
  border-radius: 1rem;
`;
const Row = styled.div`
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
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  justify-content: space-between;
  & > div {
    width: 55%;
    /* background-color: tomato; */
    &:last-child {
      width: 45%;
      /* background-color: teal; */
    }
  }
`;
const FirstOption = styled.div`
  display: flex;
  align-items: center;
  & > span {
    margin-right: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
  }
  & > span:first-child {
    // 메달
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0.5rem;
    font-size: 1.2rem;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.2rem;
  gap: 0.8rem;
  div {
    span {
      margin-right: 1.2rem;
    }
    span:first-child {
      margin-right: 0;
    }
  }
`;
const SecondOption = styled.div``;

interface IProps {
  index: number;
}
function EndVotingCard({ index }: IProps) {
  const endVotingList = useRecoilValue(endVotingsState).slice(0, 3);
  const endVoting = endVotingList[index];
  const sortedEndVoting = [...endVotingList[index].options].sort((a, b) => b.count - a.count);

  return (
    <CardContainer>
      <Row>
        <Title>{endVoting.subject}</Title>
        <Total>총 투표수: {endVoting.total}표</Total>
      </Row>
      <Contents>
        <FirstOption>
          <span>🥇</span>
          <span>{sortedEndVoting[0].name}</span>
          <div>
            <span>득표수: {sortedEndVoting[0].count}표</span>
            <span>득표율: {Math.floor((sortedEndVoting[0].count / endVoting.total) * 1000) / 10}%</span>
          </div>
        </FirstOption>
        <Right>
          <SecondOption>
            <span>🥈</span>
            <span>{sortedEndVoting[1].name}</span>
            <span>득표수: {sortedEndVoting[1].count}표</span>
            <span>득표율: {Math.floor((sortedEndVoting[1].count / endVoting.total) * 1000) / 10}%</span>
          </SecondOption>
          <div>
            <span>🥉</span>
            <span>{sortedEndVoting[2].name}</span>
            <span>득표수: {sortedEndVoting[2].count}표</span>
            <span>득표율: {Math.floor((sortedEndVoting[2].count / endVoting.total) * 1000) / 10}%</span>
          </div>
        </Right>
      </Contents>
    </CardContainer>
  );
}

export default EndVotingCard;
