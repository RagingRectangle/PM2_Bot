# PM2_MAD_Bot
PM2 Controller:

![Buttons](https://media.giphy.com/media/iBYOfZzfRv0wqwk6Lg/giphy.gif)

Rescan Quests:

![Truncate](https://media.giphy.com/media/mBg4I8FD1TpgIHtJvv/giphy.gif)

## About
A simple Discord bot to help control PM2 processes with the option to create a trigger that will truncate quests and reload MAD processes to rescan them. (**Bot token and node 16+ required**)

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
- **prefix:** Not needed but can be used for Discord triggers.
- **adminIDs:** List of Discord users that can execute commands or push buttons.
- **token:** Discord bot token.
- **pm2Trigger:** Trigger to send PM2 controller message.
- **mads:** List of MAD PM2 processes that should be reloaded after truncating quests.
- **ignore:** List of PM2 processes to ignore if you don't want buttons for them.
- **madDB:** Basic MAD database info. Leave blank if you don't plan on using the truncate quest feature.
- **truncateTrigger:** Trigger to truncate quests and reload MAD instances.

## Start
```
node pm2.js
```
