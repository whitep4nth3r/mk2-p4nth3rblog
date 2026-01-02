function NameLogoBlog() {
  return /* html */ `
   <svg width="0" height="0" class="nameLogo__filter">
      <defs>
        <filter id="distort">
          <feTurbulence type="turbulence" result="noise" numOctaves="1" baseFrequency="0.01 0.01"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
        </filter>
      </defs>
    </svg>
    <span class="nameLogo">
      <span class="nameLogo__top">Salma</span>
      <span class="nameLogo__bottom">Alam-Naylor</span>
    </span>
  `;
}

module.exports = NameLogoBlog;
