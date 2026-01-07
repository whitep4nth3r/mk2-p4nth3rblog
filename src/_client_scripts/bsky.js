const LIMIT = 84;
const bskyPostId = document.querySelector("[data-bsky-post-id]").dataset.bskyPostId;
const container = document.querySelector("[data-bsky-likes-container]");
const likesContainer = document.querySelector("[data-bsky-likes]");
const likesCount = document.querySelector("[data-bsky-likes-count]");
const commentsList = document.querySelector("[data-bsky-comments]");
const externalLink = document.querySelector("[data-bsky-external-link]");
const commentCountEl = document.querySelector("[data-bsky-comment-count]");
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

const heart = `<svg fill="none" width="18" viewBox="0 0 24 24" height="18""><path fill="currentColor" stroke="none" stroke-width="0" stroke-linecap="butt" stroke-linejoin="miter" fill-rule="evenodd" clip-rule="evenodd" d="M16.734 5.091c-1.238-.276-2.708.047-4.022 1.38a1 1 0 0 1-1.424 0C9.974 5.137 8.504 4.814 7.266 5.09c-1.263.282-2.379 1.206-2.92 2.556C3.33 10.18 4.252 14.84 12 19.348c7.747-4.508 8.67-9.168 7.654-11.7-.541-1.351-1.657-2.275-2.92-2.557Zm4.777 1.812c1.604 4-.494 9.69-9.022 14.47a1 1 0 0 1-.978 0C2.983 16.592.885 10.902 2.49 6.902c.779-1.942 2.414-3.334 4.342-3.764 1.697-.378 3.552.003 5.169 1.286 1.617-1.283 3.472-1.664 5.17-1.286 1.927.43 3.562 1.822 4.34 3.764Z"></path></svg>`;

function drawComments(comments) {
  let list = "";
  for (const comment of comments) {
    console.log(comment);

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
    <span class="post__comments__stats__likes">${heart} <span>${comment.post.likeCount}</span></span>
  </div>
</li>`;

    //todo replies
    //todo embeds?
    //todo timestamp
    //add link to post?
    //only show if doesn't contain quote post - see women in tech article

    //do comments during static build to filter out hidden
    //keep likes on client

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
      commentCountEl.innerText = commentsData.thread.replies.length;
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
