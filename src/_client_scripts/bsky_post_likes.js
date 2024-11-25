const LIMIT = 55;
const bskyPostId = document.querySelector("[data-bsky-post-id]").dataset.bskyPostId;
const container = document.querySelector("[data-bsky-container]");
const likesContainer = document.querySelector("[data-bsky-likes]");
const likesCount = document.querySelector("[data-bsky-likes-count]");
const myDid = "did:plc:qcxqtc2yzznbaazu7egncqqx";
const bskyAPI = "https://public.api.bsky.app/xrpc/";
const getLikesURL = `${bskyAPI}app.bsky.feed.getLikes?limit=${LIMIT}&uri=`;
const getPostURL = `${bskyAPI}app.bsky.feed.getPosts?uris=`;

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

if (bskyPostId !== "null") {
  const postUri = `at://${myDid}/app.bsky.feed.post/${bskyPostId}`;
  try {
    const bskyPost = await fetch(getPostURL + postUri);
    const bskyPostLikes = await fetch(getLikesURL + postUri);
    const postData = await bskyPost.json();
    const likesData = await bskyPostLikes.json();

    const totalLikesCount = postData.posts[0].likeCount;

    if (likesData.likes.length > 0) {
      likesCount.textContent = totalLikesCount;
      drawLikes(likesData.likes, totalLikesCount);
    }
  } catch (error) {
    container.remove();
  }
}
