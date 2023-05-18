const ClockIcon = require("../_components/svg/clockIcon");
const TwitchIcon = require("../_components/svg/twitchIcon");
const YouTubeIcon = require("../_components/svg/youtubeIcon");
const DateUtils = require("../../lib/dateUtils");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Upcoming Events and Live Streams";

function calculateIcon(type) {
  switch (type) {
    case "twitch":
      return TwitchIcon();
    case "youtube":
      return YouTubeIcon();
    default:
      return "";
  }
}

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "events",
  metaDescription: "View Salma's Twitch, live events and conference schedule.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/events/",
};

exports.render = function (data) {
  const { events } = data;

  return /* html */ `
    <section class="events">
      <h1 class="page__headerTitle">Upcoming Events and Live Streams</h1>
      
      <ol class="events__list">
        ${events.list
          .map(
            (event) => /*html*/ `
          <li class="events__listItem" data-event-date="${event.date}">
            <time datetime="${event.date}" class="events__listItemDate">
              <span class="events__listItemDate__month">
                ${DateUtils.getMonthFromTime(event.date)}
              </span>
              <span class="events__listItemDate__day">
                ${DateUtils.getDateFromTime(event.date)}
              </span>
            </time>
            <span class="events__listItemTime">
              <span class="events__listItemTimeInner">
                ${ClockIcon()}  
                <span data-time="${event.date}">
                  ${event.date}
                </span>
              </span>
              <span class="events__listItemTZ" data-timezone></span>
              ${
                event.canceled_until !== null
                  ? `<span class="events__listItemCancelled">CANCELLED</span>`
                  : ""
              }
            </span>
            <span class="events__listItemName">${event.name}</span>
            ${
              event.description
                ? `<p class="events__listshortDescription">${event.description}</p>`
                : ""
            }
            ${
              event.canceled_until === null && event.link
                ? `
            <a href="${
              event.link
            }" class="events__listItemCta" target="_blank" rel="nofollow noreferrer">${calculateIcon(
                    event.type,
                  )} Go to <span class="events__listItemCta--sr">${event.name}</span> event</a>`
                : ""
            }
          </li>
        `,
          )
          .join("")}
      </ol>
      <a href="https://www.twitch.tv/whitep4nth3r/schedule" class="events__listItemCta events__listItemCta--centered">View full Twitch schedule</a>
    </section>
  `;
};
