import * as Discord from "discord.js";

import config from "../config";

const client = new Discord.Client();

client.on("message", function (message) {
    if (message.author.bot) return;
    let prefixes = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
    if (prefixes.some(prefix => {return message.content.includes(prefix)})) {
        if (!message.guild.member(client.user).hasPermission("SEND_MESSAGES") || !message.guild.member(client.user).hasPermission("EMBED_LINKS")) {
            try {
                return message.author.send(`I'm unable to send messages in the server: '${message.guild}'`);
            } catch (e) {
                return;
            }
        }

        let members = message.guild.members;
        let memberIds :Array<string> = new Array<string>();
        members.forEach((member) => {
            if (member.id !== client.user.id) memberIds.push(member.id);
        });
        message.channel.send(`${message.author.username}: <@${memberIds[Math.floor(Math.random() * memberIds.length)]}>`).catch((e) => {
            console.log(`Failed to send message`);
        });
    }
});

client.login(config.discordKey).then().catch(() => console.log(`Failed startup`));
