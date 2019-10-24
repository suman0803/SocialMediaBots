var TwitterPackage = require('twitter');

var count = 0;
var secret = {
		consumer_key: '',
		  consumer_secret: '',
		  access_token_key: '',
		  access_token_secret: ''
}
var Twitter = new TwitterPackage(secret);
var tweetId;
Twitter.stream('statuses/filter', {track: '#Google' || '@Google'}, function(stream) {
  stream.on('data', function(tweet) {
      console.log(tweet.id);

          //retweet code
          Twitter.post('favorites/create/' + tweet.id_str,  function(error, tweet, response){
              if(error){
                  console.log(error);
              }
              console.log(tweet);  // Tweet body.
          //  console.log(response);  // Raw response object.
          count = count +1;
          console.log(count);
          });
  });

  stream.on('error', function(error) {
      console.log(error);
  });
});