function Testimonial({ testimonial }) {
  return /* html */ `
  <blockquote class="testimonial">
    <p class="testimonial__quote">${testimonial.quote}</p>

    <div class="testimonial__attr">
      <img src="${testimonial.image.url}?w=40" alt="${testimonial.image.description}" class="testimonial__image" />
      <p class="testimonial__name">${testimonial.name}</p>
      <a href="${testimonial.link}" class="testimonial__org">${testimonial.org}</a>
    </div>
  </blockquote>`;
}

module.exports = Testimonial;
