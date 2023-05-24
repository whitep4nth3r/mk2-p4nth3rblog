function Testimonial({ testimonial }) {
  return /* html */ `
  <blockquote class="testimonial">
    <p class="testimonial__quote">${testimonial.quote}</p>
    <img src="${testimonial.image.url}" alt="${testimonial.image.description}" class="testimonial__image" />
    <p class="testimonial__attr">${testimonial.name}, <a href="${testimonial.link}">${testimonial.org}</a></p>
  </blockquote>`;
}

module.exports = Testimonial;
