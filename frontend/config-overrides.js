const {
  addDecoratorsLegacy, // decorator를 사용할 수 있도록 해주는 config
  disableEsLint,
  override
} = require("customize-cra");

// 사용자 정의 웹팩 설정
module.exports = {
  webpack: override(disableEsLint(), addDecoratorsLegacy())
};
