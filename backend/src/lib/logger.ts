import * as colors from "colors";

const red = (...str: string[]) => {
  str.forEach((e: string) => {
    console.log(colors.red(e));
  });
};

const green = (...str: string[]) => {
  str.forEach((e: string) => {
    console.log(colors.green(e));
  });
};

const yellow = (...str: string[]) => {
  str.forEach((e: string) => {
    console.log(colors.yellow(e));
  });
};

const gray = (...str: string[]) => {
  str.forEach((e: string) => {
    console.log(colors.gray(e));
  });
};

const grey = (...str: string[]) => {
  str.forEach((e: string) => {
    console.log(colors.grey(e));
  });
};

export default {
  red,
  green,
  yellow,
  grey,
  gray
};
