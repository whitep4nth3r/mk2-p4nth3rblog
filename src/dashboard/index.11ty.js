const OpenGraph = require("../../lib/openGraph");
const TwitchIcon = require("../_components/svg/twitchIcon");
const TwitterIcon = require("../_components/svg/twitterIcon");
const GithubIcon = require("../_components/svg/githubIcon");
const YoutubeColor = require("../_components/svg/youtubeColor");
const AboutTableOfContents = require("../_components/aboutTableOfContents");

const pageTitle = "whitep4nth3r's Stats Dashboard";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  pageType: "dashboard",
  metaDescription: "Track whitep4nth3r's stats in real-time on the Jamstack via serverless functions and magic.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  return /* html */ `

    <div class="dashboard__header">
        <h1 class="dashboard__headerTitle">stats <span class="colorHighlight">dashboard</span></h1>
    </div>

    <div class="dashboard__container">

      <aside class="dashboard__aside">
        <div class="dashboard__asideStickyGroup">
         ${AboutTableOfContents({ onDashboard: true })}
        </div>
      </aside>

      <div class="dashboard__content">

          <section>
            <aside class="dashboard__inlineAside">
              ${AboutTableOfContents({ onDashboard: true })}
          </aside>

          <section class="dashboard__grid">
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${TwitchIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-twitchFollowers>-</span>
              </div>
              <p class="dashboard__gridItemTitle">Twitch followers</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${TwitchIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-twitchViews>-</span>
              </div>
              <p class="dashboard__gridItemTitle">Twitch views</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${YoutubeColor({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-youtubeSubs>-</span>
              </div>
              <p class="dashboard__gridItemTitle">Youtube subs</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${YoutubeColor({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-youtubeViews>-</span>
              </div>
              <p class="dashboard__gridItemTitle">Youtube views</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${GithubIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-githubFollowers>-</span>
              </div>
              <p class="dashboard__gridItemTitle">GitHub followers</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${GithubIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-githubStars>-</span>
              </div>
              <p class="dashboard__gridItemTitle">GitHub stars</p>
            </div>
            <div class="dashboard__gridItem">
              <div class="dashboard__gridItemStatBlock">
                <span class="dashboard__gridItemIcon">${TwitterIcon({ height: 32, width: 32 })}</span>
                <span class="dashboard__gridItemStat" data-twitterFollowers>-</span>
              </div>
              <p class="dashboard__gridItemTitle">Twitter followers</p>
            </div>
          </section>
      <div>
    </div>  

    <script type="module">
      async function getDashboard() {
        const youtube = await fetch("/api/youtube");
        const youtubeData = await youtube.json();

        const twitch = await fetch("/api/twitch");
        const twitchData = await twitch.json();

        const github = await fetch("/api/github");
        const githubData = await github.json();

        const twitter = await fetch("/api/twitter");
        const twitterData = await twitter.json();

        return {
          twitchFollowers: twitchData.followers.toLocaleString('en-US'),
          twitchViews: twitchData.views.toLocaleString('en-US'),
          youtubeSubs: youtubeData.subscriberCount.toLocaleString('en-US'),
          youtubeViews: youtubeData.viewCount.toLocaleString('en-US'),
          githubFollowers: githubData.followers.toLocaleString('en-US'),
          githubStars: githubData.stars.toLocaleString('en-US'),
          twitterFollowers: twitterData.followers.toLocaleString('en-US'),
        };
      }

      const dashboard = await getDashboard();

      Object.entries(dashboard).forEach(([key, value]) => {
        document.querySelector("[data-" + key + "]").innerText = value;
      });
    </script>
  `;
};
