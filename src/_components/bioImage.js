function BioImage({ image }) {
  return /*html*/ `
    <picture>
      <source
        type="image/avif"
        srcset="
          ${image.url}?q=75&w=500&fm=avif 500w,
          ${image.url}?q=75&w=900&fm=avif 900w,
          ${image.url}?q=75&w=1300&fm=avif 1300w,
          ${image.url}?q=75&w=1700&fm=avif 1700w
        " 
        sizes="(max-width: 735px) 100vw, 736px"
      />
      <source
        type="image/webp"
        srcset="
          ${image.url}?q=75&w=500&fm=webp 500w,
          ${image.url}?q=75&w=900&fm=webp 900w,
          ${image.url}?q=75&w=1300&fm=webp 1300w,
          ${image.url}?q=75&w=1700&fm=webp 1700w
        "
        sizes="(max-width: 735px) 100vw, 736px"
      />
        <img
        src="${image.url}?w=400&q=75" 
        alt="${image.description}" 
        height="${image.height}" 
        width="${image.width}"
        />
    </picture>
  `;
}

module.exports = BioImage;
