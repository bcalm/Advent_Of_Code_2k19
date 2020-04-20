const spaceCraftImage = require('./spaceCraftImage.json');

const convertToLayers = function (image, layerHeight, layerWidth) {
  const layers = [];
  let start = 0;
  const layerLength = layerHeight * layerWidth;
  while (start < image.length) {
    const newLayer = image.substr(start, layerLength);
    layers.push(newLayer);
    start += layerLength;
  }
  return layers;
};

const getDigitCount = function (layer, digit) {
  return layer.split('').reduce((count, layerDigit) => {
    count = digit === +layerDigit ? ++count : count;
    return count;
  }, 0);
};

const findFewestZeroLayer = function (layers) {
  const fewestZeroLayer = {
    layer: [],
    count: 150,
  };
  return layers.reduce((fewestZeroLayer, layer) => {
    const zeros = getDigitCount(layer, 0);
    if (zeros < fewestZeroLayer.count) {
      fewestZeroLayer.layer = layer;
      fewestZeroLayer.count = zeros;
    }
    return fewestZeroLayer;
  }, fewestZeroLayer).layer;
};

const main = function () {
  const layerWidth = 25;
  const layerHeight = 6;
  const image = spaceCraftImage.slice();
  const layers = convertToLayers(image, layerWidth, layerHeight);
  const fewestZeroLayer = findFewestZeroLayer(layers);

  const oneCount = getDigitCount(fewestZeroLayer, 1);
  const twoCount = getDigitCount(fewestZeroLayer, 2);
  // console.log(oneCount, twoCount, fewestZeroLayer);

  console.log(oneCount * twoCount);
};

main();
