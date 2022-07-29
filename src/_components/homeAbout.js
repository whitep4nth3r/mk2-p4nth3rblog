function homeAbout({ person }) {
  console.log(person.imageBio);
  const imageUrl = `${person.imageBio.url}?w=200&q=75`;

  console.log(imageUrl);

  return /* html */ `
  <div class="homeAbout">


      



        <h1 class="homeAbout__name">
          <span>Salma</span>
          <span>Alam-Naylor</span>
        </h1>
        <h2 class="homeAbout__subtitle">Staff Developer Experience Engineer at Netlify</h2>

        <p class="homeAbout_minibio">I'm a <a href="https://github.com/whitep4nth3r" target="_blank">software engineer</a>, <a href="/blog/">writer</a>, and <a href="https://twitch.tv/whitep4nth3r">live streamer</a>. I help developers build stuff, learn things, and love what they do through blog posts, tutorial videos, live streaming about tech and building open source projects.</p>



<!--
    <div class="homeAbout__banner__imgContainer">
        <picture>
          <source
            type="image/avif"
            srcset="${imageUrl}&fm=avif" 
          />
          <source
            type="image/webp"
            srcset="${imageUrl}&fm=webp" 
          />
          <img
          src="${imageUrl}"
          alt="${person.imageBio.description}" 
          height="${person.imageBio.height}" 
          width="${person.imageBio.width}"
          />
        </picture>
      </div>

      -->

  </div>`;
}

module.exports = homeAbout;
