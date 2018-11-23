const Twit = require("twit");

let today = new Date();
let day = today.getDate();
let month = today.getMonth()+1;
let year = today.getFullYear();

if(day < 10) {
    day = '0' + day;
} 

if(month < 10) {
    month = '0'+ month;
 } 

let yesterday = `${year}-${month}-${day - 1}`

const Bot = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

Bot.get('search/tweets', { q: `#motivation since:${yesterday}`, count: 3 }, function(err, data, response) {
    data.statuses.map(tweet => {
        Bot.post('favorites/create', { id: tweet.id_str }, liked);

        function liked(err, data, response) {
        if (err) {
            console.log("Error: " + err.message);
        } else {
            console.log('Liked: ' + tweet.id);
        }
        }
    })
})