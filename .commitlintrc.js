const { utils } = require("@commitlint/config-lerna-scopes");

module.exports = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "header-max-length": [2, "always", "100"],
    "type-enum": [
      2,
      "always",
      ["BREAKING", "chore", "ci", "feat", "fix", "refactor", "revert"],
    ],
    "scope-enum": async (ctx) => {
      return [1, "always", [...(await utils.getPackages(ctx)), "many", "docs"]];
    },
  },
};
