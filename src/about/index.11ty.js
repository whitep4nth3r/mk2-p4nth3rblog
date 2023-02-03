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

const pageTitle = "About Salma Alam-Naylor: software engineer, writer and live streamer";

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
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "Salma helps developers build stuff, learn things and love what they do. She works at Netlify, streams coding on Twitch, and loves helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/about/",
};

exports.render = function (data) {
  const { person, events } = data;

  return /* html */ `
    <div class="page__index">
      <div class="page__header">
        <h1 class="page__headerTitle">All about <span class="colorHighlight">me</span></h1>
      </div>

      <div class="twoColumn">
        <aside class="twoColumn__aside">
          <div class="twoColumn__asideStickyGroup">
            ${AboutTableOfContents()}
          </div>
        </aside>

        <div class="twoColumn__content">
          <div>
            <aside class="twoColumn__inlineAside">
              ${AboutTableOfContents()}
            </aside>

            <div id="bio" class="about__me">
              <div class="about__meFace">
                ${BioImage({ image: person.data.imageBio })}
              </div>

              <div class="about__meBio">
                ${TabbedBio({
                  shortBio: md.render(person.data.bioShort),
                  speakerBio: md.render(person.data.bioSpeaker),
                  longBio: RichText(person.data.bioLong),
                })}
                
                ${AboutSocialLinks()}
              </div>
              
            </div>
          </div>
          
          <section id="events" class="about__events">
            <div class="about__eventsHeader">
              <h2 class="about__eventsHeaderTitle">Events and <span class="colorHighlight">live streams</span></h2>
            </div>
            
              <ol class="about__eventsList">
                ${events.list
                  .map(
                    (event) => /*html*/ `
                  <li class="about__eventsListItem" event-date="${event.date}">
                    <time datetime="${event.date}" class="about__eventsListItemDate">
                      <span class="about__eventsListItemDate__month">
                        ${DateUtils.getMonthFromTime(event.date)}
                      </span>
                      <span class="about__eventsListItemDate__day">
                        ${DateUtils.getDateFromTime(event.date)}
                      </span>
                    </time>
                    <span class="about__eventsListItemTime">
                      <span class="about__eventsListItemTimeInner">
                        ${ClockIcon()}  
                        <span data-time="${event.date}">
                          ${event.date}
                        </span>
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
                      event.description
                        ? `<p class="about__eventsListshortDescription">${event.description}</p>`
                        : ""
                    }
                    ${
                      event.canceled_until === null && event.link
                        ? `
                    <a href="${
                      event.link
                    }" class="about__eventsListItemCta" target="_blank" rel="nofollow noreferrer">${calculateIcon(
                            event.type,
                          )} Go to <span class="about__eventsListItemCta--sr">${
                            event.name
                          }</span> event</a>`
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
    </div>
  `;
};
