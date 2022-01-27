const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const { BLOCKS, INLINES } = require("@contentful/rich-text-types");
const Tools = require("../../lib/tools");

const makeList = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => "",
    [BLOCKS.HEADING_1]: (node, next) => "",
    [BLOCKS.HEADING_2]: (node, next) => `
      <li class="tableOfContents__item">
        <a href="#${Tools.slugifyString(next(node.content))}" class="tableOfContents__itemLink"
        aria-label="${next(node.content)}">${next(node.content)}</a>
      </li>
      `,
    [BLOCKS.HEADING_3]: (node, next) =>
      `<li class="tableOfContents__item tableOfContents__item--nudged">
        <a href="#${Tools.slugifyString(next(node.content))}" class="tableOfContents__itemLink" 
        aria-label="${next(node.content)}">${next(node.content)}</a>
      </li>
      `,
    [BLOCKS.HEADING_4]: (node, next) => "",
    [BLOCKS.HEADING_5]: (node, next) => "",
    [BLOCKS.HEADING_6]: (node, next) => "",
    [BLOCKS.UL_LIST]: (node, next) => "",
    [BLOCKS.OL_LIST]: (node, next) => "",
    [BLOCKS.LIST_ITEM]: (node, next) => "",
    [BLOCKS.QUOTE]: (node, next) => "",
    [BLOCKS.HR]: (node, next) => "",
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => "",
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => "",
    [INLINES.EMBEDDED_ENTRY]: (node, next) => "",
    [INLINES.HYPERLINK]: (node, next) => "",
    [INLINES.ENTRY_HYPERLINK]: (node, next) => "",
    [INLINES.ASSET_HYPERLINK]: (node, next) => "",
  },
};

function TableOfContents(postBody) {
  return `
  <details open>
    <summary class="tableOfContents__header">Table of contents</summary>
    <ol class="tableOfContents">
      ${documentToHtmlString(postBody.json, makeList)}
    </ol>
  </details>
  `;
}

module.exports = TableOfContents;
