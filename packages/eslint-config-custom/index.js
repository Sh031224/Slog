module.exports = {
  extends: ["next/babel", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off"
  }
};
