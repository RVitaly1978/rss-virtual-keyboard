
import Renderer from '../dom/Renderer';

const KeyboardDescriptions = {
  'To change the language': 'left: Ctrl + Alt',
  'To change the case once': 'Shift + key',
  'To change the case permanently': 'CapsLock',
  'Operating system': 'Windows 7',
};

const getDescriptionsItems = () => {
  const items = [];

  Object.keys(KeyboardDescriptions).forEach((key) => {
    const option = Renderer.createElement('p', {
      class: 'descriptions__option',
      children: [key],
    });

    const value = Renderer.createElement('p', {
      class: 'descriptions__value',
      children: [KeyboardDescriptions[key]],
    });

    items.push(value, option);
  });

  return items;
};

export {
  KeyboardDescriptions,
  getDescriptionsItems,
};
