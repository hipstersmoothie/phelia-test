import { SlackUser } from "./utils";

export interface User {
  githubUsername: string;
  intuitUsername: string;
}

export async function requestRepoAccess(name: string, user: User) {}

const mockRepos = ["auto", "ignite", "replay"];

export async function getRepos(query: string) {
  return mockRepos.filter((repo) => repo.includes(query));
}

export const licenses = [
  "MIT",
  "Apache-2.0",
  "GPL-2.0",
  "CPL-1.0",
  "EPL-2.0",
  "BSD",
  "Other",
];
export type License = typeof licenses[number];
export type Answer = "yes" | "no";

export interface Repo<T> {
  name: string;
  description: string;
  url: string;
  license: License;
  technicalApprover: T;
  buApprover: T;
  approvals: {
    technical?: boolean;
    bu?: boolean;
  }
  admin: T[];
  push: T[];
  legalQuestion0: Answer;
  legalQuestion1: Answer;
  legalQuestion2: Answer;
  legalQuestion3: Answer;
  legalQuestion4: Answer;
  legalQuestion5: Answer;
  legalQuestion6: Answer;
}

export async function addRepo(repo: Repo<SlackUser>) {}

const AndrewUser = {
  display_name: "Andrew",
  real_name: "Andrew Lisowski",
  image_24:
    "https://secure.gravatar.com/avatar/ff725a631f869cdb78beeb003825bb40.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0007-24.png",
  image_32:
    "https://secure.gravatar.com/avatar/ff725a631f869cdb78beeb003825bb40.jpg?s=32&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0007-32.png",
  image_48:
    "https://secure.gravatar.com/avatar/ff725a631f869cdb78beeb003825bb40.jpg?s=48&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0007-48.png",
  image_72:
    "https://secure.gravatar.com/avatar/ff725a631f869cdb78beeb003825bb40.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0007-72.png",
};

const GitHubUser = {
  display_name: "github_teams",
  real_name: "github_teams",
  image_24: 'https://avatars.slack-edge.com/2020-04-15/1078535733665_34cb47f880814c55450a_24.png',
  image_32: 'https://avatars.slack-edge.com/2020-04-15/1078535733665_34cb47f880814c55450a_32.png',
  image_48: 'https://avatars.slack-edge.com/2020-04-15/1078535733665_34cb47f880814c55450a_48.png',
  image_72: 'https://avatars.slack-edge.com/2020-04-15/1078535733665_34cb47f880814c55450a_72.png'
};

export async function getPendingApprovals(
  user: string
): Promise<Repo<SlackUser>[]> {
  return [
    {
      name: "ts-readme",
      description: "Generate docs from typescript and put it in a README.",
      url: "https://github.intuit.com/design-systems/ts-readme",
      license: "MIT",
      technicalApprover: AndrewUser,
      buApprover: GitHubUser,
      admin: [AndrewUser],
      push: [],
      approvals: {},
      legalQuestion0: "yes",
      legalQuestion1: "yes",
      legalQuestion2: "yes",
      legalQuestion3: "no",
      legalQuestion4: "yes",
      legalQuestion5: "yes",
      legalQuestion6: "no",
    },
    {
      name: "Fuego",
      description: " React implementation of the fuego player for the web.",
      url: "https://github.intuit.com/Fuego/Vulcan/",
      license: "BSD",
      technicalApprover: AndrewUser,
      buApprover: GitHubUser,
      admin: [AndrewUser],
      push: [],
      approvals: {
        technical: true,
        bu: true
      },
      legalQuestion0: "yes",
      legalQuestion1: "yes",
      legalQuestion2: "yes",
      legalQuestion3: "no",
      legalQuestion4: "yes",
      legalQuestion5: "yes",
      legalQuestion6: "no",
    },
  ];
}
