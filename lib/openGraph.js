const ContentfulApi = require("./contentfulApi.js");

async function getTopics() {
  const query = `
    {
      topicCollection(order: name_ASC) {
        items {
          sys {
            id
          }
          slug
          name
          icon {
            description
            url
          }
        }
      }
    }
    `;

  const response = await ContentfulApi.callContentful(query);

  const topics = response.data.topicCollection.items ? response.data.topicCollection.items : [];

  return topics;
}

const OpenGraph = {
  imgWidth: 1140,
  imgHeight: 600,
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
    return `An image with dark background featuring a large panther on the left. The title — ${pageTitle} — is in white text at the centre, and below are icons representing the topics of the shared page.`;
  },
  generateImageUrl: async function ({ title, topics }) {
    let fallbackTopics = [];
    const selectedFallbackTopics = ["javascript", "webdev", "snippets", "css", "streaming"];

    if (!topics) {
      const globalTopics = await getTopics();
      fallbackTopics = globalTopics.filter((topic) => selectedFallbackTopics.includes(topic.slug));
    }

    const xBasePosition = 270;

    const baseTitleSize = 45;

    // if 8 words or fewer, increase font size
    const wordCount = title.match(/(\w+)/g).length;
    const sizeUp = wordCount <= 8 ? 15 : 0;

    const titleConfig = [
      `w_657`,
      "c_fit",
      "g_south_west",
      "co_rgb:ffffff",
      `x_${xBasePosition}`,
      `y_80`,
      `l_text:worksansbold.ttf_${baseTitleSize + sizeUp}:${OpenGraph.cleanText(`${title}`)}`,
    ].join(",");

    const topicConfig = [];
    const topicIconSize = 38;
    const topicGutter = 20;

    const topicImageUrls = topics
      ? topics?.map((topic) => topic.icon.url)
      : fallbackTopics.map((topic) => topic.icon.url);

    for (let i = 0; i < topicImageUrls.length; i++) {
      if (topicImageUrls[i] !== undefined) {
        const xPos = i === 0 ? xBasePosition : xBasePosition + i * (topicGutter + topicIconSize);

        let base64 = Buffer.from(topicImageUrls[i]).toString("base64");
        let transformations = [`w_${topicIconSize}`, `h_${topicIconSize}`, "c_fit"].join(",");
        let placementQuals = ["g_west", `x_${xPos + 175}`, `y_-100`].join(",");
        topicConfig.push(`l_fetch:${base64}/${transformations}/fl_layer_apply,${placementQuals}`);
      }
    }

    // configure social media image dimensions, quality, and format
    const imageConfig = [`w_${OpenGraph.imgWidth}`, `h_${OpenGraph.imgHeight}`, "c_fill", "q_auto", "f_auto"].join(",");

    // combine all the pieces required to generate a Cloudinary URL
    const urlParts = [
      "https://res.cloudinary.com",
      "whitep4nth3r",
      "image",
      "upload",
      imageConfig,
      topicConfig.join("/"),
      titleConfig,
      "p4nth3rblog_og2.png",
    ];

    // remove any falsy sections of the URL (e.g. an undefined version)
    const validParts = urlParts.filter(Boolean);

    // join all the parts into a valid URL to the generated image
    return validParts.join("/");
  },
};

module.exports = OpenGraph;
