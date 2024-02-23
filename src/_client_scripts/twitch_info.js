/**
  1. get data from api/twitch and then rewrite component ✅
  2. use web worker ✅
  3. we want to figure out how to gracefully load the thumbnail ... e.g. don't use a fallback but more of a skeleton loader effect
*/

const worker = new Worker("/js/twitch_worker.js");

const wrapperEl = document.querySelector("[data-twitch-wrapper]");
const linkEl = document.querySelector("[data-twitch-link]");
const titleEl = document.querySelector("[data-twitch-title]");
const subtitleEl = document.querySelector("[data-twitch-subtitle]");
const thumbnailEl = document.querySelector("[data-twitch-thumbnail]");

(() => {
  worker.postMessage("get-data");
})();

worker.onmessage = function (message) {
  const data = message.data;
  if (data) {
    linkEl.href = data.link;
    titleEl.innerText = data.title;
    subtitleEl.innerText = data.subtitle;
    thumbnailEl.setAttribute("height", data.thumbnail.height);
    thumbnailEl.setAttribute("width", data.thumbnail.width);
    thumbnailEl.setAttribute("src", data.thumbnail.url);

    if (data.isLive) {
      thumbnailEl.setAttribute(
        "class",
        "twitchInfo__thumbnail twitchInfo__thumbnail--live",
      );
      wrapperEl.setAttribute("data-live", "true");
    }
  }
};
