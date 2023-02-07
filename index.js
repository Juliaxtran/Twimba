

import { tweetsData } from './data.js';
const tweetInput = document.querySelector('#text-input');
const feed = document.querySelector('#feed');
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
  else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet)
  }
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  }
  else if (e.target.id === 'tweet-btn') {
    handleTweetBtnClick()
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

const handleReplyClick = (replyId) => {
  document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}

const handleTweetBtnClick = () => {
  tweetsData.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
  })
  render()
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

    let repliesHTML = '';

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(reply => {
        repliesHTML += `
        <div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${reply.profilePic}" min-width='70px' height='50px'
             class="profile-pic" >
                <div>
                    <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">${reply.tweetText}</p>
                </div>
            </div>
        </div>
        `
      })
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
    <dic id="replies-${tweet.uuid}" >
    ${repliesHTML}
    </div>
</div>`
})

  return feedHtml
}
const render = () => {
  feed.innerHTML = getFeedHtml();
}

render();