

import { tweetsData } from './data.js';
const tweetBtn = document.querySelector('#tweet-btn');
const tweetInput = document.querySelector('#text-input');
const feed = document.querySelector('#feed');

tweetBtn.addEventListener('click', () => {
  const tweetText = tweetInput.value;
  tweetInput.value = "";
  console.log(tweetText);
})

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
                <i class="fa-regular fa-comment-dots"></i>
                  ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart"></i>
                  ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet"></i>
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