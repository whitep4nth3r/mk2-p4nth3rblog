function ResponsiveImage({ image }) {
  const { contentType } = image;
  // Inspect contentType to convert GIF to WebP and not AVIF
  // more info: https://twitter.com/whitep4nth3r/status/1460244790059188226
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
    return makeSrcSetArray(format).join(", ").trim();
  }

  return /* html */ `<picture>
      ${!isGif ? `<source type="image/avif" srcSet="${makeSrcSetString("avif")}" sizes="${sizes}" />` : ""}
      <source type="image/webp" srcSet="${makeSrcSetString("webp")}" sizes="${sizes}" />
      <img
        srcSet="${makeSrcSetString()}"
        sizes="${sizes}"
        src="${image.url}"
        alt="${image.description}"
        loading="lazy"
        decoding="async"
        width="${image.width}"
        height="${image.height}"
      />
    </picture>`;
}

module.exports = ResponsiveImage;
