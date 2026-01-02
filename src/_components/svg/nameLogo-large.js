function NameLogoLarge() {
  return /* html */ `
   <svg width="0" height="0">
      <defs>
        <filter id="distort_large">
          <feTurbulence type="turbulence" result="noise" numOctaves="1" baseFrequency="0.01 0.01"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
        </filter>
      </defs>
    </svg>
    <span class="nameLogoLarge">
      Salma Alam-Naylor
    </span>
  `;
}

module.exports = NameLogoLarge;
