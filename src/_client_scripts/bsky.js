const LIMIT = 84;
const bskyPostId = document.querySelector("[data-bsky-post-id]").dataset.bskyPostId;
const likesContainer = document.querySelector("[data-bsky-likes-container]");
const repliesContainer = document.querySelector("[data-bsky-replies-container]");
const likes = document.querySelector("[data-bsky-likes]");
const likesCount = document.querySelector("[data-bsky-likes-count]");
const repliesList = document.querySelector("[data-bsky-replies]");
const repliesCount = document.querySelector("[data-bsky-replies-count]");
const repliesPlaceholder = document.querySelector("[data-replies-placeholder]");
const externalLink = document.querySelector("[data-bsky-external-link]");
const commentCountEl = document.querySelector("[data-bsky-replies-count]");
const myDid = "did:plc:qcxqtc2yzznbaazu7egncqqx";
const bskyAPI = "https://public.api.bsky.app/xrpc/";
const getLikesURL = `${bskyAPI}app.bsky.feed.getLikes?limit=${LIMIT}&uri=`;
const getPostURL = `${bskyAPI}app.bsky.feed.getPosts?uris=`;
const getrepliesURL = `/api/bskyreplies?postUri=`;

let totalLikesCount;

function drawHowManyMore(postLikesCount, likesActorLength) {
  if (postLikesCount > LIMIT) {
    const likesMore = document.createElement("li");
    likesMore.classList.add("post__like");
    likesMore.classList.add("post__like--howManyMore");
    likesMore.innerText = `+${postLikesCount - likesActorLength}`;
    likes.appendChild(likesMore);
  }
}

function drawLikes(likesActors, postLikesCount) {
  for (const like of likesActors) {
    if (like.actor.avatar !== undefined) {
      const likeEl = document.createElement("li");
      likeEl.classList.add("post__like");

      likeEl.innerHTML = `
        <img class="post__like__avatar" src="${like.actor.avatar.replace("avatar", "avatar_thumbnail")}" alt="${
        like.actor.displayName
      }" />`;

      likes.appendChild(likeEl);
    }
  }

  drawHowManyMore(postLikesCount, likesActors.length);
}

const heartSvg = `<svg fill="none" width="18" viewBox="0 0 24 24" height="16""><path fill="currentColor" stroke="none" stroke-width="0" stroke-linecap="butt" stroke-linejoin="miter" fill-rule="evenodd" clip-rule="evenodd" d="M16.734 5.091c-1.238-.276-2.708.047-4.022 1.38a1 1 0 0 1-1.424 0C9.974 5.137 8.504 4.814 7.266 5.09c-1.263.282-2.379 1.206-2.92 2.556C3.33 10.18 4.252 14.84 12 19.348c7.747-4.508 8.67-9.168 7.654-11.7-.541-1.351-1.657-2.275-2.92-2.557Zm4.777 1.812c1.604 4-.494 9.69-9.022 14.47a1 1 0 0 1-.978 0C2.983 16.592.885 10.902 2.49 6.902c.779-1.942 2.414-3.334 4.342-3.764 1.697-.378 3.552.003 5.169 1.286 1.617-1.283 3.472-1.664 5.17-1.286 1.927.43 3.562 1.822 4.34 3.764Z"></path></svg>`;

const repostSvg = `<svg fill="none" width="22" viewBox="0 0 24 24" height="18" ><path fill="currentColor" stroke="none" stroke-width="0" stroke-linecap="butt" stroke-linejoin="miter" fill-rule="evenodd" clip-rule="evenodd" d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"></path></svg>`;

const replySvg = `<svg fill="none" width="22" viewBox="0 0 24 24" height="18"><path fill="currentColor" stroke="none" stroke-width="0" stroke-linecap="butt" stroke-linejoin="miter" fill-rule="evenodd" clip-rule="evenodd" d="M20.002 7a2 2 0 0 0-2-2h-12a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v1.918l3.375-2.7a1 1 0 0 1 .625-.218h5a2 2 0 0 0 2-2V7Zm2 8a4 4 0 0 1-4 4h-4.648l-4.727 3.781A1.001 1.001 0 0 1 7.002 22v-3h-1a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8Z"></path></svg>`;

function countReplies(replies) {
  if (!Array.isArray(replies)) return 0;

  let count = 0;

  for (const reply of replies) {
    if (reply?.post) {
      count += 1;
    }

    if (Array.isArray(reply?.replies)) {
      count += countReplies(reply.replies);
    }
  }

  return count;
}

