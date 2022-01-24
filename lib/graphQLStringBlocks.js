const GraphQLStringBlocks = {
  blogPost: function () {
    return `
    ... on BlogPost {
      sys {
        id
      }
      date
      updatedDate
      title
      slug
      excerpt
      readingTime
      ${GraphQLStringBlocks.featuredImage()}
      ${GraphQLStringBlocks.topicsCollection()}
    }
  `;
  },
  topicsCollection: function () {
    return `
      topicsCollection {
        items {
          sys {
            id  
          }
          name
          slug
          icon {
            description
            url
          }
        }
      }
    `;
  },
  authorBasic: function () {
    return `
    author {
      name
      description
      image {
        url
      }
    }
    `;
  },
  imageAsset: function () {
    return `
        sys {
          id
        }
        url
        title
        width
        height
        description
        contentType
    `;
  },
  authorFull: function () {
    return `
      author {
        name
        description
        twitchUsername
        twitterUsername
        gitHubUsername
        websiteUrl
        youtubeUrl
        image {
          ${GraphQLStringBlocks.imageAsset()}
        }
      }
    `;
  },
  linkedAssets: function () {
    return `
      assets {
        block {
          ${GraphQLStringBlocks.imageAsset()}
        }
      }
    `;
  },
  codeBlock: function () {
    return `
    ... on CodeBlock {
      description
      language
      code
    }
    `;
  },
  tweetEmbed: function () {
    return `
    ... on TweetEmbed {
      tweetId
    }
    `;
  },
  videoEmbed: function () {
    return `
    ... on VideoEmbed {
        title
        embedUrl
      }
    `;
  },
  featuredImage: function () {
    return `
      featuredImage {
        ${GraphQLStringBlocks.imageAsset()}
      }
    `;
  },
};

module.exports = GraphQLStringBlocks;