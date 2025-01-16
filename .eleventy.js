const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
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
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/copy_code.js": "/js/copy_code.js",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/bsky_post_likes.js": "/js/bsky_post_likes.js",
  });
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(embedYouTube, {
    lite: true,
  });

  eleventyConfig.ignores.add("./src/_archive");

  return {
    dir: {
      data: "_data",
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
