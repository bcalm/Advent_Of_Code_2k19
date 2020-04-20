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
  return layer
    .split('')
    .reduce((count, layerDigit) => (layerDigit == digit ? count + 1 : count), 0);
};

const findFewestZeroLayer = function (layers) {
  const fewestZeroLayer = {
    layer: [],
    count: 150,
  };
  return layers.reduce((fewestZeroLayer, layer) => {
    const zeros = getDigitCount(layer, '0');
    if (zeros < fewestZeroLayer.count) {
      fewestZeroLayer.layer = layer;
      fewestZeroLayer.count = zeros;
    }
    return fewestZeroLayer;
  }, fewestZeroLayer).layer;
};

const getMaxVisiblePixel = function (layers, position) {
  let visiblePixel;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i][position] == '0' || layers[i][position] == '1') {
      visiblePixel = layers[i][position];
      break;
    }
  }
  return visiblePixel;
};

const getImage = function (layers, length) {
  const container = [];
  for (let i = 0; i < length; i++) {
    container.push(getMaxVisiblePixel(layers, i));
  }
  return container;
};

const main = function () {
  const layerWidth = 25;
  const layerHeight = 6;
  const image = spaceCraftImage.slice();

  const layers = convertToLayers(image, layerWidth, layerHeight);

  /* Part_1 Implementation */
  const fewestZeroLayer = findFewestZeroLayer(layers);
  const oneCount = getDigitCount(fewestZeroLayer, '1');
  const twoCount = getDigitCount(fewestZeroLayer, '2');
  console.log(oneCount * twoCount);

  /* Part_2 Implementation */
  console.log(getImage(layers, 150).join(''));
};

main();
