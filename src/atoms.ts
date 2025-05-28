import { atom, selector } from "recoil";

export interface IOption {
  id: string;
  index: number;
  name: string;
  count: number;
  image: string;
}

export interface IVoting {
  id: string;
  subject: string;
  start: string;
  end: string;
  total: number;
  owner: string;
  isSecret: boolean;
  isEnd: boolean;
  options: IOption[];
}

interface IUsers {
  id: string;
  pw: string;
}

export const newVoting = atom<IVoting>({
  key: "newVoting",
});

export const votingsState = atom<IVoting[]>({
  key: "votings",
  default: [
    {
      id: "1001",
      subject: "한국인이 가장 좋아하는 음식",
      start: "2025-05-01",
      end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(
        new Date().getDate()
      ).padStart(2, "0")}`,
      total: 19036,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      options: [
        { id: "1001", index: 1, name: "떡볶이", count: 7650, image: "" },
        { id: "1002", index: 2, name: "김치찌개", count: 4390, image: "" },
        { id: "1003", index: 3, name: "삼겹살", count: 3153, image: "" },
        { id: "1004", index: 4, name: "마라탕", count: 2677, image: "" },
        { id: "1005", index: 5, name: "패스트푸드", count: 1166, image: "" },
      ],
    },
    {
      id: "1002",
      subject: "가장 선호하는 스포츠브랜드",
      start: "2025-04-30",
      end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 2).padStart(2, "0")}-${String(
        new Date().getDate()
      ).padStart(2, "0")}`,
      total: 2841,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: false,
      options: [
        { id: "1001", index: 1, name: "아디다스", count: 1465, image: "" },
        { id: "1002", index: 2, name: "나이키", count: 688, image: "" },
        { id: "1003", index: 3, name: "언더아머", count: 432, image: "" },
        { id: "1004", index: 4, name: "프로스펙스", count: 215, image: "" },
        { id: "1005", index: 5, name: "아식스", count: 41, image: "" },
      ],
    },
    {
      id: "1003",
      subject: "짱구 캐릭터 인기투표",
      start: "2025-05-03",
      end: "2025-07-03",
      total: 59938,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      options: [
        { id: "1001", index: 1, name: "철수", count: 31561, image: "" },
        { id: "1002", index: 2, name: "짱구", count: 21567, image: "" },
        { id: "1003", index: 3, name: "훈이", count: 5156, image: "" },
        { id: "1004", index: 4, name: "맹구", count: 1155, image: "" },
        { id: "1005", index: 5, name: "유리", count: 499, image: "" },
      ],
    },
    // {
    //   id: "1004",
    //   subject: "최애 커피 브랜드는?",
    //   start: "2025-05-01",
    //   end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 3).padStart(2, "0")}-${String(
    //     new Date().getDate()
    //   ).padStart(2, "0")}`,
    //   total: 12807,
    //   owner: "jiyong0419@naver.com",
    //   isSecret: true,
    //   isEnd: false,
    //   options: [
    //     { id: "1001", index: 1, name: "컴포즈", count: 159, image: "" },
    //     { id: "1002", index: 2, name: "투썸플레이스", count: 1564, image: "" },
    //     { id: "1003", index: 3, name: "이디야", count: 898, image: "" },
    //     { id: "1004", index: 4, name: "스타벅스", count: 9822, image: "" },
    //     { id: "1005", index: 5, name: "메가커피", count: 364, image: "" },
    //   ],
    // },
    // {
    //   id: "1005",
    //   subject: "우리아이 장래희망 선호조사",
    //   start: "2025-05-11",
    //   end: "2025-06-11",
    //   total: 7658,
    //   owner: "jiyong0419@naver.com",
    //   isSecret: true,
    //   isEnd: false,
    //   options: [
    //     { id: "1001", index: 1, name: "축구선수", count: 943, image: "" },
    //     { id: "1002", index: 2, name: "유튜버", count: 1564, image: "" },
    //     { id: "1003", index: 3, name: "교사", count: 332, image: "" },
    //     { id: "1004", index: 4, name: "요리사", count: 765, image: "" },
    //     { id: "1005", index: 5, name: "가수", count: 767, image: "" },
    //     { id: "1006", index: 6, name: "배우", count: 369, image: "" },
    //     { id: "1007", index: 7, name: "프로게이머", count: 576, image: "" },
    //     { id: "1008", index: 8, name: "개발자", count: 2342, image: "" },
    //   ],
    // },
    // {
    //   id: "1006",
    //   subject: "초보운전에게 추천해줄 차 ",
    //   start: "2025-05-13",
    //   end: "2025-06-13",
    //   total: 23172,
    //   owner: "jiyong0419@naver.com",
    //   isSecret: true,
    //   isEnd: false,
    //   options: [
    //     { id: "1001", index: 1, name: "아반떼", count: 3749, image: "" },
    //     { id: "1002", index: 2, name: "더 뉴 모닝", count: 5821, image: "" },
    //     { id: "1003", index: 3, name: "레이", count: 4196, image: "" },
    //     { id: "1004", index: 4, name: "스포티지", count: 6532, image: "" },
    //     { id: "1005", index: 5, name: "캐스퍼", count: 2874, image: "" },
    //   ],
    // },
    // {
    //   id: "1007",
    //   subject: "2026 월드컵 우승국가 에측",
    //   start: "2025-05-23",
    //   end: "2025-06-23",
    //   total: 27353,
    //   owner: "jiyong0419@naver.com",
    //   isSecret: true,
    //   isEnd: false,
    //   options: [
    //     { id: "1001", index: 1, name: "브라질", count: 8352, image: "" },
    //     { id: "1002", index: 2, name: "프랑스", count: 1479, image: "" },
    //     { id: "1003", index: 3, name: "아르헨티나", count: 6024, image: "" },
    //     { id: "1004", index: 4, name: "대한민국", count: 3917, image: "" },
    //     { id: "1005", index: 5, name: "잉글랜드", count: 7581, image: "" },
    //   ],
    // },
    // {
    //   id: "1008",
    //   subject: "MZ세대가 좋아하는 TV프로그램 ",
    //   start: "2025-05-03",
    //   end: "2025-09-03",
    //   total: 20083,
    //   owner: "jiyong0419@naver.com",
    //   isSecret: true,
    //   isEnd: false,
    //   options: [
    //     { id: "1001", index: 1, name: "놀면 뭐하니?", count: 4827, image: "" },
    //     { id: "1002", index: 2, name: "이상한 나라의 수학자", count: 1593, image: "" },
    //     { id: "1003", index: 3, name: "수요미식회", count: 7364, image: "" },
    //     { id: "1004", index: 4, name: "유퀴즈 온 더 블럭", count: 2148, image: "" },
    //     { id: "1005", index: 5, name: "스트릿 우먼 파이터", count: 9051, image: "" },
    //   ],
    // },
  ],
});

