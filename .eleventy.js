const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedTwitter = require("eleventy-plugin-embed-twitter");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("./src/_sass");
  eleventyConfig.ignores.add("./src/_scripts");

  eleventyConfig.addWatchTarget("./src/css");
  eleventyConfig.addPassthroughCopy({ "./src/_css/": "/css/" });
  eleventyConfig.addPassthroughCopy({ "./src/_public": "/" });
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/app_search.js": "/js/app_search.js",
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedTwitter, {
    theme: "light",
    align: "center",
    doNotTrack: "true",
  });

  eleventyConfig.addPlugin(embedYouTube, {
    lite: true,
  });

  eleventyConfig.ignores.add("./src/_archive");

  // 1. You attempted to set one of Eleventy’s reserved data property names: content. You can opt-out of this behavior with `eleventyConfig.setFreezeReservedData(false)` or rename/remove the property in your data cascade that conflicts with Eleventy’s reserved property names (e.g. `eleventy`, `pkg`, and others). Learn more: https://v3.11ty.dev/docs/data-eleventy-supplied/ (via EleventyBaseError)
  eleventyConfig.setFreezeReservedData(false);

  return {
    dir: {
      data: "_data",
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
