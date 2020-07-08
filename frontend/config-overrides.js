import { addDecoratorsLegacy, disableEsLint, override } from "customize-cra";

module.exports = {
  webpack: override(disableEsLint(), addDecoratorsLegacy())
};
