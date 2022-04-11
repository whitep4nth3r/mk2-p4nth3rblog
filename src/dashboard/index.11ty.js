const OpenGraph = require("../../lib/openGraph");
const TwitchIcon = require("../_components/svg/twitchIcon");
const TwitterIcon = require("../_components/svg/twitterIcon");
const GithubIcon = require("../_components/svg/githubIcon");
const YoutubeColor = require("../_components/svg/youtubeColor");
const AboutTableOfContents = require("../_components/aboutTableOfContents");

const pageTitle = "whitep4nth3r's Stats Dashboard";

function loading() {
  return `<span class="dashboard__loading"></span>`;
}

exports.data = {
  layout: "base.html",
  title: pageTitle,
  pageType: "dashboard",
  metaDescription: "Track whitep4nth3r's stats in real-time on the Jamstack via serverless functions and magic.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  openGraphUrl: "https://whitep4nth3r.com/dashboard/",
};

exports.render = function (data) {
  return /* html */ `

    <div class="twoColumnWide__header">
        <h1 class="twoColumnWide__headerTitle">stats <span class="colorHighlight">dashboard</span></h1>
    </div>

    <div class="twoColumnWide__container">

      <aside class="twoColumnWide__aside">
        <div class="twoColumnWide__asideStickyGroup">
          ${AboutTableOfContents({ onDashboard: true })}
        </div>
      </aside>

      <div class="twoColumnWide__content">

        <section>
          <aside class="twoColumnWide__inlineAside">
            ${AboutTableOfContents({ onDashboard: true })}
        </aside>

        <section>
          <div class="dashboard__grid">
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${TwitchIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-twitchFollowers>
                  ${loading()}
                </span>
              </div>
              <p class="dashboard__gridItemTitle">Twitch followers</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${TwitterIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-twitterFollowers>
                  ${loading()}
                </span>
              </div>
              <p class="dashboard__gridItemTitle">Twitter followers</p>
            </div>
          </div>
          <div class="dashboard__grid">
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${YoutubeColor({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-youtubeSubs>
                  ${loading()}
                </span>
              </div>
              <p class="dashboard__gridItemTitle">Youtube subs</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${YoutubeColor({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-youtubeViews>
                  ${loading()}
                </span>
              </div>
              <p class="dashboard__gridItemTitle">Youtube views</p>
            </div>
          </div>
          <div class="dashboard__grid">
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${GithubIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-githubFollowers>
                  ${loading()}
                </span>
              </div>
              <p class="dashboard__gridItemTitle">GitHub followers</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${GithubIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-githubStars>
                  ${loading()}
                </span>
              </div>
              <p class="dashboard__gridItemTitle">GitHub stars</p>
            </div>
          </div>
        </section>
      <div>
    </div>  

    <script type="module" defer>
      async function makeDashboard() {
        const twitch = await fetch("/api/twitch");
        const twitchData = await twitch.json().then(res => {
          document.querySelector("[data-twitchFollowers]").innerText = res.followers.toLocaleString('en-GB');
        });

        const youtube = await fetch("/api/youtube");
        const youtubeData = await youtube.json().then(res => {
          const viewCount = parseInt(res.viewCount, 10);
          const subCount = parseInt(res.subscriberCount, 10)
          document.querySelector("[data-youtubeViews]").innerText = viewCount.toLocaleString('en-GB');
          document.querySelector("[data-youtubeSubs]").innerText = subCount.toLocaleString('en-GB');
        });       
        
        const github = await fetch("/api/github");
        const githubData = await github.json().then(res => {
          document.querySelector("[data-githubFollowers]").innerText = res.followers.toLocaleString('en-GB');
          document.querySelector("[data-githubStars]").innerText = res.stars.toLocaleString('en-GB');
        });
        
        const twitter = await fetch("/api/twitter");
        const twitterData = await twitter.json().then(res => {
          document.querySelector("[data-twitterFollowers]").innerText = res.followers.toLocaleString('en-GB');
        });
      }

      const dashboard = await makeDashboard();
    </script>
  `;
};
