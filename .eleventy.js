const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("./src/_sass");
  eleventyConfig.ignores.add("./src/_scripts");

  eleventyConfig.addWatchTarget("./src/css");
  eleventyConfig.addPassthroughCopy({ "./src/_css/": "/css/" });
  eleventyConfig.addPassthroughCopy({ "./src/_public": "/" });
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/copy_code.js": "/js/copy_code.js",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/bsky.js": "/js/bsky.js",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/home.js": "/js/home.js",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/_client_scripts/blog.js": "/js/blog.js",
  });
  eleventyConfig.addPlugin(syntaxHighlight);

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
