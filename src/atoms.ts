import { atom, selector } from "recoil";

interface Options {
  id: number;
  index: number;
  name: string;
  count: number;
  image: string;
}

interface Votings {
  id: number;
  subject: string;
  start: string;
  end: string;
  total: number;
  owner: string;
  isSecret: boolean;
  isEnd: boolean;
  options: Options[];
}

export const votingsState = atom<Votings[]>({
  key: "votings",
  default: [
    {
      id: 1001,
      subject: "우리반 반장선거",
      start: "2025-05-01",
      end: "2025-05-05",
      total: 10,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      options: [
        { id: 1001, index: 1, name: "철수", count: 2, image: "" },
        { id: 1002, index: 2, name: "짱구", count: 3, image: "" },
        { id: 1003, index: 3, name: "훈이", count: 2, image: "" },
        { id: 1004, index: 4, name: "맹구", count: 1, image: "" },
        { id: 1005, index: 5, name: "유리", count: 2, image: "" },
      ],
    },
    {
      id: 1002,
      subject: "우리반 오락부장선거",
      start: "2025-04-30",
      end: "2025-06-10",
      total: 20,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: false,
      options: [
        { id: 1001, index: 1, name: "철수", count: 4, image: "" },
        { id: 1002, index: 2, name: "짱구", count: 6, image: "" },
        { id: 1003, index: 3, name: "훈이", count: 4, image: "" },
        { id: 1004, index: 4, name: "맹구", count: 2, image: "" },
        { id: 1005, index: 5, name: "유리", count: 4, image: "" },
      ],
    },
    {
      id: 1003,
      subject: "우리반 청소반장 선거",
      start: "2025-05-03",
      end: "2025-05-31",
      total: 15,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      options: [
        { id: 1001, index: 1, name: "철수", count: 3, image: "" },
        { id: 1002, index: 2, name: "짱구", count: 2, image: "" },
        { id: 1003, index: 3, name: "훈이", count: 5, image: "" },
        { id: 1004, index: 4, name: "맹구", count: 1, image: "" },
        { id: 1005, index: 5, name: "유리", count: 4, image: "" },
      ],
    },
  ],
});

export const sortedByTotalVotings = selector<Votings[]>({
  key: "votingsSelector",
  get: ({ get }) => {
    const votings = get(votingsState);
    return [...votings].sort((a, b) => b.total - a.total);
  },
  //외부 set은 parameter로 value를 받고 내부 set은 atom을 value로 바꾼다.
});

export const endVotingsState = atom<Votings[]>({
  key: "endVotings",
  default: [
    {
      id: 2003,
      subject: "올 시즌 EPL 우승팀 예측",
      start: "2025-04-03",
      end: "2025-04-31",
      total: 200,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: true,
      options: [
        { id: 1001, index: 1, name: "첼시", count: 70, image: "" },
        { id: 1002, index: 2, name: "맨유", count: 10, image: "" },
        { id: 1003, index: 3, name: "맨시티", count: 30, image: "" },
        { id: 1004, index: 4, name: "아스날", count: 40, image: "" },
        { id: 1005, index: 5, name: "리버풀", count: 50, image: "" },
      ],
    },
    {
      id: 2001,
      subject: "워크샵 장소 투표",
      start: "2025-04-01",
      end: "2025-04-05",
      total: 150,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: true,
      options: [
        { id: 1001, index: 1, name: "서울", count: 10, image: "" },
        { id: 1002, index: 2, name: "구미", count: 20, image: "" },
        { id: 1003, index: 3, name: "부산", count: 30, image: "" },
        { id: 1004, index: 4, name: "제주", count: 40, image: "" },
        { id: 1005, index: 5, name: "대전", count: 50, image: "" },
      ],
    },
    {
      id: 2002,
      subject: "우리집 강아지 이름좀 골라주세요ㅠㅠ",
      start: "2025-03-30",
      end: "2025-03-10",
      total: 120,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: true,
      options: [
        { id: 1001, index: 1, name: "바둑", count: 25, image: "" },
        { id: 1002, index: 2, name: "콩이", count: 15, image: "" },
        { id: 1003, index: 3, name: "보리", count: 45, image: "" },
        { id: 1004, index: 4, name: "뽀삐", count: 5, image: "" },
        { id: 1005, index: 5, name: "해리", count: 30, image: "" },
      ],
    },
  ],
});
