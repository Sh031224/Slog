module.exports = {
  extends: ["turbo", "plugin:import/recommended", "prettier"],
  rules: {},
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  overrides: [
    {
      files: ["**/*"],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              ["sibling", "parent", "index"],
              "unknown"
            ],
            pathGroups: [
              {
                pattern: "./**/*.module.scss",
                group: "unknown"
              }
            ],
            pathGroupsExcludedImportTypes: ["unknown"],
            "newlines-between": "always",
            alphabetize: {
              order: "asc",
              caseInsensitive: true
            }
          }
        ]
      }
    }
  ]
};
