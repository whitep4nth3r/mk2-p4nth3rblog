import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  const response = await context.next();
  const imageSize = "998x556";

  const twitchRes = await fetch(`${Deno.env.get("DOMAIN")}/api/twitch`);
  const data = await twitchRes.json();

  if (twitchRes.status !== 200) {
    return new HTMLRewriter()
      .on("[data-twitchinfo-live]", {
        element(element) {
          element.setInnerContent("Follow on Twitch");
          element.setAttribute("class", "twitchInfo__live twitchInfo__live--offline");
        },
      })
      .transform(response);
  }

  if (data.isLive) {
    // rewrite HTML using data.streams
    const currentStream = data.streams.data[0];
    return new HTMLRewriter()
      .on("[data-twitchinfo-title]", {
        element(element) {
          element.setInnerContent(currentStream.title);
        },
      })
      .on("[data-twitchinfo-thumbnail]", {
        element(element) {
          const thumb_url = currentStream.thumbnail_url.replace("{width}x{height}", imageSize);
          element.setAttribute("src", thumb_url);
          element.removeAttribute("class");
          element.setAttribute("class", "twitchInfo__thumbnail twitchInfo__thumbnail--live");
        },
      })
      .transform(response);
  } else {
    //rewrite HTML using data.latestVod data
    const { latestVod } = data;

    return new HTMLRewriter()
      .on("[data-twitchinfo-live]", {
        element(element) {
          const today = new Date();
          const createdOn = new Date(latestVod.created_at);
          const msInDay = 24 * 60 * 60 * 1000;

          createdOn.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          const diff = (+today - +createdOn) / msInDay;
          let text;

          if (diff === 0) {
            text = "Earlier today";
          } else if (diff === 1) {
            text = "Yesterday";
          } else {
            text = `${diff} days ago`;
          }

          element.setInnerContent(text);
          element.setAttribute("class", "twitchInfo__live twitchInfo__live--offline");
        },
      })
      .on("[data-twitchinfo-link]", {
        element(element) {
          element.setAttribute("href", latestVod.url);
        },
      })
      .on("[data-twitchinfo-title]", {
        element(element) {
          element.setInnerContent(latestVod.title);
        },
      })
      .on("[data-twitchinfo-thumbnail]", {
        element(element) {
          //https://vod-secure.twitch.tv/_404/404_processing_%{width}x%{height}.png
          if (!latestVod.thumbnail_url.includes("processing")) {
            const thumb_url = latestVod.thumbnail_url.replace("%{width}x%{height}", imageSize);
            element.setAttribute("src", thumb_url);
          }
        },
      })
      .transform(response);
  }
};

export const config = {
  path: "/",
};
