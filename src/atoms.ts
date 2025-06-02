import { atom, selector } from "recoil";

export interface IOption {
  id: string;
  index: number;
  name: string;
  count: number;
  voter: string[];
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
  voteUser: string[];
  options: IOption[];
}

interface IUsers {
  id: string;
  pw: string;
}

export const votingsState = atom<IVoting[]>({
  key: "nowVotings",
  default: [
    {
      id: "1001",
      subject: "한국인이 가장 좋아하는 음식",
      start: "2025-05-01",
      end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(
        new Date().getDate()
      ).padStart(2, "0")}`,
      total: 20,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: false,
      voteUser: [
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
        "test12",
        "test13",
        "test14",
        "test15",
        "test16",
        "test17",
        "test18",
        "test19",
        "test20",
      ],
      options: [
        { id: "1001", index: 1, name: "떡볶이", count: 2, voter: ["test1", "test3"] },
        { id: "1002", index: 2, name: "김치찌개", count: 3, voter: ["test2", "test5", "test6"] },
        { id: "1003", index: 3, name: "삼겹살", count: 1, voter: ["test4"] },
        { id: "1004", index: 4, name: "마라탕", count: 4, voter: ["test7", "test8", "test9", "test10"] },
        {
          id: "1005",
          index: 5,
          name: "패스트푸드",
          count: 10,
          voter: ["test11", "test12", "test13", "test14", "test15", "test16", "test17", "test18", "test19", "test20"],
        },
      ],
    },
    {
      id: "1002",
      subject: "가장 선호하는 스포츠브랜드",
      start: "2025-04-30",
      end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 2).padStart(2, "0")}-${String(
        new Date().getDate()
      ).padStart(2, "0")}`,
      total: 14,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: false,
      voteUser: [
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test12",
        "test13",
        "test15",
        "test17",
      ],
      options: [
        { id: "1001", index: 1, name: "아디다스", count: 3, voter: ["test1", "test2", "test3"] },
        { id: "1002", index: 2, name: "나이키", count: 1, voter: ["test4"] },
        { id: "1003", index: 3, name: "언더아머", count: 5, voter: ["test5", "test6", "test7", "test8", "test9"] },
        { id: "1004", index: 4, name: "프로스펙스", count: 2, voter: ["test15','test17"] },
        { id: "1005", index: 5, name: "아식스", count: 3, voter: ["test10", "test12", "test13"] },
      ],
    },
    {
      id: "1003",
      subject: "짱구 캐릭터 인기투표",
      start: "2025-05-03",
      end: "2025-07-03",
      total: 10,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      voteUser: ["test6", "test7", "test8", "test9", "test10", "test11", "test12", "test13", "test14", "test15"],
      options: [
        { id: "1001", index: 1, name: "철수", count: 1, voter: ["test6"] },
        { id: "1002", index: 2, name: "짱구", count: 2, voter: ["test7", "test11"] },
        { id: "1003", index: 3, name: "훈이", count: 3, voter: ["test8", "test12", "test15"] },
        { id: "1004", index: 4, name: "맹구", count: 2, voter: ["test9", "test13"] },
        { id: "1005", index: 5, name: "유리", count: 2, voter: ["test10", "test14"] },
      ],
    },
    {
      id: "1004",
      subject: "최애 커피 브랜드는?",
      start: "2025-05-01",
      end: `${new Date().getFullYear()}-${String(new Date().getMonth() + 3).padStart(2, "0")}-${String(
        new Date().getDate()
      ).padStart(2, "0")}`,
      total: 18,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      voteUser: [
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
        "test12",
        "test13",
        "test14",
        "test15",
        "test16",
        "test17",
        "test18",
        "test19",
      ],
      options: [
        {
          id: "1001",
          index: 1,
          name: "컴포즈",
          count: 6,
          voter: ["test2", "test7", "test11", "test15", "test18", "test19"],
        },
        { id: "1002", index: 2, name: "투썸플레이스", count: 4, voter: ["test3", "test8", "test12", "test16"] },
        { id: "1003", index: 3, name: "이디야", count: 4, voter: ["test4", "test9", "test13", "test17"] },
        { id: "1004", index: 4, name: "스타벅스", count: 3, voter: ["test5", "test10", "test14"] },
        { id: "1005", index: 5, name: "메가커피", count: 1, voter: ["test6"] },
      ],
    },
    {
      id: "1005",
      subject: "우리아이 장래희망 선호조사",
      start: "2025-05-11",
      end: "2025-06-11",
      total: 17,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      voteUser: [
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
        "test13",
        "test14",
        "test15",
        "test16",
        "test17",
        "test18",
        "test19",
      ],
      options: [
        { id: "1001", index: 1, name: "축구선수", count: 1, voter: ["test9"] },
        { id: "1002", index: 2, name: "유튜버", count: 1, voter: ["test8"] },
        { id: "1003", index: 3, name: "교사", count: 4, voter: ["test7", "test16", "test17", "test18"] },
        { id: "1004", index: 4, name: "요리사", count: 2, voter: ["test6", "test15"] },
        { id: "1005", index: 5, name: "가수", count: 2, voter: ["test5", "test14"] },
        { id: "1006", index: 6, name: "배우", count: 1, voter: ["test4"] },
        { id: "1007", index: 7, name: "프로게이머", count: 3, voter: ["test3", "test11", "test13"] },
        { id: "1008", index: 8, name: "개발자", count: 3, voter: ["test2", "test10", "test19"] },
      ],
    },
    {
      id: "1006",
      subject: "초보운전에게 추천해줄 차 ",
      start: "2025-05-13",
      end: "2025-06-13",
      total: 20,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: false,
      voteUser: [
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
        "test12",
        "test13",
        "test14",
        "test15",
        "test16",
        "test17",
        "test18",
        "test19",
        "test20",
      ],
      options: [
        {
          id: "1001",
          index: 1,
          name: "아반떼",
          count: 6,
          voter: ["test5", "test6", "test11", "test13", "test19", "test20"],
        },
        {
          id: "1002",
          index: 2,
          name: "더 뉴 모닝",
          count: 5,
          voter: ["test3", "test7", "test8", "test14", "test18"],
        },
        { id: "1003", index: 3, name: "레이", count: 3, voter: ["test1", "test4", "test9"] },
        { id: "1004", index: 4, name: "스포티지", count: 2, voter: ["test10", "test15"] },
        { id: "1005", index: 5, name: "캐스퍼", count: 4, voter: ["test1", "test2", "test16", "test17"] },
      ],
    },
    {
      id: "1007",
      subject: "2026 월드컵 우승국가 에측",
      start: "2025-05-23",
      end: "2025-06-23",
      total: 11,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: false,
      voteUser: [
        "test2",
        "test3",
        "test4",
        "test7",
        "test8",
        "test9",
        "test13",
        "test14",
        "test15",
        "test19",
        "test20",
      ],
      options: [
        { id: "1001", index: 1, name: "브라질", count: 2, voter: ["test2", "test4"] },
        { id: "1002", index: 2, name: "프랑스", count: 4, voter: ["test3", "test7", "test8", "test9"] },
        { id: "1003", index: 3, name: "아르헨티나", count: 0, voter: [] },
        { id: "1004", index: 4, name: "대한민국", count: 1, voter: ["test13"] },
        { id: "1005", index: 5, name: "잉글랜드", count: 3, voter: ["test14", "test15", "test19"] },
      ],
    },
    {
      id: "1008",
      subject: "MZ세대가 좋아하는 TV프로그램 ",
      start: "2025-05-03",
      end: "2025-09-03",
      total: 3,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: false,
      voteUser: ["test14", "test15", "test19"],
      options: [
        { id: "1001", index: 1, name: "놀면 뭐하니?", count: 0, voter: [] },
        { id: "1002", index: 2, name: "이상한 나라의 수학자", count: 0, voter: [] },
        { id: "1003", index: 3, name: "수요미식회", count: 3, voter: ["test14", "test15", "test19"] },
        { id: "1004", index: 4, name: "유퀴즈 온 더 블럭", count: 0, voter: [] },
        { id: "1005", index: 5, name: "스트릿 우먼 파이터", count: 0, voter: [] },
      ],
    },
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
      id: "2001",
      subject: "올 시즌 EPL 우승팀 예측",
      start: "2025-04-03",
      end: "2025-04-31",
      total: 11,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: true,
      voteUser: [
        "test2",
        "test3",
        "test4",
        "test7",
        "test8",
        "test9",
        "test13",
        "test14",
        "test15",
        "test19",
        "test20",
      ],
      options: [
        { id: "1001", index: 1, name: "첼시", count: 1, voter: ["test2"] },
        { id: "1002", index: 2, name: "맨유", count: 4, voter: ["test7", "test8", "test9", "test13"] },
        { id: "1003", index: 3, name: "맨시티", count: 3, voter: ["test3", "test4", "test14"] },
        { id: "1004", index: 4, name: "아스날", count: 1, voter: ["test15"] },
        { id: "1005", index: 5, name: "리버풀", count: 2, voter: ["test19", "test20"] },
      ],
    },
    {
      id: "2002",
      subject: "워크샵 장소 투표",
      start: "2025-04-01",
      end: "2025-04-05",
      total: 18,
      owner: "jiyong0419@naver.com",
      isSecret: false,
      isEnd: true,
      voteUser: [
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test10",
        "test11",
        "test12",
        "test13",
        "test14",
        "test15",
        "test16",
        "test17",
        "test18",
        "test19",
      ],
      options: [
        { id: "1001", index: 1, name: "서울", count: 1, voter: ["test2"] },
        { id: "1002", index: 2, name: "구미", count: 3, voter: ["test3", "test12", "test13"] },
        {
          id: "1003",
          index: 3,
          name: "부산",
          count: 7,
          voter: ["test6", "test7", "test8", "test9", "test10", "test11", "test19"],
        },
        { id: "1004", index: 4, name: "제주", count: 4, voter: ["test4", "test5", "test16", "test17"] },
        { id: "1005", index: 5, name: "대전", count: 2, voter: ["test14", "test15"] },
      ],
    },
    {
      id: "2003",
      subject: "우리집 강아지 이름좀 골라주세요ㅠㅠ",
      start: "2025-03-30",
      end: "2025-03-10",
      total: 7,
      owner: "jiyong0419@naver.com",
      isSecret: true,
      isEnd: true,
      voteUser: ["test1", "test2", "test3", "test4", "test5", "test6", "test7"],
      options: [
        { id: "1001", index: 1, name: "바둑", count: 0, voter: [] },
        { id: "1002", index: 2, name: "콩이", count: 1, voter: ["test1"] },
        { id: "1003", index: 3, name: "보리", count: 2, voter: ["test2", "test3"] },
        { id: "1004", index: 4, name: "뽀삐", count: 4, voter: ["test4", "test5", "test6", "test7"] },
        { id: "1005", index: 5, name: "해리", count: 0, voter: [] },
      ],
    },
  ],
});

