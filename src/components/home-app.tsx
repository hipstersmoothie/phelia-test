import React from "react";
import endent from "endent";
// @ts-ignore
import {
  Actions,
  Button,
  Home,
  Input,
  Image,
  TextField,
  Option,
  SelectMenu,
  Section,
  Text,
  Divider,
  PheliaHomeProps,
  UseState,
  Modal,
  MultiSelectMenu,
  RadioButtons,
  Context,
  Confirm,
  UseModal,
  PheliaModalProps,
} from "phelia";
import { getUser, SlackUser } from "../utils";
import {
  getRepos,
  requestRepoAccess,
  addRepo,
  Repo,
  getPendingApprovals,
} from "../api";

const Heading = ({ children, emoji }: { children: string; emoji?: string }) => (
  <Section
    text={
      emoji ? (
        <Text type="mrkdwn">
          :{emoji}: *{children}* :{emoji}:
        </Text>
      ) : (
        <Text type="mrkdwn">*{children}*</Text>
      )
    }
  />
);

const Gap = () => (
  <Section>
    <Text> </Text>
  </Section>
);

const SmallSpacer = () => (
  <>
    <Gap />
    <Gap />
  </>
);

const Spacer = () => (
  <Context>
    <Image
      alt="spacer"
      imageUrl="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
    />
  </Context>
);

const li = (text: string) => `• ${text}\n`;
const a = (title: string, url: string) => `*<${url}|${title}>*`;

const helpLinks = [
  {
    title: "Open source contribution guidelines",
    url:
      "https://insight.intuit.com/workresources/pages/open-source-software-contribution-guidelines.aspx",
  },
  {
    title: "How to open source a project",
    url: "https://github.intuit.com/pages/open-source/OSSContributionProcess/",
  },
  {
    title: "View Teams",
    url: "https://github.intuit.com/pages/open-source/github-teams/",
  },
  { title: "GitHub Organization", url: "https://github.com/intuit" },
  {
    title: "Logo Generator",
    url: "https://github.intuit.com/pages/open-source/logo-generator/",
  },
];

export const HelpModal = () => (
  <Modal title="Help">
    <Heading>Resources</Heading>

    <Section
      text={
        <Text type="mrkdwn">
          {helpLinks.map(({ title, url }) => li(a(title, url))).join("")}
        </Text>
      }
    />

    <Heading>Channels</Heading>

    <Section
      text={
        <Text>
          {li(
            "#svc-opensource - Get help with the process and ask questions to a real person"
          )}
          {li(
            "#open-sourcerors - The OSS community channel. Share new project, releases, and gab about the latest open source news"
          )}
        </Text>
      }
    />
  </Modal>
);

const licenses = [
  "MIT",
  "Apache-2.0",
  "GPL-2.0",
  "CPL-1.0",
  "EPL-2.0",
  "BSD",
  "Other",
];

const legalQuestions = [
  "Does this project incorporate any open source code that is licensed under a copy-left or otherwise non-permissive license (e.g., code licensed under GPL)?",
  "Does this project incorporate any 3rd party code that is unlicensed or licensed under a proprietary license?",
  "While this project was being developed, was there any reliance on time/technology/resources from individuals/entities outside of Intuit (other than open source code)?",
  "Does this project incorporate any Intuit proprietary code that we would otherwise want to keep in-house or not share?",
  "Is this project of strategic importance to your business unit or to Intuit as a whole?",
  "Will this project be hosted on Intuit's GitHub?",
  "If a patent brainstorm has not yet been held for this project, would it be worthwhile to explore whether this project contains any technological innovations that we might want to protect?",
];

export const NewRepoModal = () => (
  <Modal title="Request New Repo" submit="Submit">
    <Section text="Create a new project in Intuit's public GitHub organization." />

    <Divider />

    <Heading>Repository Information</Heading>

    <Input label="Name">
      <TextField action="name" placeholder="my-cool-project" />
    </Input>

    <Input label="Descriptions">
      <TextField action="description" placeholder="It goes boom" multiline />
    </Input>

    <Input label="Internal Repo URL">
      <TextField
        action="url"
        placeholder="https://github.intuit.com/my/project"
      />
    </Input>

    <Input label="License">
      <SelectMenu type="static" action="license" placeholder="MIT">
        {licenses.map((license) => (
          <Option key={license} value={license}>
            {license}
          </Option>
        ))}
      </SelectMenu>
    </Input>

    <Divider />

    <Heading>Approvals</Heading>

    <Input label="Technical">
      <SelectMenu
        type="users"
        action="technicalApprover"
        placeholder="Your architect"
      />
    </Input>

    <Input label="Business Unit">
      <SelectMenu type="users" action="buApprover" placeholder="Your manager" />
    </Input>

    <Divider />

    <Heading>Members</Heading>

    <Input label="Admin">
      <MultiSelectMenu type="users" action="admin" />
    </Input>

    <Input label="Push" optional>
      <MultiSelectMenu type="users" action="push" />
    </Input>

    <Divider />

    <Heading>Legal Questions</Heading>

    {legalQuestions.map((legalQuestion, index) => (
      <Input key={legalQuestion} label={legalQuestion}>
        <RadioButtons action={`legalQuestion${index}`}>
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </RadioButtons>
      </Input>
    ))}
  </Modal>
);

