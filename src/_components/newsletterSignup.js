function NewsletterSignup({ removeMargin = false }) {
  const modifier = removeMargin ? " newsletterSignup--noMargin" : "";
  return /* html */ `  
     <div class="newsletterSignup${modifier}">
        <h2 class="newsletterSignup__title">Want <span>weird stuff</span> in your inbox?</h2>
        <p class="newsletterSignup__para">Join <span data-wwwh-subs></span> subscribers in the Weird Wide Web Hole to find no answers to questions you didn't know you had.</p>
        <a href="https://buttondown.email/weirdwidewebhole" class="newsletterSignup__submit" target="_blank">Subscribe</a>
    </div>
      `;
}

module.exports = NewsletterSignup;
