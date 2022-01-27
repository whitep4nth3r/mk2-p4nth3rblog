const HighlightPairedShortcode = require("@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode");

const CodeBlock = ({ code, lang }) => {
  const highlightedCode = HighlightPairedShortcode(code, lang);
  return `<div class="post__codeBlock">${HighlightPairedShortcode(code, lang)}</div>`;
};

module.exports = CodeBlock;
