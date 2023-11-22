function NewsletterSignup({ removeMargin = false }) {
  const modifier = removeMargin ? " newsletterSignup--noMargin" : "";
  return /* html */ `  
     <div class="newsletterSignup${modifier}">
        <h2 class="newsletterSignup__title">Want <span>weird stuff</span> in your inbox?</h2>
        <p class="newsletterSignup__para">Subscribe to the Weird Wide Web Hole newsletter and find no answers to questions you didn't know you had.</p> 
        <a href="https://buttondown.email/weirdwidewebhole" class="newsletterSignup__submit" target="_blank">Subscribe</a>

        <p class="newsletterSignup__para">
          <a href="https://buttondown.email/refer/weirdwidewebhole" target="_blank">Powered by Buttondown.</a>
        </p>
    </div>
      `;
}

module.exports = NewsletterSignup;
