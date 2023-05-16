function DeployToNetlifyButton({ title, deployUrl }) {
  return /*html*/ `
    <a href="${deployUrl}" class="post__deployToNetlifyButton" title="${title}" target="_blank" rel="nofollow">
      <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify Button">
    </a>
  `;
}

module.exports = DeployToNetlifyButton;
