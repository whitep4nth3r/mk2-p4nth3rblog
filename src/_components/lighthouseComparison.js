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
      <p class="lighthouse__title">${device}: ${metric}</p>
      <p class="lighthouse__subTitle">${url}</p>
      <div class="lighthouse__scores">
        <span class="lighthouse__col">
          <span class="lighthouse__scoresNo lighthouse__scoresNo--${beforeColor}">
            ${beforeScore}
             <svg class="lighthouse__circle" viewbox="0 0 100 100" width="${circleSize}" height="${circleSize}" style="stroke-dasharray: ${beforeDraw} 999;">
              <circle cx="50" cy="50" r="${circleRadius}" />  
            </svg>
          </span>
          <p class="lighthouse__type">Before</p>
        </span>
        <span class="lighthouse__col">
          <span class="lighthouse__scoresNo lighthouse__scoresNo--${afterColor}">
            ${afterScore}
            <svg class="lighthouse__circle" viewbox="0 0 100 100" width="${circleSize}" height="${circleSize}" style="stroke-dasharray: ${afterDraw} 999;">
              <circle cx="50" cy="50" r="${circleRadius}" />  
            </svg>
          </span>
          <p class="lighthouse__type">After</p>
        </span>
      </div>
    </div>
  `;
}

module.exports = lighthouseComparison;
