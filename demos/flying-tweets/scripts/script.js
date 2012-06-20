window.addEventListener('DOMContentLoaded', function() {
    /*
     * Configuration
     */
    var query = '#css'; // The initial search term
    var updateTime = 2; // The time between updates in minutes
    
    /*
     * Main script
     */
    // Set some global variables
    var frm_search = document.getElementById('frm_search');
    var txt_search = document.getElementById('txt_search');
    var btn_search = document.getElementById('btn_search');
    var tweet = document.getElementById('tweet');
    var count = 0;
    var tweets = [];
    var img = document.createElement('img');
    
    // Add span element and classes to each letter
    function doCharify(tweetData) {
        var text = tweetData.text;
        var user = tweetData.user;
        var result = '';
        for (var i = 0, len = text.length; i < len; i++) {
            result += '<span class="char' + (i % 10) + '">' + text[i] + '</span>';
        }
        result += '<div id="user"><a href="http://twitter.com/' + user + '">';
        user = '@' + user;
        for (var j = 0, len = user.length; j < len; j++) {
            result += '<span class="char' + (j % 10) + '">' + user[j] + '</span>';
        }
        result += '</a></div>';
        return result;
    }
    
    frm_search.onsubmit = function(event) {
        event.preventDefault();
        count = 0;
        query = txt_search.value;
        getTweets(query, 'setTweets');
        txt_search.blur();
        btn_search.blur();
        return false;
    };
    
    function doAnimationIteration() {        
        if (count >= (tweets.length - 1)) {
            count = 0;
        } else {
            count++;
        }
        showTweet(count);
    }
    
    img.addEventListener('WebkitAnimationIteration', doAnimationIteration, false);
    img.addEventListener('MozAnimationIteration', doAnimationIteration, false);
    img.addEventListener('msAnimationIteration', doAnimationIteration, false);
    img.addEventListener('OAnimationIteration', doAnimationIteration, false);
    img.addEventListener('animationIteration', doAnimationIteration, false);
    
    function getTweets(query, callback) {
        var url = 'http://search.twitter.com/search.json?q=' + encodeURIComponent(query) + '&callback=' + callback;
        // Remove any script tag we've used before
        var jsonScript = document.getElementById('jsonScript');
        if (jsonScript) {
            document.body.removeChild(jsonScript);
        }
        // Create new script tag with new query results
        jsonScript = document.createElement('script');
        jsonScript.id = 'jsonScript';
        jsonScript.src = url;
        document.body.appendChild(jsonScript);
    }
    
    this.setTweets = function(data) {
        updateTweets(data);
        showTweet(0);
    };
    
    this.updateTweets = function(data) {
        tweets = [];
        var results = data.results;
        var result, tweetData;
        for (var i = 0, len = results.length; i < len; i++) {
            result = results[i];
            tweetData = {
                text: result.text,
                user: result.from_user,
                img: result.profile_image_url
            };
            tweets.push(tweetData);
        }
        count = 0;
    };
    
    // Do this at the end of every animation iteration
    function showTweet(num) {
        var tweetData = tweets[num];
        img.src = tweetData.img;
        img.onload = function() {
            tweet.innerHTML = doCharify(tweetData);
            tweet.appendChild(img);
        };
    }
    
    // Start the animation
    txt_search.value = query;
    getTweets(query, 'setTweets');
    
    // Update the tweets
    var timer = window.setInterval(function() {
        getTweets(query, 'updateTweets');
    }, 60000 * updateTime);
}, false);
