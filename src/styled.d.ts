import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boxColor: string;
    textColor: {
      text: string;
      placeholder: string;
    };
    pointColor: {
      main: string;
      sub: string;
    };
  }
}
