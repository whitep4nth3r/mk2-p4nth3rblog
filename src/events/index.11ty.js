exports.data = {
  layout: "base.html",
  title: "Events",
};

exports.render = function (data) {
  return `
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
