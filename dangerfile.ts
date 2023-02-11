/* eslint-disable no-console */
import type { GitHubPRDSL } from "danger";
import { danger, markdown, message, warn } from "danger";

import {
  getNamesFromTitle,
  getPackageNames,
  getScopeDifference,
  hasCorrectSyntax,
  hasCorrectType,
  hasImage,
  hasLeadingSpace,
  hasManyScope,
  hasValidTicketFooter,
  types,
} from "./dangerjs";

/**
 * Skip when DependaBot creates a PR
 **/
if (danger.github.pr.head.ref.indexOf("dependabot") === 0) {
  message(
    ":building_construction: This PR is being managed by DependaBot, skipping additional checks."
  );
  process.exit(0);
}

const createMarkdownBlock = ({
  title,
  subtitle,
  body,
}: {
  title?: string;
  subtitle?: string;
  body?: string;
}): void => {
  {
    title && markdown("### " + title + "\n");
  }
  {
    subtitle && markdown(subtitle + "\n");
  }
  {
    body && markdown("```\n" + body + "```");
  }
};

const createTextList = (items: string[]): string =>
  items.reduce<string>((acc, fileName) => acc + "- " + fileName + "\n", "");

const logger = (name: string, input: unknown, result?: unknown) => {
  console.log("name");
  console.log(name);
  console.log("input");
  console.log(input);
  result && console.log("result");
  result && console.log(result);
  console.log("- - - - - - - - - - -");
};

const pr: GitHubPRDSL = danger.github.pr;

const modifiedFiles: string[] = danger.git.modified_files;
const newFiles: string[] = danger.git.created_files;
const touchedFiles: string[] = [...modifiedFiles, ...newFiles];
const touchedPackages: string[] = getPackageNames(touchedFiles);
logger("touchedPackages", touchedFiles, touchedPackages);

const titleScope: string[] = getNamesFromTitle(pr.title);
logger("titleScope", pr.title, titleScope);

const { moreInTitleScope, moreInFilesScope } = getScopeDifference(
  titleScope,
  touchedPackages
);

/**
 * Fail when PR titles doesn't match the convention
 */
// Doesn't start with one of the agreed types (feat, fix, chore, ...)
const typeIncorrect = !hasCorrectType(pr.title);
logger("typeIncorrect", pr.title, typeIncorrect);

// Scope of change doesn't match changes in packages
const incorrectSymmetricScope =
  moreInTitleScope.length > 0 && moreInFilesScope.length > 0;
const titleScopeTooLarge = moreInTitleScope.length > 0;
const titleScopeTooSmall = moreInFilesScope.length > 0;

// Incorrect general syntax (formatting)
const incorrectGeneralTitleSyntax = !hasCorrectSyntax(pr.title);
const leadingSpace = hasLeadingSpace(pr.title);
logger("incorrectGeneralTitleSyntax", pr.title, incorrectGeneralTitleSyntax);

/**
 * Fail if PR does not have a description
 */
const noDescription = pr.body.length < 10;

/**
 * Warn if the PR body doesn't include a ticket ID
 */
const noTicketFooter = !hasValidTicketFooter(pr.body);

/**
 * Fail when package.json has changed but yarn.lock file has not
 */
const packageChanged = danger.git.modified_files.includes("package.json");
const lockfileChanged = danger.git.modified_files.includes("yarn.lock");
const outdatedLockfile = packageChanged && !lockfileChanged;

//TODO: uncomment this when we had test on FE (if we have someday)
/**
 * Warn when PACKAGE files have changed but there's no change to any corresponding spec files
 */
/* const filesWithoutTest: string[] = getFilesWithoutTestFile(
  getChangedPackageFiles(touchedFiles),
);
const hasMissingTests: boolean = filesWithoutTest.length > 0; */

/**
 * Warn when *.spec.ts files have been added (we should
 * only add *.test.ts after we transition to testing-library)
 */
/* const hasNewSpecFiles: boolean = getSpecFiles(newFiles).length > 0; */

/**
 * Warn when PR is really big
 */
const bigPrThreshold = 1200;
const isBigPR: boolean =
  danger.github.pr.additions + danger.github.pr.deletions > bigPrThreshold;

// Touched Styles and not image
const touchedStylesAndNotImage =
  touchedFiles.some((file) => file.includes(".scss")) && !hasImage(pr.body);

type CheckList = {
  error: boolean;
  errorFunction: () => void;
};

