import { DefaultTheme } from "styled-components";

const colors = {
  bgWhite: "#ffff",
  bgFb: "#3578e5",
  bgLightGray: "rgb(241, 243, 245)",
  bgUnderLineWhite: "#dedede",
  bgSoLightGray: "#fafbfc",
  bgPopUp: "rgba(0, 0, 0, 0.329)",
  bgBlue: "#5373f8",
  bgGray: "#ededed",
  bgTableWhite: "#f6f8fa",
  bgCode: "#1b1f231f",

  ftGreen: "green",
  ftMarkdownBlack: "#222426",
  ftGray: "#777",
  ftLightGray: "#bdbdbd",
  ftDarkGray: "#464646",
  ftLittleGray: "#a0a0a0",
  ftWhite: "#fff",
  ftSkyBlue: "rgb(100, 197, 219)",
  ftBlue: "#5373f8",
  ftBlack: "black",
  ftLightBlack: "rgb(33, 37, 41)",

  bdLightGray: "#c0c0c0",
  bdSoLightGray: "#e0e0e0",
  bdDarkWhite: "#dfdfdf85",
  bdLightLightGray: "#e1e4e8",
  bdTrWhite: "#c6cbd1",
  bdTdWhite: "#dfe2e5",
  bdBlue: "#5373f8",

  sdBlack: "rgba(0, 0, 0, 0.096)",
  sdLightBlack: "rgba(0, 0, 0, 0.055)"
};

const size = {
  mobile: "500px",
  tablet: "767px",
  smallDesktop: "900px",
  desktop: "1250px"
};

const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  smallDesktop: `@media only screen and (max-width: ${size.smallDesktop})`,
  desktop: `@media only screen and (max-width: ${size.desktop})`
};

const lightThemeColors = {
  ...colors
};

const darkThemeColors = {
  ...colors
};

const defalutTheme = {
  device
};

export const darkTheme: DefaultTheme = {
  ...defalutTheme,
  colors: darkThemeColors
};

export const lightTheme: DefaultTheme = {
  ...defalutTheme,
  colors: lightThemeColors
};
