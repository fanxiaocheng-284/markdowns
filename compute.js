const offUnit = (str) => {
  const reg = /^(-?\d+)(\.\d+)?/;
  if (str.match(reg)) {
    return Number(str.match(reg)[0]);
  }
  return 0;
};

const getStyle = (el, style) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el)[style];
  }
  return el.currentStyle[style];
};

const isIE = () => {
  if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
    return true;
  }
  return false;
};

const supportsNativeHls = () => {
  const video = document.createElement('video');

  // HLS manifests can go by many mime-types
  const canPlay = [
    // Apple santioned
    'application/vnd.apple.mpegurl',
    // Apple sanctioned for backwards compatibility
    'audio/mpegurl',
    // Very common
    'audio/x-mpegurl',
    // Very common
    'application/x-mpegurl',
    // Included for completeness
    'video/x-mpegurl',
    'video/mpegurl',
    'application/mpegurl',
  ];

  return canPlay.some(canItPlay => (/maybe|probably/i).test(video.canPlayType(canItPlay)));
};

const getSupportedPlayer = () => {
  if (supportsNativeHls()) {
    return 'native';
  } else if (window.MediaSource) {
    return 'hls';
  } else if (isIE()) {
    return 'flash';
  }
  return false;
};
export { offUnit, getStyle, isIE, supportsNativeHls, getSupportedPlayer };
