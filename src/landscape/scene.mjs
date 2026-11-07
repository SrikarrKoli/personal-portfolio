// Match the rendered background exactly, including its mobile crop.
export function sceneGeometry(viewWidth, viewHeight, imageWidth, imageHeight, mobile) {
  const scale = mobile ? viewHeight * .6 / imageHeight : Math.max(viewWidth / imageWidth, viewHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return { width, height, left: (viewWidth - width) * (mobile ? .2 : .4), top: mobile ? 0 : (viewHeight - height) * .5 };
}

export const effects = {
  leaves: { label: 'Leaves tumble from the tree.', count: 18, anchor: [.2, .22] },
  clouds: { label: 'A breeze sends little clouds across the sky.', count: 5, anchor: [.46, .32] },
  ripples: { label: 'A stone skips across the river, leaving ripples.', count: 5, anchor: [.73, .665] },
  birds: { label: 'A flock of birds rises over the mountains.', count: 7, anchor: [.48, .53] },
  butterflies: { label: 'Butterflies rise from the wildflowers.', count: 8, anchor: [.49, .89] }
};

export function effectAnchor(name, geometry, viewWidth, viewHeight) {
  const [x, y] = effects[name].anchor;
  return { x: Math.max(28, Math.min(viewWidth - 28, geometry.left + geometry.width * x)), y: Math.max(125, Math.min(viewHeight - 60, geometry.top + geometry.height * y)) };
}
