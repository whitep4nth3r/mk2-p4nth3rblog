const RichText = require("../_components/richText");
const ResponsiveImage = require("../_components/responsiveImage");

exports.data = {
  layout: "base.html",
  title: "About",
  metaDescription: "AAAHHHHHHHHH",
};

exports.render = function (data) {
  const { person } = data;
  return `
    <h1>${person.name}</h1>
    ${ResponsiveImage({ image: person.image })}
    ${RichText(person.bioLong)}
    <p>Twitter: @${person.twitterUsername}</p>
    <p>Twitch: @${person.twitchUsername}</p>
    <p>Github: @${person.gitHubUsername}</p>
  `;
};
