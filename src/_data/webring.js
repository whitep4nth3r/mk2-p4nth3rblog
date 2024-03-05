module.exports = async function () {
  const members = await fetch(
    "https://the-claw-webring.netlify.app/data/members.json",
  ).then((res) => res.json());

  return {
    members,
    prevUrl: members[members.length - 1].url, // can be static because I know my position in the webring as index 0
    nextUrl: members[1].url, // can be static because I know my position in the webring as index 0
  };
};
