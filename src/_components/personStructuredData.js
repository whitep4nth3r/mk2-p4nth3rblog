function PersonStructuredData({ person }) {
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Person",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whitep4nth3r.com/`,
    },
    brand: "whitep4nth3r",
    image: person.imageBio.url,
    name: person.name,
    description: person.bioShort,
    jobTitle: "Software Engineer and Developer Educator",
  });
}

module.exports = PersonStructuredData;
