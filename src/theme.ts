import { DefaultTheme } from "styled-components/dist/types";

const lightTheme: DefaultTheme = {
  bgColor: "#E3E3E3",
  boxColor: "#6D6D6D",
  textColor: {
    text: "#1F2020",
    placeholder: "#3C3C3C",
  },
  pointColor: {
    main: "#FFC83E",
    sub: "#144DEB",
  },
};
const darkTheme: DefaultTheme = {
  bgColor: "#1F2020",
  boxColor: "#3C3C3C",
  textColor: {
    text: "#E3E3E3",
    placeholder: "#6D6D6D",
  },
  pointColor: {
    main: "#0076FF",
    sub: "#03C75A",
  },
};

export { lightTheme, darkTheme };
