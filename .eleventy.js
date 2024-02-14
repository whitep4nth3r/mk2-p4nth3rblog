// const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedTwitter = require("eleventy-plugin-embed-twitter");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  // eleventyConfig.on("eleventy.before", async () => {
  //   await require("esbuild").build({
  //     sourcemap: true, // Source map generation must be turned on
  //     plugins: [
  //       // Put the Sentry esbuild plugin after all other plugins
  //       sentryEsbuildPlugin({
  //         org: "the-claw",
  //         project: "mk2-p4nth3rblog",
  //         authToken: process.env.SENTRY_AUTH_TOKEN,
  //       }),
  //     ],
  //   });
  // });

  eleventyConfig.ignores.add("./src/_sass");
  eleventyConfig.ignores.add("./src/_scripts");

  eleventyConfig.addWatchTarget("./src/css");
  eleventyConfig.addPassthroughCopy({ "./src/_css/": "/css/" });
  eleventyConfig.addPassthroughCopy({ "./src/_fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/_public": "/" });
  eleventyConfig.addPassthroughCopy({
    "./src/_sentry/init.js": "/js/sentry_init.js",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/_search/app.js": "/js/app_search.js",
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

  return {
    dir: {
      data: "_data",
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
