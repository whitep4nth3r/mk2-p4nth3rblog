const Config = require("../../lib/config");

exports.data = {
  permalink: "/sitemap.xml",
  eleventyExcludeFromCollections: true,
};

function calculateDate(page) {
  const isTalk = page.data.talk !== undefined;
  const isBlogPost = page.data.post !== undefined;

  if (isTalk) {
    return page.data.talk.date;
  }

  if (isBlogPost) {
    const useThis = page.data.post.updatedDate || page.data.post.date;
    return useThis;
  }

  return page.date.toISOString();
}

function removeUrlParamsFromLink(url) {
  return url.split("?")[0];
}

function buildItems(items) {
  return `
    ${items
      .map((page) => {
        const date = calculateDate(page);
        const url = `https://${Config.site.domain}${page.url}`;

        return /*xml*/ `<url><loc>${removeUrlParamsFromLink(
          url,
        )}</loc><changefreq>daily</changefreq><lastmod>${date}</lastmod></url>`;
      })
      .join("")}
  `;
}

exports.render = (data) => {
  const { collections } = data;

  return `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">${buildItems(
    collections.all,
  )}</urlset>
`;
};
