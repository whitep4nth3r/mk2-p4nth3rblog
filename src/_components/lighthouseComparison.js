const GoogleLighthouse = require("./svg/googleLighthouse");

function getColor(score) {
  if (score >= 90) {
    return "green";
  }

  if (score <= 49) {
    return "red";
  }

  return "orange";
}

function lighthouseComparison({ beforeScore, afterScore, url, metric, device }) {
  const circleRadius = 47;
  const circleSize = 200;
  const circleCirumference = 2 * circleRadius * Math.PI;
  const beforeDraw = (beforeScore * circleCirumference) / 100;
  const afterDraw = (afterScore * circleCirumference) / 100;
  const beforeColor = getColor(beforeScore);
  const afterColor = getColor(afterScore);

  return /*html*/ `
    <div class="lighthouse">
      <span class="lighthouse__header">
        <span>
          <p class="lighthouse__title">Google Lighthouse ${metric} Score Comparison on ${device}</p>
          <a href="${url}" target="_blank" class="lighthouse__subTitle">${url}</a>
        </span>
        <span aria-hidden="true">${GoogleLighthouse()}</span>
      </span>

      <div class="lighthouse__scores">
        <span class="lighthouse__col">
          <span class="lighthouse__scoresNo lighthouse__scoresNo--${beforeColor}" aria-label="Score of ${beforeScore} before">
            ${beforeScore}
            <svg class="lighthouse__circle" viewbox="0 0 100 100" width="${circleSize}" height="${circleSize}" style="stroke-dasharray: ${beforeDraw} 999;">
              <circle cx="50" cy="50" r="${circleRadius}" />  
            </svg>
          </span>
          <p class="lighthouse__type" aria-hidden="true">Before</p>
        </span>
        <span class="lighthouse__col">
          <span class="lighthouse__scoresNo lighthouse__scoresNo--${afterColor}" aria-label="Score of ${afterScore} after">
            ${afterScore}
            <svg class="lighthouse__circle" viewbox="0 0 100 100" width="${circleSize}" height="${circleSize}" style="stroke-dasharray: ${afterDraw} 999;">
              <circle cx="50" cy="50" r="${circleRadius}" />  
            </svg>
          </span>
          <p class="lighthouse__type" aria-hidden="true">After</p>
        </span>
      </div>
    </div>
  `;
}

module.exports = lighthouseComparison;
