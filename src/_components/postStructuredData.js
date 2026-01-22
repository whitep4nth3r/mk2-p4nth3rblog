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
      knowsAbout: [
        "Frontend Web Development",
        "HTML/CSS",
        "Web Accessibility",
        "CSS Architecture",
        "Front end frameworks",
        "Vanilla JavaScript",
        "Developer Experience (DX)",
        "Developer Education",
        "Developer Advocacy",
        "Technical communication",
        "Career mentorship",
        "Creative Coding",
        "Entertainment as Code",
        "Music performance and education",
      ],
      sameAs: [
        "https://github.com/whitep4nth3r",
        "https://youtube.com/@whitep4nth3r",
        "https://www.linkedin.com/in/salma-alam-naylor/",
        "https://bsky.app/profile/whitep4nth3r.com",
      ],
      image: post.author.imageBio.url,
      name: "Salma Alam-Naylor",
      alternateName: "whitep4nth3r",
      description:
        "Expert in frontend engineering, accessibility, and 'Entertainment as Code'. Known for building resilient, creative web platforms and leading developer education strategy.",
      jobTitle: "Head of Developer Education",
      worksFor: {
        "@type": "Organization",
        name: "Nordcraft",
        url: "https://nordcraft.com",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Head of Developer Education",
      },
    },
  });
}

module.exports = PostStructuredData;
