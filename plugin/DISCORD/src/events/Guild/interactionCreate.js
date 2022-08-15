const {
  InteractionType,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
};

client.on("interactionCreate", async (interaction) => {
  interaction.commands = client.commands;

  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  const command = client.slash.get(interaction.commandName);
  if (!command) return;
  if (command.botpermissions) {
    let missingperms = [];

    command.botpermissions.forEach((permission) => {
      if (
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.resolve(permission)
        )
      ) {
        missingperms.push(