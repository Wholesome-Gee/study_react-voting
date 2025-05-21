import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  font-family: "Nanum Gothic", sans-serif;
  font-size: 1rem;
  line-height: 1;
  width: 100%;
  color: ${(props) => props.theme.textColor.text};
  background-color: ${(props) => props.theme.bgColor};
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
ul {
  list-style-type: none;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
