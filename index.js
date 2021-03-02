//@ts-check
const Discord = require('discord.js')
require("dotenv").config();
const request = require('request');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);
client.on('ready', () => console.log("im in boys"))

client.on("message", messageRecived)
function messageRecived(msg) {
    if (msg.author.bot) {
        console.log("bot cannot ask");
        return;
    } else {
        if (msg.content === '!test' && msg.channel.id === process.env.CHANNELID) {
            msg.reply("fuck off im not a bot ok");
        } else if (new RegExp("^\!anime-desc.*$").test(msg.content)) {
            let msgArr = msg.content.replace("!anime-desc", "");
            msgArr = msgArr.split(" ").join("%20");
            console.log(msgArr);
            request(`https://kitsu.io/api/edge/anime?filter[text]=${msgArr}`, function (error, response, body) {
                const bodyJson = JSON.parse(body);
                msg.channel.send(bodyJson.data[0].attributes.posterImage.original);
                msg.channel.send("First episode date:" + bodyJson.data[0].attributes.startDate)
                msg.channel.send(bodyJson.data[0].attributes.description);


            });

        }
    }
}

