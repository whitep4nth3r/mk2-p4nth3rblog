import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

const accessTokenFetchUrl = `https://id.twitch.tv/oauth2/token?client_id=${Deno.env.get(
  "TWITCH_CLIENT_ID",
)}&client_secret=${Deno.env.get(
  "TWITCH_CLIENT_SECRET",
)}&grant_type=client_credentials&scope=user_read`;
const twitchId = "469006291";

let tokenInMemory = null;

const TwitchApi = {
  getAccessToken: async function () {
    try {
      const response = await fetch(accessTokenFetchUrl, {
        method: "POST",
        headers: { accept: "application/vnd.twitchtv.v5+json" },
      });
      const token = await response.json();
      tokenInMemory = token;

      return token;
    } catch (error) {
      console.log(error);
    }
  },
  getfetchOptions: function (tokenResponse) {
    return {
      headers: {
        "Client-Id": Deno.env.get("TWITCH_CLIENT_ID"),
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    };
  },
  getStreams: async function () {
    const tokenResponse = tokenInMemory !== null ? tokenInMemory : await TwitchApi.getAccessToken();
    if (tokenResponse.access_token) {
      const streamsResponse = await fetch(
        `https://api.twitch.tv/helix/streams?user_id=${twitchId}`,
        TwitchApi.getfetchOptions(tokenResponse),
      );

      if (streamsResponse.status !== 200) {
        return null;
      }

      const streams = await streamsResponse.json();
      return streams;
    }
  },
  getVods: async function () {
    const tokenResponse = tokenInMemory !== null ? tokenInMemory : await TwitchApi.getAccessToken();
    if (tokenResponse.access_token) {
      const vodsResponse = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${twitchId}&type=archive&first=1`,
        TwitchApi.getfetchOptions(tokenResponse),
      );

      if (vodsResponse.status !== 200) {
        return null;
      }

      const vods = await vodsResponse.json();
      return vods;
    }
  },
};

export default async (request, context) => {
  const response = await context.next();
  const imageSize = "998x556";

  const streams = await TwitchApi.getStreams();
  const vods = await TwitchApi.getVods();

  // if live!
  if (streams !== null && streams.data.length === 1) {
    const currentStream = streams.data[0];
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
  }

  // not live!
  if (vods !== null) {
    const latestVod = vods.data[0];

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

  // fallback!
  return new HTMLRewriter()
    .on("[data-twitchinfo-live]", {
      element(element) {
        element.setInnerContent("Follow on Twitch");
        element.setAttribute("class", "twitchInfo__live twitchInfo__live--offline");
      },
    })
    .transform(response);
};

export const config = {
  path: "/",
};
