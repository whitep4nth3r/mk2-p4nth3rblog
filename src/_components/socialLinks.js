const DiscordIcon = require("./svg/discordIcon");
const GithubIcon = require("./svg/githubIcon");
const TwitchIcon = require("./svg/twitchIcon");
const YouTubeIcon = require("./svg/youtubeIcon");
const BlueskyIcon = require("./svg/blueskyIcon");
const FeedIcon = require("./svg/feedIcon");

function SocialLinks() {
  return /*html*/ `
  <ul class="socialLinks">
    <li>
      <a href="https://twitch.tv/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Follow on Twitch">${TwitchIcon()}</a>
    </li>
    <li>
      <a href="https://github.com/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="View on GitHub">${GithubIcon()}</a>
    </li>
    <li>
      <a href="https://bsky.app/profile/whitep4nth3r.com" class="socialLinks__item bluesky-flutter" target="_blank" rel="me nofollow noreferrer" aria-label="Follow on Bluesky">${BlueskyIcon()}</a>
    </li>
    <li>
      <a href="https://youtube.com/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Subscribe on YouTube">${YouTubeIcon()}</a>
    </li>
    <li>
      <a href="/discord" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Join Discord">${DiscordIcon()}</a>
    </li>
    <li>
      <a href="/feed.xml" class="socialLinks__item" target="_blank" aria-label="Subscribe to RSS Feed">${FeedIcon()}</a>
    </li>
  </ul>
  <div class="h-card" aria-hidden="true" style="display: none;">
    <span class="p-name">Salma Alam-Naylor</span>
    <span class="p-nickname">whitep4nth3r</span>
    <div class="p-org">Sentry</div>
    <img class="u-photo" src="https://images.ctfassets.net/56dzm01z6lln/69YokY1TvGVk37gCQmQJDo/c315f0996556c9c1f276d12d5f201a76/headshot_relaxed.png"/>
    <a class="u-url" href="https://whitep4nth3r.com">w</a>,
    <span class="p-locality">Manchester</span>,
    <div class="p-country-name">UK</div>
    <div class="p-category">Software Engineer</div>
  </div>
  `;
}

module.exports = SocialLinks;
