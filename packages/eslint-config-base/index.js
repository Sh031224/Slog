module.exports = {
  extends: ["turbo", "prettier", "plugin:import/recommended"],
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
              "type",
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
