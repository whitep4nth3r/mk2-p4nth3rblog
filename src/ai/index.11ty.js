const OpenGraph = require("../../lib/openGraph");

const pageTitle = "My AI Manifesto";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "I don't use AI on my website or to generate content verbatim. But it does have its uses.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/ai/",
  includeInSitemap: true,
};

exports.render = function () {
  return /* html */ `
   <div class="ai__content">  
      <h1 class="ai__title">AI Usage</h1>
      <p class="ai__text">Everything I create on the internet — including this website and my newsletter — is created, built and written by me using my own thoughts, ideas, and experience.</p>
      <p class="ai__text">I may use LLMs and AI lightly as tools during the content creation process to help with things like summarising large transcripts or articles that I use as source material. Sometimes I use tools like GitHub Copilot to help me write code (but it's more fun and a better learning experience to write the code by hand).</p>
      <p class="ai__text">This website is my playground and my exploration space, and I like to painstakingly handcraft it myself.</p>
      <p class="ai__text">I have a strong dislike for AI-generated art and music. Whilst it may be a quick way to generate royalty-free assets for your project, it is devoid of imagination, creativity and the human spirit.</p>
      <p class="ai__text">This page is my <a href="https://www.bydamo.la/p/ai-manifesto" target="_blank">AI manifesto</a>.</p>
      <div class="ai__cta">
        <div class="newsletterSignup">
          <h2 class="newsletterSignup__title">
            Want
            <span>weird stuff</span>
            in your inbox?
          </h2>
          <p class="newsletterSignup__para">
            Enter the Weird Wide Web Hole to find no answers to questions you didn't know you had.
          </p>
          <a href="https://buttondown.email/weirdwidewebhole" class="newsletterSignup__submit" target="_blank">
            Subscribe
          </a>
        </div>
      </div>
    </div>
  `;
};