export const usersState = atom<IUsers[]>({
  key: "users",
  default: [
    { id: "test1", pw: "1234" },
    { id: "test2", pw: "12345" },
    { id: "test3", pw: "12345" },
    { id: "test4", pw: "12345" },
    { id: "test5", pw: "12345" },
    { id: "test6", pw: "12345" },
    { id: "test7", pw: "12345" },
    { id: "test8", pw: "12345" },
    { id: "test9", pw: "12345" },
    { id: "test10", pw: "12345" },
    { id: "test11", pw: "12345" },
    { id: "test12", pw: "12345" },
    { id: "test13", pw: "12345" },
    { id: "test14", pw: "12345" },
    { id: "test15", pw: "12345" },
    { id: "test16", pw: "12345" },
    { id: "test17", pw: "12345" },
    { id: "test18", pw: "12345" },
    { id: "test19", pw: "12345" },
    { id: "test20", pw: "12345" },
  ],
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

export const sortedEndVoting = selector<IVoting[]>({
  key: "sortedOptionEndVoting",
  get: ({ get }) => {
    const endVotings = get(endVotingsState);
    const newEndVotings = endVotings.map((voting) => {
      const newOptions = [...voting.options];
      newOptions.sort((a, b) => b.count - a.count);
      const newVoting = { ...voting, options: newOptions };
      return newVoting;
    });
    return newEndVotings;
  },
});
