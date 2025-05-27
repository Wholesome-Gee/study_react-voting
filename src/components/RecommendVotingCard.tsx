import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sortedByTotalVotings, votingsState } from "../atoms";

const VotingCard = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.textColor.text};
  border-radius: 1rem;
`;
const Index = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`;
const Contents = styled.div`
  width: 70%;
`;
const ContentsRow = styled.div``;
const Title = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
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
const Arrow = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pointColor.sub};
  }
`;

interface IProps {
  isHot: boolean;
  index: number;
}
function Card({ isHot, index }: IProps) {
  const votingList = useRecoilValue(sortedByTotalVotings); // 투표수 높은순으로 정렬된 list
  const hotVoting = [...votingList].slice(0, 3); // 투표수 높은 voting 3개
  const otherVoting = [...votingList].reverse().slice(0, 3); // 투표수 낮은 voting 3개
  return (
    <>
      {isHot ? (
        <VotingCard>
          <Index>{index + 1}</Index>
          <Contents>
            <ContentsRow>
              <Title>{votingList[index]?.subject}</Title>
              <Badges>
                {votingList[index]?.isSecret ? (
                  <Badge $isSecret={votingList[index]?.isSecret}>비밀투표</Badge>
                ) : (
                  <Badge $isSecret={votingList[index]?.isSecret}>공개투표</Badge>
                )}
              </Badges>
            </ContentsRow>
            <ContentsRow>
              <Period>
                투표일: {votingList[index]?.start} ~ {votingList[index]?.end}
              </Period>
            </ContentsRow>
            <ContentsRow>
              <Total>투표수: {votingList[index]?.total}</Total>
            </ContentsRow>
          </Contents>
          <Arrow>→</Arrow>
        </VotingCard>
      ) : (
        <VotingCard>
          <Index>{index + 1}</Index>
          <Contents>
            <ContentsRow>
              <Title>{otherVoting[index]?.subject}</Title>
              <Badges>
                {otherVoting[index]?.isSecret ? (
                  <Badge $isSecret={otherVoting[index]?.isSecret}>비밀투표</Badge>
                ) : (
                  <Badge $isSecret={otherVoting[index]?.isSecret}>공개투표</Badge>
                )}
              </Badges>
            </ContentsRow>
            <ContentsRow>
              <Period>
                투표일: {otherVoting[index]?.start} ~ {otherVoting[index]?.end}
              </Period>
            </ContentsRow>
            <ContentsRow>
              <Total>투표수: {otherVoting[index]?.total}</Total>
            </ContentsRow>
          </Contents>
          <Arrow>→</Arrow>
        </VotingCard>
      )}
    </>
  );
}

export default Card;
