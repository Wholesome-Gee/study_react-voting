import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sortedByTotalVotings, votingsState } from "../atoms";

const CardContainer = styled.div`
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
const ContentBox = styled.div`
  width: 70%;
`;
const Row = styled.div``;
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
function VotingCard({ isHot, index }: IProps) {
  const hotVotingList = useRecoilValue(sortedByTotalVotings); // 투표수 높은순으로 정렬된 list
  const HotVotingListReverse = [...hotVotingList].reverse().slice(0, 3); // 투표수 낮은 voting 3개
  return (
    <>
      {isHot ? (
        <CardContainer>
          <Index>{index + 1}</Index>
          <ContentBox>
            <Row>
              <Title>{hotVotingList[index]?.subject}</Title>
              <Badges>
                {hotVotingList[index]?.isSecret ? (
                  <Badge $isSecret={hotVotingList[index]?.isSecret}>비밀투표</Badge>
                ) : (
                  <Badge $isSecret={hotVotingList[index]?.isSecret}>공개투표</Badge>
                )}
              </Badges>
            </Row>
            <Row>
              <Period>
                투표일: {hotVotingList[index]?.start} ~ {hotVotingList[index]?.end}
              </Period>
            </Row>
            <Row>
              <Total>투표수: {hotVotingList[index]?.total}</Total>
            </Row>
          </ContentBox>
          <Arrow> → </Arrow>
        </CardContainer>
      ) : (
        <CardContainer>
          <Index>{index + 1}</Index>
          <ContentBox>
            <Row>
              <Title>{HotVotingListReverse[index]?.subject}</Title>
              <Badges>
                {HotVotingListReverse[index]?.isSecret ? (
                  <Badge $isSecret={HotVotingListReverse[index]?.isSecret}>비밀투표</Badge>
                ) : (
                  <Badge $isSecret={HotVotingListReverse[index]?.isSecret}>공개투표</Badge>
                )}
              </Badges>
            </Row>
            <Row>
              <Period>
                투표일: {HotVotingListReverse[index]?.start} ~ {HotVotingListReverse[index]?.end}
              </Period>
            </Row>
            <Row>
              <Total>투표수: {HotVotingListReverse[index]?.total}</Total>
            </Row>
          </ContentBox>
          <Arrow>→</Arrow>
        </CardContainer>
      )}
    </>
  );
}

export default VotingCard;