export const RequestAccessModal = () => (
  <Modal title="Request Access to Repo" submit="Request">
    <Section text="Ask for push or admin access to an existing public GitHub project." />

    <Divider />

    <Input label="Public Github Username">
      <TextField action="githubUsername" placeholder="hipstersmoothie" />
    </Input>

    <Input label="Repository">
      <SelectMenu
        type="external"
        action="repo"
        placeholder="auto"
        minQueryLength={0}
        onSearchOptions={async (event) => {
          const repos = await getRepos(event.query);
          return repos.map((repo) => (
            <Option key={repo} value={repo}>
              {repo}
            </Option>
          ));
        }}
      />
    </Input>

    <Input label="Intuit Username">
      <SelectMenu type="users" action="slackId" placeholder="alisowski" />
    </Input>
  </Modal>
);

const User = (user: SlackUser) => (
  <>
    <Image alt="foo" imageUrl={user.image_24} />
    <Text>{user.real_name}</Text>
  </>
);

const ApprovalStatus = ({ approved }: { approved: boolean | undefined }) => (
  <Text>{approved ? ":white_check_mark:" : ":X:"}</Text>
);

const Approvals = ({ approval }: { approval: Repo<SlackUser> }) => (
  <>
    <Context>
      <ApprovalStatus approved={approval.approvals.technical} />
      <Text>Technical Approver:</Text>
      <User {...approval.technicalApprover} />
    </Context>
    <Context>
      <ApprovalStatus approved={approval.approvals.technical} />
      <Text>Business Unit Approver:</Text>
      <User {...approval.buApprover} />
    </Context>
  </>
);

const RepoInfo = ({ approval }: { approval: Repo<SlackUser> }) => (
  <Text key={approval.name} type="mrkdwn">
    {endent`
      ${a(approval.name, approval.url)}

      ${approval.description}
      
      *License*: ${approval.license}
    `}
  </Text>
);

interface RepoDetailsModalProps {
  props: {
    approval: Repo<SlackUser>;
  };
}

export const RepoDetailsModal = ({
  props: { approval },
}: RepoDetailsModalProps) => (
  <Modal title={approval.name}>
    <Section text={<RepoInfo approval={approval} />} />
    <Gap />
    <Approvals approval={approval} />
    <SmallSpacer />
    <Actions>
      <Button
        style="danger"
        confirm={
          <Confirm
            title="Cancel Project"
            confirm="Cancel Request"
            deny="Nevermind"
          >
            <Text type="mrkdwn">
              {endent`
                Are you certain you want to cancel open sourcing "${approval.name}"?

                This will entirely stop the process and you will have to restart it.
              `}
            </Text>
          </Confirm>
        }
      >
        Cancel Request
      </Button>
    </Actions>
  </Modal>
);

interface PendingApprovalsProps {
  useState: UseState;
  useModal: UseModal;
  user: string;
}

const PendingApprovals = ({
  user,
  useState,
  useModal,
}: PendingApprovalsProps) => {
  const [approvals, setApprovals] = useState<Repo<SlackUser>[] | undefined>(
    "approvals"
  );
  // @ts-ignore
  const openRepoDetailsModal = useModal("repo-details-modal", RepoDetailsModal);

  if (!approvals) {
    getPendingApprovals(user).then((repos) => {
      setApprovals(repos);
    });
  }

  if (!approvals || !approvals.length) {
    return null;
  }

  return (
    <>
      <Heading>Pending Approvals</Heading>
      <Divider />

      {approvals.map((approval) => (
        <>
          <Section
            text={<RepoInfo approval={approval} />}
            accessory={
              <Button
                action="open-repo-details"
                onClick={() => openRepoDetailsModal({ approval })}
              >
                View Details
              </Button>
            }
          />

          <Gap />
          <Approvals approval={approval} />
          <SmallSpacer />
        </>
      ))}
    </>
  );
};

export default function HomeApp({ user, useModal, useState }: PheliaHomeProps) {
  const openHelp = useModal("help-modal", HelpModal);
  const openRequestAccessModal = useModal(
    "access-modal",
    RequestAccessModal,
    async (event) => {
      const user = await getUser(event.form.slackId);

      requestRepoAccess(event.form.repo, {
        githubUsername: event.form.githubUsername,
        intuitUsername: user.display_name,
      });
    }
  );
  const openNewRepoModal = useModal(
    "repo-modal",
    NewRepoModal,
    async (event) => {
      const form = event.form as Repo<string>;
      const technicalApprover = await getUser(form.technicalApprover);
      const buApprover = await getUser(form.buApprover);
      const admin = await Promise.all(form.admin.map(getUser));
      const push = await Promise.all((form.push || []).map(getUser));

      addRepo({
        ...form,
        technicalApprover,
        buApprover,
        admin,
        push,
      });
    }
  );

  return (
    <Home>
      <Heading emoji="tada">{`Welcome @${user.name} to the Intuit Open Source project manager`}</Heading>

      <Section
        accessory={
          <Button action="open-help" onClick={() => openHelp()}>
            Help
          </Button>
        }
        text={
          <Text>
            This is the home for getting open source projects approved and
            managed here at Intuit. Here is the place where you can request new
            projects be open sourced, manage who can push to them, and check the
            status of your current requests.
          </Text>
        }
      />

      <SmallSpacer />

      <Actions>
        <Button
          style="primary"
          action="open-repo"
          onClick={() => openNewRepoModal()}
        >
          {"Add New Project :i_love_you_hand_sign:"}
        </Button>
        <Button action="open-access" onClick={() => openRequestAccessModal()}>
          {"Request Access :wave:"}
        </Button>
      </Actions>

      <Spacer />
      <Divider />
      <Spacer />

      <PendingApprovals
        useState={useState}
        useModal={useModal}
        user={user.username}
      />
    </Home>
  );
}
