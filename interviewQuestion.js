import { Client, Intents } from "discord.js";
import axios from "axios";
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
});
// Set your OpenAI API key here
const openaiApiKey = "OPENAI_API_KEY";

// Set the OPENAI_API_KEY environment variable
process.env.OPENAI_API_KEY = openaiApiKey;

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (!message.author.bot) {
    const userMessage = message.content;
    console.log(userMessage);
    // Make a request to the ChatGPT API
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
      });

      // Send the ChatGPT response to the Discord channel
      message.channel.send(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error calling ChatGPT API:", error.message);
      message.channel.send("Error calling ChatGPT API.");
    }
  }
});
client.on("interaction", (intraction) => {
  console.log(intraction);
  intraction.reply("pong");
});

client.on("error", (error) => {
  console.error("Bot encountered an error:", error);
});
client.login("YOUR_DISCORD_BOT_TOKEN");
