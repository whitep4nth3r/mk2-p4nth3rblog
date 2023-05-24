const ContentfulTestimonials = require("../../lib/contentfulTestimonials");

module.exports = async function () {
  const testimonials = await ContentfulTestimonials.get();

  return testimonials;
};
