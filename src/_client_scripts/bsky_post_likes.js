const bskyPostId = document.querySelector("#bsky_post_id").dataset.bskyPostId;
const likesContainer = document.querySelector("[data-bsky-likes]");

function drawLikes(likes) {
  for (const like of likes) {
    const likeEl = document.createElement("li");
    likeEl.classList.add("post__like");
    likeEl.innerHTML = `
      <img class="post__like__avatar" src="${like.actor.avatar.replace("avatar", "avatar_thumbnail")}" alt="${
      like.actor.displayName
    }" />`;
    likesContainer.appendChild(likeEl);
  }
}

if (bskyPostId !== null) {
  const myDid = "did:plc:qcxqtc2yzznbaazu7egncqqx";
  const postUri = `at://${myDid}/app.bsky.feed.post/${bskyPostId}`;

  const bskyPostLikes = await fetch("https://public.api.bsky.app/xrpc/app.bsky.feed.getLikes?uri=" + postUri);
  const data = await bskyPostLikes.json();
  console.log(data.likes);

  if (data.likes.length > 0) {
    drawLikes(data.likes);
  }
}
