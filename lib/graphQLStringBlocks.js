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
  relatedPosts: function () {
    return `
      relatedPostsCollection(limit: 2) {
        items {
          sys {
            id
          }
          date
          updatedDate
          title
          slug
          excerpt
          readingTime
          ${GraphQLStringBlocks.topicsCollection()}
          ${GraphQLStringBlocks.featuredImage()}
        }
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
      bioShort
      imageBio {
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
        bioShort
        bioPost
        imageBio {
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
  callout: function () {
    return `
    ... on Callout {
      title
      emoji
      content
    }
    `;
  },
  codeBlock: function () {
    return `
    ... on CodeBlock {
      description
      language
      code
      isDiff
    }
    `;
  },
  tweetEmbed: function () {
    return `
    ... on TweetEmbed {
      tweetUrl
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
  lighthouseComparison: function () {
    return `
      ... on LighthouseComparison {
        beforeScore
        afterScore
        metric
        url
        device
      }
    `;
  },
  codePenEmbed: function () {
    return `
      ... on CodePenEmbed {
        title
        embedCode
      }
    `;
  },
  deployToNetlifyButton: function () {
    return `
      ... on DeployToNetlifyButton {
        title
        deployUrl
      }
    `;
  },
};

module.exports = GraphQLStringBlocks;
