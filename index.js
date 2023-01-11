

import { tweetsData } from './data.js';
const tweetBtn = document.querySelector('#tweet-btn');
const tweetInput = document.querySelector('#text-input');

tweetBtn.addEventListener('click', () => {
  const tweetText = tweetInput.value;
  tweetInput.value = "";
  console.log(tweetText);
})

const getFeedHtml = () => {
  tweetsData.forEach(tweet => {
    const feedHtml = `
    <div class="tweet">
    <div class="tweet-inner">
        <img src=${tweet.profilePic}class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                  ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                  ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    ${tweet.retweets}
                </span>
            </div>
        </div>
    </div>
</div>
    `
    console.log(feedHtml);
  })
}

getFeedHtml();
