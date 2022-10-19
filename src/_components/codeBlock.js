const HighlightPairedShortcode = require("@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode");

const CodeBlock = ({ code, lang }) => {
  return `<div class="post__codeBlock">${HighlightPairedShortcode(code, `diff-${lang}`)}</div>`;
};

module.exports = CodeBlock;
