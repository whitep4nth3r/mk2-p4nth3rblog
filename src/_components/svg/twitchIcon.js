const defaultOptions = {
  height: 24,
  width: 24,
};

function TwitchIcon({ height, width } = defaultOptions) {
  return /*html*/ `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${height}"
      height="${width}" 
      viewBox="0 0 28 30"
      role="img"
      aria-label="Twitch icon"
    >
      <path d="M24.8885 13.9309L20.3639 18.2152H15.8381L11.8771 21.9652V18.2152H6.78711V2.14355H24.8885V13.9309Z" fill="#ffffff"/>
      <path d="M21.4957 6.0627H19.2322V12.4904H21.4957V6.0627ZM15.2748 6.03516H13.0113V12.4658H15.2748V6.03516ZM5.65547 0L0 5.35664V24.6434H6.78691V30L12.443 24.6434H16.9693L27.1512 15V0H5.65547ZM24.8883 13.9307L20.3637 18.215H15.8379L11.877 21.965V18.215H6.78691V2.14336H24.8883V13.9307Z" fill="#9146FF"/>
    </svg>
  `;
}

module.exports = TwitchIcon;
