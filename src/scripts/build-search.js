const dotenv = require("dotenv");
const fetch = require("node-fetch");
const algoliasearch = require("algoliasearch/lite");
const richTextPlainTextRenderer = require("@contentful/rich-text-plain-text-renderer");

async function callContentful(query, variables) {
  try {
    const data = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      },
    ).then((response) => response.json());
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getPaginatedPosts(page) {
  const queryLimit = 9;
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

  const variables = { limit: queryLimit, skip };

  const query = `query GetPaginatedPosts($limit: Int!, $skip: Int!) {
      blogPostCollection(limit: $limit, skip: $skip, order: date_DESC) {
        total
        items {
          sys {
            id
          }
          title
          excerpt
          slug
          date
          readingTime
          topicsCollection {
            items {
              sys {
                id
              }
              name
              slug
              icon {
                url
                description
              }
            }
          }
          body {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on CodeBlock {
                    code
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const response = await callContentful(query, variables);

  const { total } = response.data.blogPostCollection;
  const posts = response.data.blogPostCollection.items
    ? response.data.blogPostCollection.items
    : [];

  return { posts, total };
}

async function getAllPosts() {
  let page = 1;
  let shouldQueryMorePosts = true;
  const returnPosts = [];

  while (shouldQueryMorePosts) {
    const response = await getPaginatedPosts(page);

    if (response.posts.length > 0) {
      returnPosts.push(...response.posts);
    }

    shouldQueryMorePosts = returnPosts.length < response.total;
    page++;
  }

  return returnPosts;
}

function transformCodeBlocks(codeBlocks) {
  return codeBlocks.map((block) => {
    return block.code;
  });
}

function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post.sys.id,
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      topicsCollection: { items: post.topicsCollection.items },
      date: post.date,
      readingTime: post.readingTime,
      body: richTextPlainTextRenderer.documentToPlainTextString(post.body.json),
      codeBlocks: transformCodeBlocks(post.body.links?.entries?.block),
    };
  });

  return transformed;
}

async function getPaginatedTalks(page) {
  const queryLimit = 10;
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

  const variables = { limit: queryLimit, skip };

  const query = `query GetPaginatedTalks($limit: Int!, $skip: Int!) {
      talkCollection(limit: $limit, skip: $skip, order: date_DESC) {
        total
        items {
          sys {
            id
          }
          title
          excerpt
          slug
          date
          watchTime
          topicsCollection {
            items {
              sys {
                id
              }
              name
              slug
              icon {
                url
                description
              }
            }
          }
          transcript {
            json
          }
        }
      }
    }`;

  const response = await callContentful(query, variables);

  const { total } = response.data.talkCollection;
  const talks = response.data.talkCollection.items
    ? response.data.talkCollection.items
    : [];

  return { talks, total };
}

async function getAllTalks() {
  let page = 1;
  let shouldQueryMoreTalks = true;
  const returnTalks = [];

  while (shouldQueryMoreTalks) {
    const response = await getPaginatedTalks(page);

    if (response.talks.length > 0) {
      returnTalks.push(...response.talks);
    }

    shouldQueryMoreTalks = returnTalks.length < response.total;
    page++;
  }

  return returnTalks;
}

function transformTalksToSearchObjects(talks) {
  const transformed = talks.map((talk) => {
    return {
      objectID: talk.sys.id,
      title: talk.title,
      excerpt: talk.excerpt,
      slug: talk.slug,
      topicsCollection: { items: talk.topicsCollection.items },
      date: talk.date,
      watchTime: talk.watchTime,
      body: richTextPlainTextRenderer.documentToPlainTextString(
        talk.transcript.json,
      ),
    };
  });

  return transformed;
}

(async function () {
  dotenv.config();

  try {
    const posts = await getAllPosts();
    const talks = await getAllTalks();
    const transformedPosts = transformPostsToSearchObjects(posts);
    const transformedTalks = transformTalksToSearchObjects(talks);
    const transformed = transformedPosts.concat(transformedTalks);

    if (posts.length > 0) {
      const client = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_ADMIN_KEY,
      );

      const index = client.initIndex("p4nth3rblog");
      const algoliaResponse = await index.saveObjects(transformed);

      console.log(
        `🎉 Sucessfully added ${
          algoliaResponse.objectIDs.length
        } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
          "\n",
        )}`,
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
