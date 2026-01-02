const ContentfulApi = require("./contentfulApi.js");

const OpenGraph = {
  imgWidth: 1200,
  imgHeight: 630,
  /**
   * Encode characters for Cloudinary URL
   * Encodes some not allowed in Cloudinary parameter values twice:
   *   hash, comma, slash, question mark, backslash
   *   https://support.cloudinary.com/hc/en-us/articles/202521512-How-to-add-a-slash-character-or-any-other-special-characters-in-text-overlays-
   *
   * @param {string} text
   * @return {string}
   */
  cleanText: function (text) {
    return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, "%25$1");
  },
  generateImageAlt: function (pageTitle) {
    return `Salma Alam-Naylor, ${pageTitle}.`;
  },
  generateImageUrl: async function ({ title }) {
    const xBasePosition = 255;
    const baseTitleSize = 50;

    // if 8 words or fewer, increase font size
    const wordCount = title.match(/(\w+)/g).length;
    const sizeUp = wordCount <= 10 ? 10 : 0;

    const titleConfig = [
      `w_657`,
      "c_fit",
      "g_south_west",
      "co_rgb:ffffff",
      `x_${xBasePosition}`,
      `y_80`,
      `l_text:interblack.ttf_${baseTitleSize + sizeUp}:${OpenGraph.cleanText(`${title}`)}`,
    ].join(",");

    // configure social media image dimensions, quality, and format
    const imageConfig = [`w_${OpenGraph.imgWidth}`, `h_${OpenGraph.imgHeight}`, "c_fill", "q_auto", "f_auto"].join(",");

    // combine all the pieces required to generate a Cloudinary URL
    const urlParts = [
      "https://res.cloudinary.com",
      "whitep4nth3r",
      "image",
      "upload",
      imageConfig,
      // topicConfig.join("/"),
      titleConfig,
      "og_feb2025.png",
    ];

    // remove any falsy sections of the URL (e.g. an undefined version)
    const validParts = urlParts.filter(Boolean);

    // join all the parts into a valid URL to the generated image
    return validParts.join("/");
  },
};

module.exports = OpenGraph;
