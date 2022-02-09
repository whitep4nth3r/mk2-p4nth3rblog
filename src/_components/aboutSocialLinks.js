const DiscordIcon = require("./svg/discordIcon");
const GithubIcon = require("./svg/githubIcon");
const TwitchIcon = require("./svg/twitchIcon");
const TwitterIcon = require("./svg/twitterIcon");
const YoutubeSquare = require("./svg/youtubeSquare");
const DevIcon = require("./svg/devIcon");
const PolyworkIcon = require("./svg/polyworkIcon");
const FeedIcon = require("./svg/feedIcon");

function AboutSocialLinks() {
  return /*html*/ `
  <ul class="about__socialLinks">
    <li>
      <a href="https://discord.gg/theclaw" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${DiscordIcon()} Discord <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="https://github.com/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${GithubIcon()} Github <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="https://twitch.tv/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${TwitchIcon()} Twitch <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="https://twitter.com/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${TwitterIcon()} Twitter <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="https://youtube.com/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${YoutubeSquare()} YouTube <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="https://dev.to/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${DevIcon()} DEV <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="https://polywork.whitep4nth3r.com" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${PolyworkIcon()} Polywork <span role="presentation">→</span></a>
    </li>
    <li>
      <a href="/feed.xml" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${FeedIcon()} Feed <span role="presentation">→</span></a>
    </li>
  </ul>
  `;
}

module.exports = AboutSocialLinks;
