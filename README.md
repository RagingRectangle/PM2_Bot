# PM2_MAD_Bot
PM2 Controller:

![Buttons](https://media.giphy.com/media/iBYOfZzfRv0wqwk6Lg/giphy.gif)

Rescan Quests:

![Truncate](https://media.giphy.com/media/mBg4I8FD1TpgIHtJvv/giphy.gif)

## About
A simple Discord bot to help control PM2 processes/modules with the option to create a trigger that will truncate quests and reload MAD processes to rescan them.

## Requirements
1: Node 16+ installed on server

2: Discord bot with:
  - Server Members Intent
  - Message Content Intent
  - Read/write perms in channels

## Install
```
git clone https://github.com/RagingRectangle/PM2_MAD_Bot.git
cd PM2_MAD_Bot
cp config.json.example config.json
npm install
```

## Setup
- **serverName:** Custom name for your server.
- **delaySeconds:** If used on multiple servers you can use this to make sure the bot always responds in a specific order.
- **prefix:** Not needed but can be used for Discord commands.
- **adminIDs:** List of Discord users that can execute commands or push buttons.
- **channelIDs:** List of channels that the bot will respond in. Will also respond to DMs if they are admins.
- **token:** Discord bot token.
- **pm2Command:** Command to send PM2 controller message.
- **mads:** List of MAD PM2 processes that should be reloaded after truncating quests.
- **ignore:** List of PM2 processes/modules to ignore if you don't want buttons for them.
- **madDB:** Basic MAD database info. Leave blank if you don't plan on using the truncate quest feature.
- **truncateCommand:** Command to truncate quests and reload MAD instances.

## Start
```
node pm2.js
```
