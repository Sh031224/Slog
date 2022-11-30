module.exports = {
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error"
  },
  overrides: [
    {
      files: ["**/**.test.ts", "**/**.test.tsx"],
      rules: {
        "@typescript-eslint/no-explicit-any": 0
      }
    }
  ]
};
