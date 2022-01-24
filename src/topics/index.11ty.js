const Topics = require("../_components/topics");

exports.data = {
  layout: "base.html",
  title: "Topics",
};

exports.render = function (data) {
  const { topics } = data;
  return `${Topics({ topics })}
   `;
};
