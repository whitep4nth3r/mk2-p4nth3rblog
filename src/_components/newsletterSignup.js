function NewsletterSignup({ removeMargin }) {
  const modifier = removeMargin ? " newsletterSignup--noMargin" : "";
  return /* html */ `  
     <div class="newsletterSignup${modifier}">
        <h2 class="newsletterSignup__title">Want <span>weird stuff</span> in your inbox?</h2>
        <p class="newsletterSignup__para">Subscribe to the Weird Wide Web Hole newsletter and find no answers to questions you didn't know you had.</p> 
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/weirdwidewebhole"
          method="post"
          target="popupwindow"
          onsubmit='window.open("https\:\/\/buttondown.email/weirdwidewebhole", "popupwindow")'
          class="newsletterSignup__form"
        >
          <label for="bd-email" class="newsletterSignup__label">Enter your email</label>
          <input type="email" name="email" id="bd-email" class="newsletterSignup__input" placeholder="salma@whitep4nth3r.com"/>
          
          <input type="submit" value="Subscribe" class="newsletterSignup__submit" />
          <p class="newsletterSignup__para newsletterSignup__para--center">
            <a href="https://buttondown.email/refer/weirdwidewebhole" target="_blank">Powered by Buttondown.</a>
          </p>
        </form>
    </div>
      `;
}

module.exports = NewsletterSignup;
