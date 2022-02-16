function PostStructuredData({ post, imageUrl }) {
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
      "@type": "Person",
      name: post.author.name,
      description: post.author.bioShort,
      image: post.author.imageBio.url,
      url: "https://whitep4nth3r.com",
    },
  });
}

module.exports = PostStructuredData;
