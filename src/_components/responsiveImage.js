// Now transforms images from Contentful and third party images using /.netlify/images/?url=

function ResponsiveImage({ image, classOverride = null, loading = null }) {
  const className = classOverride ? classOverride : "post__responsiveImage";
  const loadingStrat = loading ? loading : "lazy";
  const { contentType } = image;
  const isGif = contentType === "image/gif";

  // Note, this array could be further optimised looking at the resulting quality and file size
  const imageWidths = [100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900];

  // Below the maximum container size, make images span 100vw of the container
  // Above the maximum container size, serve the image at the width of the container and no bigger
  // The values in "sizes" are layout values, and not device pixel values
  // The actual size of the image resource chosen from the srcset will depend on DPR value
  const maxContainerSize = 600;

  // Note, this could be further optimised by considering padding inside the container
  const sizes = `(max-width: ${maxContainerSize - 1}px) 100vw, ${maxContainerSize}px`;

  function makeSrcSetArray(format) {
    const formatString = format === undefined ? "" : `&fm=${format}`;

    return imageWidths.map((width) => `${image.url}?q=75&w=${width}${formatString} ${width}w`);
  }

  function makeSrcSetString(format) {
    return makeSrcSetArray(format).join(", ");
  }

  return /* html */ `<picture>
      ${!isGif ? `<source type="image/avif" srcSet="${makeSrcSetString("avif")}" sizes="${sizes}" />` : ""}
      <source type="image/webp" srcSet="${makeSrcSetString("webp")}" sizes="${sizes}" />
      <img
        srcSet="${makeSrcSetString()}"
        sizes="${sizes}"
        src="${image.url}"
        alt="${image.description}"
        loading="${loadingStrat}"
        decoding="async"
        width="${image.width}"
        height="${image.height}"
        class="${className}"
      />
    </picture>`;
}

module.exports = ResponsiveImage;
