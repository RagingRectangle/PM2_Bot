const {
	Client,
	Intents,
	MessageEmbed,
	Permissions,
	MessageActionRow,
	MessageButton
} = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const fs = require('fs');
const pm2 = require('pm2');
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
const UpdateButtons = require('./update_buttons.js');
const TruncateQuests = require('./truncate_quests.js');
const config = require('./config.json');

client.on('ready', () => {
	console.log("PM2 Bot Logged In");
});

client.on('messageCreate', async (receivedMessage) => {
	let message = receivedMessage.content;
	if (!config.discord.adminIDs.includes(receivedMessage.author.id)) {
		return;
	}
	if (receivedMessage.channel.type !== "DM" && !config.discord.channelIDs.includes(receivedMessage.channel.id)){
		return;
	}
	//Send PM2 list/buttons
	if (message === `${config.discord.prefix}${config.pm2.pm2Command}`) {
		await new Promise(done => setTimeout(done, 1000 * config.delaySeconds));
		UpdateButtons.updateButtons(receivedMessage.channel, 'new');
	} else if (config.madDB.host && config.madDB.truncateCommand && message === `${config.discord.prefix}${config.madDB.truncateCommand}`) {
		await new Promise(done => setTimeout(done, 1000 * config.delaySeconds));
		TruncateQuests.truncateQuests(client, receivedMessage);
	}
}); //End of client.on(message)

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	if (!interaction.customId.startsWith(config.serverName)) {
		return;
	}
	if (!config.discord.adminIDs.includes(interaction.user.id)){
		return;
	}
	let buttonID = interaction.customId.replace(`${config.serverName}_`, '');
	if (buttonID === 'reload') {
		var newButtons = interaction.message.components;
		for (var r = 0; r < newButtons.length - 1; r++) {
			let row = newButtons[r]['components'];
			for (var b in row) {
				row[b]['style'] = 1;
				row[b]['custom_id'] = `${config.serverName}_process_reload_${row[b]['label']}`;
			} //End of b loop
		} //End of r loop
		interaction.message.edit({
			content: `**Reload ${config.serverName} Processes:**`,
			components: newButtons
		});
	} else if (buttonID === 'start') {
		var newButtons = interaction.message.components;
		for (var r = 0; r < newButtons.length - 1; r++) {
			let row = newButtons[r]['components'];
			for (var b in row) {
				row[b]['style'] = 3;
				row[b]['custom_id'] = `${config.serverName}_process_start_${row[b]['label']}`;
			} //End of b loop
		} //End of r loop
		interaction.message.edit({
			content: `**Start ${config.serverName} Processes:**`,
			components: newButtons
		});
	} else if (buttonID === 'stop') {
		var newButtons = interaction.message.components;
		for (var r = 0; r < newButtons.length - 1; r++) {
			let row = newButtons[r]['components'];
			for (var b in row) {
				row[b]['style'] = 4;
				row[b]['custom_id'] = `${config.serverName}_process_stop_${row[b]['label']}`;
			} //End of b loop
		} //End of r loop
		interaction.message.edit({
			content: `**Stop ${config.serverName} Processes:**`,
			components: newButtons
		});
	} else if (buttonID === 'status') {
		UpdateButtons.updateButtons(interaction, 'edit');
	} else if (buttonID.startsWith('process_')) {
		buttonID = buttonID.replace('process_', '');
		pm2.connect(async function (err) {
			if (err) {
				console.log(err);
				pm2.disconnect();
			} else {
				if (buttonID.startsWith('reload_')) {
					let processName = buttonID.replace('reload_', '');
					pm2.reload(processName, (err, response) => {
						if (err) {
							console.log(err);
							pm2.disconnect();
						} else {
							console.log(`${processName} reloaded`);
							pm2.disconnect();
						}
					});
				} else if (buttonID.startsWith('start_')) {
					let processName = buttonID.replace('start_', '');
					pm2.start(processName, (err, response) => {
						if (err) {
							console.log(err);
							pm2.disconnect();
						} else {
							console.log(`${processName} started`);
							pm2.disconnect();
						}
					});
				} else if (buttonID.startsWith('stop_')) {
					let processName = buttonID.replace('stop_', '');
					pm2.stop(processName, (err, response) => {
						if (err) {
							console.log(err);
							pm2.disconnect();
						} else {
							console.log(`${processName} stopped`);
							pm2.disconnect();
						}
					});
				} else {
					pm2.disconnect();
				}
			}
		}) //End of pm2.connect
	}
	interaction.deferUpdate();
}); //End of client.on(interactionCreate)


client.login(config.discord.token);