import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      eleventyConfig.addFilter("getRandomTwitchClip", (arr) => {
        // return random Twitch clip created after March 2021
        const validClips = arr
          .sort(() => {
            return 0.5 - Math.random();
          })
          .filter((clip) => {
            return clip.created_at > "2021-03-01T00:00:00Z";
          });

        return validClips.slice(0, 1)[0];
      });
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
