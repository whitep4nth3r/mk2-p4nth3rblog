const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const { BLOCKS, MARKS, INLINES } = require("@contentful/rich-text-types");
const Tools = require("../../lib/tools");
const ResponsiveImage = require("../components/responsiveImage");
const ExternalUrl = require("../components/externalUrl");
const Topics = require("../components/topics");
const CodeBlock = require("../components/codeBlock");

function getRichTextRenderOptions(links, options) {
  const { renderH2Links, renderNativeImg } = options;

  const assetBlockMap = new Map(links?.assets?.block?.map((asset) => [asset.sys.id, asset]));

  const inlineEntryMap = new Map();
  const blockEntryMap = new Map();

  if (links?.entries.block) {
    for (const entry of links.entries.block) {
      blockEntryMap.set(entry.sys.id, entry);
    }
  }

  if (links?.entries.inline) {
    for (const entry of links.entries.inline) {
      inlineEntryMap.set(entry.sys.id, entry);
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => `<b>${text}</b>`,
      [MARKS.CODE]: (text) => `<code>${text}</code>`,
    },

    renderNode: {
      [INLINES.HYPERLINK]: (node, next) =>
        `<a href=${node.data.uri} target="_blank" rel="nofollow noreferrer">
          ${next(node.content)}
        </a>`,
      [INLINES.EMBEDDED_ENTRY]: (node, next) => {
        const entry = inlineEntryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "BlogPost":
            const { slug, title, featuredImage, excerpt } = entry;

            return `<a href="/blog/${slug}">{title}</a>`;
          default:
            return null;
        }
      },
      [BLOCKS.HR]: (text) => `<hr />`,
      [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node, next) => {
        if (renderH2Links) {
          return `<div id="${Tools.slugifyString(next(node.content))}">
              <h2>${next(node.content)}</h2>
              <a href="#${Tools.slugifyString(next(node.content))}" aria-label={next(node.content)}>
                LINK ICON
              </a>
            </div>`;
        } else {
          return `<h2>${next(node.content)}</h2>`;
        }
      },
      [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.QUOTE]: (node, next) => `<blockquote>${next(node.content)}</blockquote>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
        const entry = blockEntryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "BlogPost":
            return "***BLOG POST EMBED***";
          case "TweetEmbed":
            const { tweetId } = entry;

            return "***TWEET EMBED***";
          case "VideoEmbed":
            const { embedUrl, title } = entry;

            return "***VIDEO EMBED***";
          case "CodeBlock":
            //TEMPORARY
            const { code } = entry;
            const lang = entry.language === "bash-shell" ? "bash" : entry.language;
            return CodeBlock(code, lang);
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const image = assetBlockMap.get(node.data.target.sys.id);

        const { url, height, width, description } = image;

        if (renderNativeImg) {
          // Previously this was for RSS feed
          return `<div>
              <img src="${url}" alt="${description}" height="${height}" width="${width}" />
            </div>`;
        } else {
          return ResponsiveImage(image);
        }
      },
    },
  };
}

exports.data = {
  layout: "post.html",
  pagination: {
    data: "posts",
    alias: "post",
    size: 1,
  },
  permalink: (data) => {
    return `blog/${data.post.slug}/`; //we need this trailing slash?????
  },
  eleventyComputed: {
    title: (data) => data.post.title,
  },
};

exports.render = function (data) {
  const { post } = data;
  return `<div>
    <h1>${post.title}</h1>



    ${ExternalUrl(post.externalUrl || "")}

    ${Topics(post.topicsCollection.items)}

      <div>${documentToHtmlString(
        post.body.json,
        getRichTextRenderOptions(post.body.links, { renderH2Links: true }),
      )}</div>
  </div>`;
};
