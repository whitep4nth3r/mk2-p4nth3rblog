const LIMIT = 84;
const bskyPostId = document.querySelector("[data-bsky-post-id]").dataset.bskyPostId;
const container = document.querySelector("[data-bsky-likes-container]");
const likesContainer = document.querySelector("[data-bsky-likes]");
const likesCount = document.querySelector("[data-bsky-likes-count]");
const commentsList = document.querySelector("[data-bsky-comments]");
const externalLink = document.querySelector("[data-bsky-external-link]");
const myDid = "did:plc:qcxqtc2yzznbaazu7egncqqx";
const bskyAPI = "https://public.api.bsky.app/xrpc/";
const getLikesURL = `${bskyAPI}app.bsky.feed.getLikes?limit=${LIMIT}&uri=`;
const getPostURL = `${bskyAPI}app.bsky.feed.getPosts?uris=`;
const getCommentsURL = `${bskyAPI}app.bsky.feed.getPostThread?uri=`;

let totalLikesCount;

function drawHowManyMore(postLikesCount, likesActorLength) {
  if (postLikesCount > LIMIT) {
    const likesMore = document.createElement("li");
    likesMore.classList.add("post__like");
    likesMore.classList.add("post__like--howManyMore");
    likesMore.innerText = `+${postLikesCount - likesActorLength}`;
    likesContainer.appendChild(likesMore);
  }
}

function drawLikes(likesActors, postLikesCount) {
  for (const like of likesActors) {
    const likeEl = document.createElement("li");
    likeEl.classList.add("post__like");

    if (like.actor.avatar !== undefined) {
      likeEl.innerHTML = `
        <img class="post__like__avatar" src="${like.actor.avatar.replace("avatar", "avatar_thumbnail")}" alt="${
        like.actor.displayName
      }" />`;
    } else {
      likeEl.classList.add("post__like--placeholder");
      likeEl.innerHTML = `
        <span aria-label="${like.actor.displayName}">@</span>
      `;
    }
    likesContainer.appendChild(likeEl);
  }

  drawHowManyMore(postLikesCount, likesActors.length);
}

function drawComments(comments) {
  let list = "";
  for (const comment of comments) {
    const newComment = `<li class="post__commentListItem">
    <div class="post__comment__avatar">
  <img src="${comment.post.author.avatar.replace("avatar", "avatar_thumbnail")}" alt="${
      comment.post.author.displayName
    }" height="128" width="128" /></div>
  <p class="post__comment__author"><span class="post__comment__authorDisplay">${
    comment.post.author.displayName
  }</span><span class="post__comment__authorHandle">${comment.post.author.handle}</span></p>
  <p class="post__comment__text">${comment.post.record.text}</p>
  <div class="post__comment__stats">
    <span>${comment.replies.length}</span>
    <span>${comment.post.repostCount + comment.post.quoteCount}</span>
    <span>${comment.post.likeCount}</span>
  </div>
</li>`;

    //todo replies
    //todo embeds?
    //todo timestamp

    list += newComment;
  }
  commentsList.insertAdjacentHTML("beforeend", list);
}

if (bskyPostId !== "null") {
  const postUri = `at://${myDid}/app.bsky.feed.post/${bskyPostId}`;
  try {
    const bskyPost = await fetch(getPostURL + postUri);
    const bskyPostLikes = await fetch(getLikesURL + postUri);
    const postData = await bskyPost.json();
    const likesData = await bskyPostLikes.json();

    totalLikesCount = postData.posts[0].likeCount;

    if (likesData.likes.length > 0) {
      likesCount.textContent = totalLikesCount;
      drawLikes(likesData.likes, totalLikesCount);
    }

    const comments = await fetch(getCommentsURL + postUri);
    const commentsData = await comments.json();

    if (commentsData.thread?.replies?.length > 0) {
      drawComments(commentsData.thread.replies);
    }
  } catch (error) {
    container.remove();
    commentsList.remove();
  }

  externalLink.addEventListener("mouseenter", () => {
    likesCount.textContent = "Like";
  });

  externalLink.addEventListener("mouseleave", () => {
    likesCount.textContent = totalLikesCount;
  });
}
