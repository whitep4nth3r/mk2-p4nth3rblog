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
  metaDescription:
    "Track whitep4nth3r's Twitter, YouTube, Twitch and GitHub stats in real-time on the Jamstack using serverless functions and magic.",
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
        <aside class="twoColumnWide__inlineAside">
          ${AboutTableOfContents({ onDashboard: true })}
        </aside>
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
      </div>
    </div>  

    <script>
      const dashboardData = Promise.all([fetch("/api/twitter"), fetch("/api/github"), fetch("/api/youtube"), fetch("/api/twitch")]).then((promises) => {
        promises.forEach(async (promise) => {
          const data = await promise.json();
          switch(data.type) {
            case "twitter":
              document.querySelector("[data-twitterFollowers]").innerText = data.followers.toLocaleString("en-GB");
            break;
            case "twitch":
              document.querySelector("[data-twitchFollowers]").innerText = data.followers.toLocaleString("en-GB");
            break;
            case "github": 
              document.querySelector("[data-githubFollowers]").innerText = data.followers.toLocaleString("en-GB");
              document.querySelector("[data-githubStars]").innerText = data.stars.toLocaleString("en-GB");
            break;
            case "youtube":
              const viewCount = parseInt(data.viewCount, 10);
              const subCount = parseInt(data.subscriberCount, 10);
              document.querySelector("[data-youtubeViews]").innerText = viewCount.toLocaleString("en-GB");
              document.querySelector("[data-youtubeSubs]").innerText = subCount.toLocaleString("en-GB");
            break;
            default:
              return false;
          }
        })        
      });
    </script>
  `;
};
