

import { tweetsData } from './data.js';
const tweetBtn = document.querySelector('#tweet-btn');
const tweetInput = document.querySelector('#text-input');
const feed = document.querySelector('#feed');


tweetBtn.addEventListener('click', () => {
  const tweetText = tweetInput.value;
  tweetInput.value = "";
  console.log(tweetText);


})

document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
   if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet)
  }
  if(e.target.dataset.reply){
    handleReplyClick(e.target.dataset.reply)
  }
})

const handleLikeClick = (tweetId) => {
  const targetTweetObj = tweetsData.filter(tweet => {
    return tweet.uuid === tweetId
  })[0];
  // Liking and unliking a tweet
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--
  } else {
    targetTweetObj.likes++
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
}

const handleRetweetClick = (tweetId) => {
  const targetTweetObj = tweetsData.filter(tweet => {
    return tweet.uuid === tweetId
  })[0];

  // Retweeting and unretweeting a tweet
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--
  } else {
    targetTweetObj.retweets++
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

const handleReplyClick = (tweetId) => {
  const targetTweetObj = tweetsData.filter(tweet => {
    return tweet.uuid === tweetId
  })[0];
   console.log(targetTweetObj.replies)
}


const getFeedHtml = () => {
  let feedHtml = "";
  tweetsData.forEach(tweet => {

    let likeIconClass = '';
    let retweetIconClass = '';
    if (tweet.isLiked) {
      likeIconClass = 'liked';
    }
    if (tweet.isRetweeted) {
      retweetIconClass = 'retweeted';
    }





    feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}"class="profile-pic" width="50px" height="50px">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                  ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}"
                data-like="${tweet.uuid}"></i>
                  ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>
        </div>
    </div>
</div>
    `})

  return feedHtml
}
const render = () => {
  feed.innerHTML = getFeedHtml();
}

render();