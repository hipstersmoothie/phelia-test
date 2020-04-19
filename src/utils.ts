import { WebClient } from "@slack/web-api";

require("dotenv").config();

const client = new WebClient(process.env.SLACK_TOKEN!);

export interface SlackUser {
  real_name: string;
  display_name: string;
  image_24: string;
  image_32: string;
  image_48: string;
  image_72: string;
}

export async function getUser(id: string): Promise<SlackUser> {
  const { error, profile } = await client.users.profile.get({ user: id });

  if (error) {
    throw new Error(error);
  }

  console.log(profile);

  return profile as SlackUser;
}

// TODO: memoize
export async function getUsernameFromId(id: string) {
  const profile = await getUser(id);
  return (profile as any).display_name || (profile as any).real_name;
}
