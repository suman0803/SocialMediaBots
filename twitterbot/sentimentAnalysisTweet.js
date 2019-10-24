var TwitterPackage = require('twitter');

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var secret = {
		  consumer_key: '',
		  consumer_secret: '',
		  access_token_key: '',
		  access_token_secret: ''
}
var Twitter = new TwitterPackage(secret);
var tweetId;
Twitter.stream('statuses/filter', { track: '#Google' || '@Google' }, function (stream) {
    stream.on('data', function (tweet) {
        console.log(tweet.id);
        var result = sentiment.analyze(tweet.extended_tweet.full_text);
        if (result.comparative > 0.5) {
            //retweet code
            Twitter.post('statuses/retweet/' + tweet.id_str, function (error, tweet, response) {
                if (error) {
                    console.log(error);
                }
                //console.log(tweet);  // Tweet body.
                //  console.log(response);  // Raw response object.
            });
        }
        console.log(tweet); 
        console.log(result); 
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});