function escapeHTML(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function createLinkToPost(post) {
  const handle = post.author.handle;
  const postUri = post.uri;

  const postId = postUri.split("/").pop();

  return `https://bsky.app/profile/${handle}/post/${postId}`;
}

function drawEmbedImages(images) {
  return images
    .map(
      (img) => `
      <img
        src="${img.thumb}"
        alt="${img.alt}"
        height="${img.aspectRatio.height}"
        width="${img.aspectRatio.width}"
      />
    `,
    )
    .join("");
}

function drawEmbedExternal(external) {
  return `
    ${external.title.length > 0 ? `<p class="ext__title">${external.title}</p>` : ""}
    ${external.description.length > 0 ? `<p class="ext__desc">${external.description}</p>` : ""}
    <p class="ext__uri">${external.uri}</p>
  `;
}

function drawEmbedRecord(record) {
  return drawOnePost(
    record,
    record.author,
    record.value.text,
    record.value.createdAt,
    record.embeds ? record.embeds[0] : null,
  );
}

function drawEmbed(embed) {
  switch (embed.$type) {
    case "app.bsky.embed.record#view":
      return `<div class="post__reply__embed post__reply__embed--record">
          ${drawEmbedRecord(embed.record)}
      </div>`;
    case "app.bsky.embed.images#view":
      return `<div class="post__reply__embed post__reply__embed--images">
          ${drawEmbedImages(embed.images)}
      </div>`;
    case "app.bsky.embed.external#view":
      return `<div class="post__reply__embed post__reply__embed--external">
          ${drawEmbedExternal(embed.external)}
      </div>`;
    default:
      return "";
  }
}

function drawOnePost(post, author, text = "", createdAt, embed = null, replies = []) {
  const isEmbed = post.$type && post.$type === "app.bsky.embed.record#viewRecord";
  const parentTagName = isEmbed ? "div" : "li";
  const innerTagName = isEmbed ? "span" : "a";
  const includeLink = !isEmbed
    ? `target="_blank" aria-label="Read ${author.displayName}'s reply on Bluesky" href="${createLinkToPost(post)}"`
    : "";
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));

  return `<${parentTagName} class="post__reply__listItem">
    <${innerTagName} class="post__reply__listItem__inner"${includeLink}>
      <div class="post__reply__avatar">
        <img src="${author.avatar.replace("avatar", "avatar_thumbnail")}" alt="${
    author.displayName
  }" height="128" width="128" />
    </div>
    <div class="post__reply__content">
      <p class="post__reply__author"><span class="post__reply__authorDisplay">${
        author.displayName
      }</span><span class="post__reply__authorHandle">${
    author.handle
  }</span><span class="post__reply__createdAt">${date}</span></p>
      ${text.length > 0 ? `<p class="post__reply__text">${escapeHTML(text)}</p>` : ""}
      ${embed ? drawEmbed(embed) : ``}
      <div class="post__reply__stats">
        <span class="post__reply__stats__item">${replySvg} <span>${post.replyCount}</span></span>
        <span class="post__reply__stats__item">${repostSvg}<span> ${post.repostCount + post.quoteCount}</span></span>
        <span class="post__reply__stats__item">${heartSvg} <span>${post.likeCount}</span></span>
      </div>
    </div>
  </${innerTagName}>

  ${
    replies?.length > 0 ? `<ul class="post__replies__list post__replies__list--child">${drawReplies(replies)}</ul>` : ``
  }
</${parentTagName}>`;
}

function drawReplies(replies) {
  if (!replies || replies.length === 0) return "";

  let list = "";
  for (const reply of replies) {
    const newReply = drawOnePost(
      reply.post,
      reply.post.author,
      reply.post.record.text,
      reply.post.record.createdAt,
      reply.post.embed,
      reply.replies,
    );

    list += newReply;
  }

  return list;
}

if (bskyPostId !== "null") {
  const postUri = `at://${myDid}/app.bsky.feed.post/${bskyPostId}`;
  try {
    const bskyPost = await fetch(getPostURL + postUri);
    const postData = await bskyPost.json();

    if (postData.posts.length > 0) {
      const bskyPostLikes = await fetch(getLikesURL + postUri);
      const likesData = await bskyPostLikes.json();

      totalLikesCount = postData.posts[0].likeCount;

      if (likesData.likes.length > 0) {
        likesCount.textContent = totalLikesCount;
        drawLikes(likesData.likes, totalLikesCount);
      }

      const replies = await fetch(getrepliesURL + postUri);
      const repliesData = await replies.json();

      if (repliesData.thread?.replies?.length > 0) {
        repliesCount.textContent = countReplies(repliesData.thread.replies);
        repliesList.insertAdjacentHTML("beforeend", drawReplies(repliesData.thread.replies));

        repliesPlaceholder.remove();
      }
    } else {
      repliesContainer.remove();
      likesContainer.remove();
    }
  } catch (error) {
    console.log(error);
    likesContainer.remove();
    repliesList.remove();
  }

  externalLink.addEventListener("pointerenter", () => {
    likesCount.textContent = "Like";
  });

  externalLink.addEventListener("pointerleave", () => {
    likesCount.textContent = totalLikesCount;
  });
}
