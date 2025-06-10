import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sortedByTotalVotings } from "../atoms";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  padding: 1rem 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.textColor.text};
  border-radius: 1rem;
`;
const TopBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 20px;
  margin-bottom: 1rem;
`;
const Index = styled.div``;
const Title = styled.div``;
const Row = styled.div`
  &:first-child {
    display: flex;
  }
`;
const Badges = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
`;
const Badge = styled.span<{ $isSecret: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${(props) => (props.$isSecret ? props.theme.pointColor.sub : props.theme.pointColor.main)};
`;
const Period = styled.div`
  margin-bottom: 0.4rem;
  color: ${(props) => props.theme.textColor.placeholder};
  font-size: 14px;
`; // period = 기간
const Total = styled.div`
  color: ${(props) => props.theme.textColor.placeholder};
  font-size: 14px;
`;

// Interface
interface IProps {
  index: number;
}

// Component
function VotingCardMobile({ index }: IProps) {
  const hotVotingList = useRecoilValue(sortedByTotalVotings); // 투표수 높은순으로 정렬된 list
  const HotVotingListReverse = [...hotVotingList].reverse().slice(0, 3); // 투표수 낮은 voting 3개
  const navigate = useNavigate();
  return (
    <CardContainer
      onClick={() => {
        const login = localStorage.getItem("id");
        if (!login) {
          navigate("/login");
          return;
        }
        navigate(`/votings`);
        navigate(`/votings/${hotVotingList[index].id}`);
      }}
    >
      <Badges>
        {hotVotingList[index]?.isSecret ? (
          <Badge $isSecret={hotVotingList[index]?.isSecret}>비밀투표</Badge>
        ) : (
          <Badge $isSecret={hotVotingList[index]?.isSecret}>공개투표</Badge>
        )}
      </Badges>
      <TopBox>
        <Index>{index + 1}.</Index>
        <Title>{hotVotingList[index]?.subject}</Title>
      </TopBox>
      <Row>
        <Period>
          투표일: {hotVotingList[index]?.start} ~ {hotVotingList[index]?.end}
        </Period>
      </Row>
      <Row>
        <Total>투표수: {hotVotingList[index]?.total}</Total>
      </Row>
    </CardContainer>
  );
}

export default VotingCardMobile;
