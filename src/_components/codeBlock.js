const HighlightPairedShortcode = require("@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode");

const CodeBlock = ({ code, lang, isDiff }) => {
  const prefix = isDiff ? "diff-" : "";
  return `<div class="post__codeBlock">${HighlightPairedShortcode(code, `${prefix}${lang}`)}</div>`;
};

module.exports = CodeBlock;
