const Twit = require("twit");

const Bot = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

// gets the bot's friends list, then unfollows the first 90 users
Bot.get("friends/list")
    .then(res => {
        res.data.users.slice(0,90).map(user => {
            Bot.post("friendships/destroy", {name: user.name, screen_name: user.screen_name})
                .then(res => "Unfollowed: " + res.data.id)
                .catch(err => console.log(err))
        })
    })
    .catch(err => console.log(err))