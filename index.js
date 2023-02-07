

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
})

const handleLikeClick = (tweetId) => {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]
  targetTweetObj.likes++
  render();
}





const getFeedHtml = () => {
  let feedHtml = "";
  tweetsData.forEach(tweet => {
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
                <i class="fa-solid fa-heart"  data-like="${tweet.uuid}"></i>
                  ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet"    data-retweet="${tweet.uuid}"></i>
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