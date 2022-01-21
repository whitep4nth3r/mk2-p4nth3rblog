const HighlightPairedShortcode = require("@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode");

const CodeBlock = (code, lang) => {
  const highlightedCode = HighlightPairedShortcode(code, lang);
  return highlightedCode;
};

module.exports = CodeBlock;
