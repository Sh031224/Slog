import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgWhite: string;
      bgFb: string;
      bgLightGray: string;
      bgUnderLineWhite: string;
      bgSoLightGray: string;
      bgPopUp: string;
      bgBlue: string;
      bgGray: string;
      bgCode: string;
      bgTableWhite: string;

      ftGreen: string;
      ftMarkdownBlack: string;
      ftGray: string;
      ftLightGray: string;
      ftDarkGray: string;
      ftLittleGray: string;
      ftWhite: string;
      ftSkyBlue: string;
      ftBlue: string;
      ftBlack: string;
      ftLightBlack: string;

      bdLightGray: string;
      bdSoLightGray: string;
      bdDarkWhite: string;
      bdLightLightGray: string;
      bdTrWhite: string;
      bdTdWhite: string;

      sdBlack: string;
      sdLightBlack: string;
    };
    device: {
      mobile: string;
      tablet: string;
      smallDesktop: string;
      desktop: string;
    };
  }
}
