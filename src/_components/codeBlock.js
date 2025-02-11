const HighlightPairedShortcode = require("@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode");

function makeId(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const CodeBlock = ({ code, lang, isDiff }) => {
  const prefix = isDiff ? "diff-" : "";
  const thisCodeId = makeId(10);
  return /* html */ `
  <div class="post__codeBlock">
    <div class="post__codeBlockBar">
      <span class="post__codeBlockDots">
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#f0047f" stroke="#f0047f" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#fc814a" stroke="#fc814a" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#a6e22e" stroke="#a6e22e" stroke-width=".5"></circle></g></svg>
      </span>
      <button type="button" class="post__codeBlockCopyButton" data-copy="${thisCodeId}">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 384 512"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" fill="currentColor" /></svg>
      <span>
        Copy
      </span>
      </button>
    </div>
    <div data-code-block itemscope itemtype="https://schema.org/SoftwareSourceCode">
      <meta itemprop="codeSampleType" content="snippet">
      <meta itemprop="programmingLanguage" content="${lang}">
      <meta data-code-id="${thisCodeId}" itemprop="text" content="${encodeURIComponent(code)}">
      ${HighlightPairedShortcode(code, `${prefix}${lang}`)}
    </div>
  </div>

  `;
};

module.exports = CodeBlock;
