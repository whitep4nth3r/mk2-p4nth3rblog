const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const { BLOCKS, MARKS, INLINES } = require("@contentful/rich-text-types");

const Config = require("../../lib/config");
const Tools = require("../../lib/tools");
const ResponsiveImage = require("./responsiveImage");
const Callout = require("./callout");
const CodeBlock = require("./codeBlock");
const VideoEmbed = require("./videoEmbed");
const ArcadeEmbed = require("./arcadeEmbed");
const CodePenEmbed = require("./codepenEmbed");
const BlogPostEmbed = require("./blogPostEmbed");
const LighthouseComparison = require("./lighthouseComparison");
const DeployToNetlifyButton = require("./deployToNetlifyButton");

function stripParaTags(string) {
  return string.replace(/(<p[^>]+?>|<p>|<\/p>)/gi, "");
}

function getRichTextRenderOptions(links, options) {
  const { absoluteUrls, renderHeadingLinks, renderRssFriendlyImg } = options;

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
      [MARKS.BOLD]: (text) => `<b class="post__p--bold">${text}</b>`,
      [MARKS.ITALIC]: (text) => `<b class="post__p--italic">${text}</b>`,
      [MARKS.CODE]: (text) => `<code>${text}</code>`,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, next) => {
        const openInNewWindow = node.data.uri.includes("https://") ? `target="_blank"` : "";
        return `<a href="${node.data.uri}" ${openInNewWindow}>${next(node.content)}</a>`;
      },
      [INLINES.EMBEDDED_ENTRY]: (node, next) => {
        const entry = inlineEntryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "BlogPost":
            const { slug, title } = entry;
            const prefix = absoluteUrls ? `https://${Config.site.domain}` : "";

            return `<a href="${prefix}/blog/${slug}/">${title}</a>`;
          default:
            return null;
        }
      },
      [BLOCKS.TABLE]: (node, next) => `<div class="post__tableWrapper"><table class="post__table">
        <tbody>${next(node.content)}</tbody>
      </table></div>`,
      [BLOCKS.TABLE_HEADER_CELL]: (node, next) =>
        `<th class="post__tableHeader">${stripParaTags(next(node.content))}</th>`,
      [BLOCKS.TABLE_ROW]: (node, next) => `<tr class="post__tableRow">${next(node.content)}</tr>`,
      [BLOCKS.TABLE_CELL]: (node, next) => `<td class="post__tableCell">${stripParaTags(next(node.content))}</td>`,
      [BLOCKS.HR]: (text) => `<hr class="post__hr" />`,
      [BLOCKS.HEADING_1]: (node, next) => `<h1 class="post__h1">${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node, next) => {
        if (renderHeadingLinks) {
          return /*html*/ `
            <a href="#${Tools.slugifyString(next(node.content))}" id="${Tools.slugifyString(
            next(node.content),
          )}" class="post__linkedHeading">
              <h2 class="post__h2">${next(node.content)}</h2>
            </a>`;
        } else {
          return `<h2 class="post__h2">${next(node.content)}</h2>`;
        }
      },
      [BLOCKS.HEADING_3]: (node, next) => {
        if (renderHeadingLinks) {
          return /*html*/ `
          <a href="#${Tools.slugifyString(next(node.content))}" id="${Tools.slugifyString(
            next(node.content),
          )}" class="post__linkedHeading">
            <h3 class="post__h3">${next(node.content)}</h3>
          </a>`;
        } else {
          return `<h3 class="post__h3">${next(node.content)}</h3>`;
        }
      },
      [BLOCKS.HEADING_4]: (node, next) => `<h4 class="post__h4">${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node, next) => `<h5 class="post__h5">${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node, next) => `<h6 class="post__h6">${next(node.content)}</h6>`,
      [BLOCKS.PARAGRAPH]: (node, next) => `<p class="post__p">${next(node.content)}</p>`,
      [BLOCKS.QUOTE]: (node, next) => `<blockquote class="post__blockquote">${next(node.content)}</blockquote>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
        const entry = blockEntryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "DeployToNetlifyButton":
            return DeployToNetlifyButton({
              title: entry.title,
              deployUrl: entry.deployUrl,
            });
          case "CodePenEmbed":
            return CodePenEmbed({
              embedCode: entry.embedCode,
              title: entry.title,
            });
          case "BlogPost":
            return BlogPostEmbed({ post: entry });
          case "LighthouseComparison":
            return LighthouseComparison({
              beforeScore: entry.beforeScore,
              afterScore: entry.afterScore,
              url: entry.url,
              metric: entry.metric,
              device: entry.device,
            });
          case "VideoEmbed":
            return VideoEmbed({ embedUrl: entry.embedUrl, title: entry.title });
          case "ArcadeEmbed":
            return ArcadeEmbed({
              embedCode: entry.embedCode,
              title: entry.title,
            });
          case "Callout":
            return Callout({
              title: entry.title,
              content: entry.content,
              emoji: entry.emoji,
            });
          case "CodeBlock":
            return CodeBlock({
              code: entry.code,
              lang: entry.language,
              isDiff: entry.isDiff,
            });
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const image = assetBlockMap.get(node.data.target.sys.id);

        const { url, height, width, description } = image;

        if (renderRssFriendlyImg) {
          // One image only for RSS feed
          return `<img src="${url}" alt="${description}" height="${height}" width="${width}" />`;
        } else {
          return `<div class="post__responsiveImage">${ResponsiveImage({
            image,
          })}</div>`;
        }
      },
    },
  };
}

const defaultOptions = {
  absoluteUrls: false,
  renderRssFriendlyImg: false,
  renderHeadingLinks: false,
};

function RichText(postBody, options = defaultOptions) {
  return `${documentToHtmlString(postBody.json, getRichTextRenderOptions(postBody.links, options))}`;
}

module.exports = RichText;
