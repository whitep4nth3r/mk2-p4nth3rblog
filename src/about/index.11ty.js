const RichText = require("../_components/richText");
const BioImage = require("../_components/bioImage");
const AboutTableOfContents = require("../_components/aboutTableOfContents");
const AboutSocialLinks = require("../_components/aboutSocialLinks");
const TwitchIcon = require("../_components/svg/twitchIcon");
const TabbedBio = require("../_components/tabbedBio");
const YoutubeIcon = require("../_components/svg/youtubeColor");
const ClockIcon = require("../_components/svg/clockIcon");
const DateUtils = require("../../lib/dateUtils");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "About whitep4nth3r — biographies, events, links and more.";

var md = require("markdown-it")({
  html: true,
});

function calculateIcon(type) {
  switch (type) {
    case "twitch":
      return TwitchIcon();
    case "youtube":
      return YoutubeIcon();
    default:
      return "";
  }
}

exports.data = {
  layout: "base.njk",
  title: pageTitle,
  metaDescription:
    "whitep4nth3r helps developers build stuff, learn things and love what they do. She currently works at Netlify, streams live coding on Twitch, and loves helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  openGraphUrl: "https://whitep4nth3r.com/about/",
};

exports.render = function (data) {
  const { person, events } = data;

  return /* html */ `
      <div class="twoColumnWide__header">
        <h1 class="twoColumnWide__headerTitle">love <span class="colorHighlight">what you do</span></h1>
      </div>

      <div class="twoColumnWide__container">

        <aside class="twoColumnWide__aside">
          <div class="twoColumnWide__asideStickyGroup">
            ${AboutTableOfContents()}
          </div>
        </aside>

        <div class="twoColumnWide__content">

          <section>
            <aside class="twoColumnWide__inlineAside">
              ${AboutTableOfContents()}
            </aside>

            <div id="bio" class="about__me">

              <div class="about__meFace">
                ${BioImage({ image: person.imageBio })}
              </div>

              <div class="about__meBio">
                ${TabbedBio({
                  shortBio: md.render(person.bioShort),
                  speakerBio: md.render(person.bioSpeaker),
                  longBio: RichText(person.bioLong),
                })}
              </div>

              <div>
          </section>
          
          <section>
            ${AboutSocialLinks()}
          </section>

          <section id="events" class="about__events">
            <div class="about__eventsHeader">
              <h2 class="about__eventsHeaderTitle">events <span class="colorHighlight">and talks</span></h2>
            </div>
            

              <ol class="about__eventsList">
                ${events
                  .map(
                    (event) => /*html*/ `
                  <li class="about__eventsListItem">
                    <time datetime="${event.date}" class="about__eventsListItemDate">
                      <span class="about__eventsListItemDate__month">
                        <local-time 
                          datetime="${event.date}"
                          month="short">
                          ${DateUtils.getMonthFromTime(event.date)}
                        </local-time>
                      </span>
                      <span class="about__eventsListItemDate__day">
                        <local-time 
                          datetime="${event.date}"
                          day="numeric">
                          ${DateUtils.getDateFromTime(event.date)}
                        </local-time>
                      </span>
                    </time>
                    <span class="about__eventsListItemTime">
                      <span class="about__eventsListItemTimeInner">
                        ${ClockIcon()}  
                        <local-time 
                          datetime="${event.date}"
                          weekday="short"
                          month="short"
                          day="numeric"
                          year="numeric"
                          hour="numeric"
                          minute="numeric"
                          time-zone-name="short">
                        ${event.date}
                        </local-time>
                      </span>
                      <span class="about__eventsListItemTZ" data-timezone></span>
                      ${
                        event.canceled_until !== null
                          ? `<span class="about__eventsListItemCancelled">CANCELLED</span>`
                          : ""
                      }
                    </span>
                    <span class="about__eventsListItemName">${event.name}</span>
                    ${
                      event.canceled_until === null && event.link
                        ? `
                    <a href="${
                      event.link
                    }" class="about__eventsListItemCta" target="_blank" rel="nofollow noreferrer">${calculateIcon(
                            event.type,
                          )} Go to <span class="about__eventsListItemCta--sr">${
                            event.name
                          }</span> event <span role="presentation">→</span></a>`
                        : ""
                    }
                  </li>
                `,
                  )
                  .join("")}
              </ol>
          </section>
        </div>
      </div>
      <script type="module" src="/js/time_elements.js"></script>
  `;
};
