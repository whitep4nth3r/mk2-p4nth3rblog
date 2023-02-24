import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  const response = await context.next();
  const data = await fetch(`${Deno.env.get("DOMAIN")}/api/twitch`).then((res) => res.json());

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
          const thumb_url = currentStream.thumbnail_url.replace("{width}x{height}", "1920x1080");
          element.setAttribute("src", thumb_url);
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
          element.setAttribute("class", "twitchInfo__live--offline");
        },
      })
      .on("[data-twitchinfo-thumbnail]", {
        element(element) {
          const thumb_url = latestVod.thumbnail_url.replace("%{width}x%{height}", "1920x1080");
          element.setAttribute("src", thumb_url);
        },
      })
      .transform(response);
  }
};
