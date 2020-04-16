import express from "express";
import Phelia from "phelia";

import RandomImage from "./random-image";

require("dotenv").config();

const app = express();
const client = new Phelia(process.env.SLACK_TOKEN!);

// Set up your interaction webhook hook
app.post(
  "/interactions",
  client.messageHandler(process.env.SLACK_SIGNING_SECRET!, [RandomImage])
);

// Post a message...
client.postMessage(RandomImage, "@andrew");

app.listen(3000);
