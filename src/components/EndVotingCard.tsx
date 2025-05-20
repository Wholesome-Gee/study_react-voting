import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { endVotingsState } from "../atoms";

const VotingCard = styled.div`
  padding: 1rem 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.textColor.text};
  border-radius: 1rem;
`;
const Title = styled.div`
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  span:last-child {
    font-size: 1rem;
    color: ${(props) => props.theme.textColor.placeholder};
  }
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
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Medal = styled.div`
  margin-right: 0.5rem;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`;
const OptionName = styled.div`
  margin-right: 1rem;
  font-size: 2.5rem;
  font-weight: 600;
`;
const Results = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.5rem;
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

interface IProps {
  index: number;
}
function EndVotingCard({ index }: IProps) {
  const endVotingList = useRecoilValue(endVotingsState).slice(0, 3);
  const endVoting = endVotingList[index];
  console.log(endVotingList); // 여기서 득표수 젤 높은 option이 맨처음오도록 설정해야함
  return (
    <VotingCard>
      <Title>
        <span>{endVoting.subject}</span>
        <span>총 투표수: {endVoting.total}표</span>
      </Title>
      <Contents>
        <Left>
          <Medal>🥇</Medal>
          <OptionName>가나다라마바사아자</OptionName>
          <Results>
            <p>득표수: 500표</p>
            <p>득표율: 50%</p>
          </Results>
        </Left>
        <Right>
          <div>
            <span>🥈</span>
            <span>가나다라마바사아자</span>
            <span>득표수: 300표</span>
            <span>득표율: 30%</span>
          </div>
          <div>
            <span>🥉</span>
            <span>가나다라마바사아자</span>
            <span>득표수: 200표</span>
            <span>득표율: 20%</span>
          </div>
        </Right>
      </Contents>
    </VotingCard>
  );
}

export default EndVotingCard;