const checklistForFailure: CheckList[] = [
  {
    error: typeIncorrect,
    errorFunction: () => {
      const lastPrefix = types[types.length - 1];
      const prefixes = types.filter((p) => p !== lastPrefix);
      const quote = (p: string) => `"${p}"`;

      warn(
        `:mag_right:  PR title does not start with a correct prefix. The prefix can be ${prefixes
          .map(quote)
          .join(", ")} or "${lastPrefix}"`
      );
    },
  },
  {
    error: !hasManyScope && incorrectSymmetricScope,
    errorFunction: () => {
      createMarkdownBlock({
        title: ":telescope:  Scope difference",
        subtitle:
          "The scope of your changes is larger than you have indicated in your PR title, but you have also changed files that are not in your PR title. Please redefine the scope of this PR.",
        body:
          "These packages are present in your title scope, but not in your file changes: \n" +
          createTextList(moreInTitleScope) +
          "\n" +
          "These packages are present in your file changes, but not in your title scope: \n" +
          createTextList(moreInFilesScope),
      });
    },
  },
  {
    error: !hasManyScope && titleScopeTooLarge,
    errorFunction: () => {
      createMarkdownBlock({
        title: ":telescope:  Scope difference",
        subtitle:
          "Your title has a larger scope than the changes you made. These packages are present in your title, but not in your changes:",
        body: createTextList(moreInTitleScope),
      });
    },
  },
  {
    error: !hasManyScope && titleScopeTooSmall,
    errorFunction: () => {
      createMarkdownBlock({
        title: ":telescope:  Scope difference",
        subtitle:
          "The scope of your changes is larger than you have indicated in your PR title. These packages are present in your changes, but not in your title scope:",
        body: createTextList(moreInFilesScope),
      });
    },
  },
  {
    error: incorrectGeneralTitleSyntax,
    errorFunction: () => {
      if (leadingSpace) {
        warn(
          ":memo:  Your PR title has a leading whitespace character. Please remove it."
        );
      } else {
        warn(
          ':memo:  PR title does not have the correct general formatting. Our agreed format is {feat | fix | chore | refactor}({scope}): {PR title} . A correct example of a PR title would be: "feat(common, elements): add toast component" (without quotes).'
        );
      }
    },
  },
  {
    error: noDescription,
    errorFunction: () => {
      warn(
        ":pencil2:  Please add a short description to your PR explaining your changes."
      );
    },
  },
  {
    error: noTicketFooter,
    errorFunction: () => {
      warn(
        ":ticket:  Please add a ticket to the commit message footer so we can trace back to the story. Valid formats are `Ticket: CAA-1234` or `Ticket: [CAA-1234](https://xploregroup.atlassian.net/browse/CAA-1234)` or `Ticket: CASA-1234` or `Ticket: [CASA-1234](https://incentro.atlassian.net/browse/CAA-1234)` or `Ticket: None` if there is no ticket assigned to the PR."
      );
    },
  },
  {
    error: outdatedLockfile,
    errorFunction: () => {
      const msg = "Changes were made to package.json, but not to yarn.lock";
      const idea = "Perhaps you need to run `yarn install`?";
      warn(`:information_desk_person:  ${msg} - <i>${idea}</i>`);
    },
  },
  /* {
    error: hasMissingTests, errorFunction: () => {
      createMarkdownBlock({
        title: ':microscope: These files are missing tests',
        subtitle: isRefactor(pr.title)
          ? `It looks like you are refactoring existing code and you haven't made changes to these test because you want the functionality to be the same. If this is the case, you can ignore this warning.`
          : `Please have another look at these test files and confirm that any added functionality is tested.`,
        body: createTextList(filesWithoutTest),
      });
    }
  } */
  /* {
    error: hasNewSpecFiles, errorFunction: () => {
      createMarkdownBlock({
        title: ':microscope: These files are missing tests',
        subtitle: isRefactor(pr.title)
          ? `It looks like you are refactoring existing code and you haven't made changes to these test because you want the functionality to be the same. If this is the case, you can ignore this warning.`
          : `Please have another look at these test files and confirm that any added functionality is tested.`,
        body: createTextList(filesWithoutTest),
      });
    }
  } */
  {
    error: isBigPR,
    errorFunction: () => {
      warn(
        ":rotating_light: Big PR :rotating_light:<br /><br />Pull Request size seems relatively large. If this Pull Request contains multiple changes, split each into a separate PR will helps with faster and easier reviewing."
      );
    },
  },
  {
    error: touchedStylesAndNotImage,
    errorFunction: () => {
      message(
        ":camera: Style changes found<br /><br />This PR contains changes in styling, but no screenshot(s). Please note that your PR might be reviewed sooner when your colleagues can visually see the result of the styling changes you've made."
      );
    },
  },
];

const PRpasses = checklistForFailure.every((item) => !item.error);
logger("PRpasses", checklistForFailure, PRpasses);
if (PRpasses) {
  createMarkdownBlock({
    title: ":tada:  PR looks good, great job!  :tada:",
  });
} else {
  checklistForFailure.forEach((item) => {
    if (item.error) {
      item.errorFunction();
    }
  });
}
