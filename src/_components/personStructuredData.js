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
    sameAs: [
      "https://github.com/whitep4nth3r",
      "https://youtube.com/@whitep4nth3r",
      "https://www.linkedin.com/in/salma-alam-naylor/",
      "https://bsky.app/profile/whitep4nth3r.com",
    ],
    image: person.imageBio.url,
    name: person.name,
    description: md.plainText,
    jobTitle: "Head of Developer Education",
    worksFor: "Nordcraft",
  });
}

module.exports = PersonStructuredData;
