const OpenGraph = require("../../lib/openGraph");
const pageTitle = "What's whitep4nth3r up to? Check out past and future events";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "What's whitep4nth3r up to? Check out past and future in-person and virtual events.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  return /* html */ `
    <p>FUTURE EVENTS</p>
    ${data.futureEvents
      .map(
        (event) => `
    <div>
      <p>${event.name}</p>
      <p>${event.date}</p>
    </div><br />`,
      )
      .join("")}
    <p>PAST EVENTS</p>
    ${data.pastEvents
      .map(
        (event) => `
    <div>
      <p>${event.name}</p>
      <p>${event.date}</p>
    </div><br />`,
      )
      .join("")}
   `;
};
