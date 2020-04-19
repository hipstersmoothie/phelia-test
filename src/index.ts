import express from "express";
import Phelia from "phelia";
import { createEventAdapter } from "@slack/events-api";

import RandomImage from "./components/random-image";
import HomeApp, { HelpModal, RequestAccessModal, RepoDetailsModal } from "./components/home-app";

require("dotenv").config();

const app = express();
const client = new Phelia(process.env.SLACK_TOKEN!);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET!);

// Set up your interaction webhook hook
app.post(
  "/interactions",
  client.messageHandler(process.env.SLACK_SIGNING_SECRET!, [
    RandomImage,
    HelpModal,
    RequestAccessModal,
    RepoDetailsModal,
  ])
);

(slackEvents as any).on("app_home_opened", client.appHomeHandler(HomeApp));
app.use("/events", slackEvents.requestListener());

// Post a message...
// client.postMessage(RandomImage, "UD11TAS0K");

app.listen(3000);
