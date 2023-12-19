import { Client, Intents } from "discord.js";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  // Check if the message sender is not a bot to avoid infinite loops
  if (message.author.bot) {
    // Reply to the user with a message
    return;
  }
  console.log("User typed:", message.content);
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({ content: "Generating Short Id for " + url });
  }
  message.reply("Hello! This is the bot");
});
client.on("interaction", (intraction) => {
  console.log(intraction);
  intraction.reply("pong");
});

client.on("error", (error) => {
  console.error("Bot encountered an error:", error);
});
client.login("YOUR_DISCORD_BOT_TOKEN");
