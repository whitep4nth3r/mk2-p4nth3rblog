function PostStructuredData({ post, imageUrl, authorBio }) {
  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whitep4nth3r.com/blog/${post.slug}`,
    },
    headline: post.title,
    image: [imageUrl],
    dateCreated: post.date,
    description: post.excerpt,
    keywords: post.topicsCollection.items.map((topic) => topic.name).join(","),
    author: {
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
      image: post.author.imageBio.url,
      name: "Salma Alam-Naylor",
      description: authorBio,
      jobTitle: "Head of Developer Education",
      worksFor: "Nordcraft",
    },
  });
}

module.exports = PostStructuredData;
