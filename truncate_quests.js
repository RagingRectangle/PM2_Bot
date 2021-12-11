const {
    Client,
    Intents,
    MessageEmbed,
    Permissions,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
const pm2 = require('pm2');
const config = require('./config.json');

module.exports = {
    truncateQuests: async function truncateQuests(client, receivedMessage) {
        let connection = mysql.createConnection(config.madDB);
        connection.connect();
        let truncateQuery = 'TRUNCATE trs_quest;';
        connection.query(truncateQuery, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`${config.madDB.database} quests truncated`);
                receivedMessage.channel.send(`${config.madDB.database} quests truncated`);
                reloadMADs();
            }
        });
        connection.end();

        async function reloadMADs() {
            pm2.connect(async function (err) {
                if (err) {
                    console.error(err);
                } else {
                    for (var i in config.pm2.mads){
                        let processName = config.pm2.mads[i];
                        pm2.reload(processName, (err, response) => {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                console.log(`${processName} reloaded`);
                                receivedMessage.channel.send(`${processName} reloaded`);
                            }
                        }); //End of pm2.list
                        await new Promise(done => setTimeout(done, 5000));
                    }
                }
            }); //End of pm2.connect
        } //End of reloadMADs()
    }, //End of truncateQuests()
}