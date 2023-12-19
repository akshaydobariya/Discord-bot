const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const commands = [
  {
    name: "create",
    description: "Create a new Shorturl",
  },
];

const rest = new REST({ version: "10" }).setToken("YOUR_DISCORD_BOT_TOKEN");

async function updateCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("CLIENT_ID"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

// Call the async function
updateCommands();
