const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedTwitter = require("eleventy-plugin-embed-twitter");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("./src/sass");
  eleventyConfig.ignores.add("./src/css/main.css.map");
  eleventyConfig.ignores.add("./src/scripts");

  eleventyConfig.addWatchTarget("./src/_css");
  eleventyConfig.addPassthroughCopy({ "./src/_css": "./src/css" });

  eleventyConfig.addPassthroughCopy({ "./src/_fonts": "./src/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/_public": "/" });

  eleventyConfig.addPassthroughCopy({ "./src/_search/app.js": "/js/app_search.js" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/@github/time-elements/dist/index.js": "js/time_elements.js" });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(embedTwitter, {
    theme: "dark",
    align: "center",
    doNotTrack: "true",
  });

  eleventyConfig.addPlugin(embedYouTube, {
    lite: true,
  });

  return {
    dir: {
      data: "_data",
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
