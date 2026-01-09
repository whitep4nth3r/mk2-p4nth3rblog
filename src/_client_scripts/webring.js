function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomEntry(array) {
  return array[getRandomInt(0, array.length - 1)];
}

const members = JSON.parse(document.getElementById("members").textContent);
const randomButton = document.querySelector("[data-webring-random]");

randomButton.addEventListener("click", () => {
  window.location.href = getRandomEntry(members).url;
});
