function NewsletterSignup({ removeMargin = false, subscribers }) {
  const modifier = removeMargin ? " newsletterSignup--noMargin" : "";
  return /* html */ `  
     <div class="newsletterSignup${modifier}">
        <h2 class="newsletterSignup__title">Like <span>weird</span> newsletters?</h2>
        <p class="newsletterSignup__para">Join ${subscribers} subscribers in the Weird Wide Web Hole to find no answers to questions you didn't know you had.</p>
        <a href="https://buttondown.email/weirdwidewebhole" class="newsletterSignup__submit" target="_blank">Subscribe</a>
    </div>
      `;
}

module.exports = NewsletterSignup;
