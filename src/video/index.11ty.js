const OpenGraph = require("../../lib/openGraph");
const VideoEmbed = require("../_components/videoEmbed");

const pageTitle = "The internet is ours";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "video",
  pageType: "video",
  metaDescription: "I made some videos. Maybe you could, too.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/video/",
};

exports.render = function (data) {
  return /* html */ `
    <section class="video">
      <div class="video__banner">
        <h1 class="video__headline">
          <img src="/img/this_internet.svg" alt="This internet is ours" />
        </h1>
      </div>
      <h2 class="video__gridHeader">I made some videos.</h2>
      <div class="video__content">
        <p>After years of struggling with making video content at my desk, behind a screen, in January 2024, I set myself a goal. I wanted to get better at making (technical) videos. At the time, I didn't know what that really meant. So I continued to put off making videos.</p>
        <p>On Tuesday 12 March 2024, I was inspired by <a href="https://www.youtube.com/watch?v=cL_P3HQOQ8w&list=PLz8Iz-Fnk_eRG9950e-KKD2UA7ijT7PBq&index=8&ab_channel=LearnWithJason">Jason Lengstorf to just #DoItAnyway</a>. Just make a video. Just do the thing I'd been putting off for so long.</p>
        <p>So I made some videos. And the videos I made weren't from behind my desk, looking at a screen. They're just videos of what I wanted to say that day.</p>
        <p><strong>This has been a journey</strong>, and it continues. This internet is <em>ours</em>.</p>
      </div>
      <div class="video__grid">
        ${VideoEmbed({
          showTitle: false,
          embedUrl:
            "https://www.youtube.com/embed/_IZri_2rWyo?si=kFx-J-NCokxQVZTQ",
        })}
        ${VideoEmbed({
          showTitle: false,
          embedUrl:
            "https://www.youtube.com/embed/4HbFQ932R5M?si=ormWKMq4K-f33UIi",
        })}
        ${VideoEmbed({
          showTitle: false,
          embedUrl:
            "https://www.youtube.com/embed/5Ondq89xYVs?si=1XeQ5wXlud1pAOrN",
        })}
        ${VideoEmbed({
          showTitle: false,
          embedUrl:
            "https://www.youtube.com/embed/7mhcWrZf_7w?si=tho4AOX4gE1mPKbb",
        })}
        ${VideoEmbed({
          showTitle: false,
          embedUrl:
            "https://www.youtube.com/embed/trj6acFLOW0?si=Vu6565KelUA4SU7Z",
        })}
        ${VideoEmbed({
          showTitle: false,
          embedUrl:
            "https://www.youtube.com/embed/ma9cRUkfiSQ?si=PSbKyqjU-1Lsqidn",
        })}
      </div>
    </section>
  `;
};
