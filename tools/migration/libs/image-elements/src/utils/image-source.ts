const canUseWebP = (window: { mozInnerScreenX: any }) => {
  var canvasElement = document.createElement('canvas');

  if (!!(canvasElement.getContext && canvasElement.getContext('2d'))) {
    var testString = !(window.mozInnerScreenX == null) ? 'png' : 'webp';
    return (
      canvasElement
        .toDataURL('image/webp')
        .indexOf('data:image/' + testString) === 0
    );
  }
  return false;
};

const getDevicePixelRatio = (window: {
  devicePixelRatio: number;
}): number | null => {
  const devicePixelRatio = window.devicePixelRatio;
  console.log('devicePixelRatio', devicePixelRatio);
  const formattedDevicePixelRatio = +(devicePixelRatio * 100).toFixed(0);
  console.log('formattedPixelRatioString', formattedDevicePixelRatio);
  console.log('x', devicePixelRatio.toFixed(2));
  console.log('y', formattedDevicePixelRatio.toFixed(2));
  return null;
};

export { canUseWebP, getDevicePixelRatio };
