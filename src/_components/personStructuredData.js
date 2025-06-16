const MarkdownIt = require("markdown-it");
const plainText = require("markdown-it-plain-text");

function PersonStructuredData({ person }) {
  const md = new MarkdownIt();
  md.use(plainText);
  md.render(person.bioShort);

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Person",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whitep4nth3r.com/`,
    },
    brand: {
      slogan: "I write code for your entertainment.",
      "@type": "Brand",
      name: "whitep4nth3r",
    },
    image: person.imageBio.url,
    name: person.name,
    description: md.plainText,
    jobTitle: "Software Engineer and Developer Educator",
  });
}

module.exports = PersonStructuredData;
