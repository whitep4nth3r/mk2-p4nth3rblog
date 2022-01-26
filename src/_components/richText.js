const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const { BLOCKS, MARKS, INLINES } = require("@contentful/rich-text-types");

const Tools = require("../../lib/tools");
const ResponsiveImage = require("./responsiveImage");
const CodeBlock = require("./codeBlock");
const VideoEmbed = require("./videoEmbed");
const TweetEmbed = require("./tweetEmbed");
const BlogPostEmbed = require("./blogPostEmbed");

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
                INLINE LINK ICON
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
            return BlogPostEmbed({ post: entry });
          case "TweetEmbed":
            return TweetEmbed({ tweetUrl: entry.tweetUrl });
          case "VideoEmbed":
            return VideoEmbed({ embedUrl: entry.embedUrl, title: entry.title });
          case "CodeBlock":
            const { code } = entry;
            //TODO: TEMPORARY -- need to do Contentful migration here
            const lang = entry.language === "bash-shell" ? "bash" : entry.language;
            return CodeBlock({ code, lang });
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
          return ResponsiveImage({ image });
        }
      },
    },
  };
}

const defaultOptions = {
  renderNativeImg: false,
  renderH2Links: false,
};

function RichText(postBody, options = defaultOptions) {
  return `${documentToHtmlString(postBody.json, getRichTextRenderOptions(postBody.links, options))}`;
}

module.exports = RichText;