export const sortedByTotalVotings = selector<IVoting[]>({
  key: "sortedVotingsSelector",
  get: ({ get }) => {
    const votings = get(votingsState);
    return [...votings].sort((a, b) => b.total - a.total);
  },
  //외부 set은 parameter로 value를 받고 내부 set은 atom을 value로 바꾼다.
});

export const endVotingsState = atom<IVoting[]>({
  key: "endVotings",
  default: [
    {
      id: "2003",
      subject: "올 시즌 EPL 우승팀 예측",
      start: "2025-04-03",
      end: "2025-04-31",
      total: 200,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: true,
      options: [
        { id: "1001", index: 1, name: "첼시", count: 70, image: "" },
        { id: "1002", index: 2, name: "맨유", count: 10, image: "" },
        { id: "1003", index: 3, name: "맨시티", count: 30, image: "" },
        { id: "1004", index: 4, name: "아스날", count: 40, image: "" },
        { id: "1005", index: 5, name: "리버풀", count: 50, image: "" },
      ],
    },
    {
      id: "2001",
      subject: "워크샵 장소 투표",
      start: "2025-04-01",
      end: "2025-04-05",
      total: 150,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: true,
      options: [
        { id: "1001", index: 1, name: "서울", count: 10, image: "" },
        { id: "1002", index: 2, name: "구미", count: 20, image: "" },
        { id: "1003", index: 3, name: "부산", count: 30, image: "" },
        { id: "1004", index: 4, name: "제주", count: 40, image: "" },
        { id: "1005", index: 5, name: "대전", count: 50, image: "" },
      ],
    },
    {
      id: "2002",
      subject: "우리집 강아지 이름좀 골라주세요ㅠㅠ",
      start: "2025-03-30",
      end: "2025-03-10",
      total: 120,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: true,
      options: [
        { id: "1001", index: 1, name: "바둑", count: 25, image: "" },
        { id: "1002", index: 2, name: "콩이", count: 15, image: "" },
        { id: "1003", index: 3, name: "보리", count: 45, image: "" },
        { id: "1004", index: 4, name: "뽀삐", count: 5, image: "" },
        { id: "1005", index: 5, name: "해리", count: 30, image: "" },
      ],
    },
  ],
});

export const usersState = atom<IUsers[]>({
  key: "users",
  default: [{ id: "test1", pw: "1234" }],
});

export const usersSelector = selector<IUsers[]>({
  key: "usersSelector",
  get: ({ get }) => {
    return get(usersState);
  },
  set: ({ set }, newUser) => set(usersState, newUser),
});

export const votingsSelector = selector<IVoting[]>({
  key: "votingsSelector",
  get: ({ get }) => {
    return get(votingsState);
  },
  set: ({ set }, newVoting) => set(votingsState, newVoting),
});
