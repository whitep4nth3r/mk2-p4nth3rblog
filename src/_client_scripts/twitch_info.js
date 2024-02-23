const worker = new Worker("/js/twitch_worker.js");

const wrapperEl = document.querySelector("[data-twitch-wrapper]");
const linkEl = document.querySelector("[data-twitch-link]");
const titleEl = document.querySelector("[data-twitch-title]");
const subtitleEl = document.querySelector("[data-twitch-subtitle]");
const thumbContainerEl = document.querySelector("[data-thumb-container]");

(() => {
  worker.postMessage("get-data");
})();

worker.onmessage = function (message) {
  const data = message.data;
  if (data) {
    linkEl.href = data.link;
    titleEl.innerText = data.title;
    subtitleEl.innerText = data.subtitle;

    const thumbnailEl = document.createElement("img");

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
    thumbContainerEl.appendChild(thumbnailEl);

    thumbnailEl.onload = function () {
      thumbContainerEl.classList.add("twitchInfo__thumbContainer--in");
    };
  }
};
