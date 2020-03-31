import './styles/index.scss';

const keyboardConfig = {
  Backquote: {
    name: 'Backquote', lowerCaseEng: '`', upperCaseEng: '~', lowerCaseRu: 'ё', upperCaseRu: 'Ё', className: 'key',
  },
  Digit1: {
    name: 'Digit1', lowerCaseEng: '1', upperCaseEng: '!', lowerCaseRu: '1', upperCaseRu: '!', className: 'key',
  },
  Digit2: {
    name: 'Digit2', lowerCaseEng: '2', upperCaseEng: '@', lowerCaseRu: '2', upperCaseRu: '"', className: 'key',
  },
  Digit3: {
    name: 'Digit3', lowerCaseEng: '3', upperCaseEng: '#', lowerCaseRu: '3', upperCaseRu: '№', className: 'key',
  },
  Digit4: {
    name: 'Digit4', lowerCaseEng: '4', upperCaseEng: '$', lowerCaseRu: '4', upperCaseRu: ';', className: 'key',
  },
  Digit5: {
    name: 'Digit5', lowerCaseEng: '5', upperCaseEng: '%', lowerCaseRu: '5', upperCaseRu: '%', className: 'key',
  },
  Digit6: {
    name: 'Digit6', lowerCaseEng: '6', upperCaseEng: '^', lowerCaseRu: '6', upperCaseRu: ':', className: 'key',
  },
  Digit7: {
    name: 'Digit7', lowerCaseEng: '7', upperCaseEng: '&', lowerCaseRu: '7', upperCaseRu: '?', className: 'key',
  },
  Digit8: {
    name: 'Digit8', lowerCaseEng: '8', upperCaseEng: '*', lowerCaseRu: '8', upperCaseRu: '*', className: 'key',
  },
  Digit9: {
    name: 'Digit9', lowerCaseEng: '9', upperCaseEng: '(', lowerCaseRu: '9', upperCaseRu: '(', className: 'key',
  },
  Digit0: {
    name: 'Digit0', lowerCaseEng: '0', upperCaseEng: ')', lowerCaseRu: '0', upperCaseRu: ')', className: 'key',
  },
  Minus: {
    name: 'Minus', lowerCaseEng: '-', upperCaseEng: '_', lowerCaseRu: '-', upperCaseRu: '_', className: 'key',
  },
  Equal: {
    name: 'Equal', lowerCaseEng: '=', upperCaseEng: '+', lowerCaseRu: '=', upperCaseRu: '+', className: 'key',
  },
  Backspace: {
    name: 'Backspace', lowerCaseEng: 'Backspace', upperCaseEng: 'Backspace', lowerCaseRu: 'Backspace', upperCaseRu: 'Backspace', className: 'key key--backspace',
  },

  Tab: {
    name: 'Tab', lowerCaseEng: 'Tab', upperCaseEng: 'Tab', lowerCaseRu: 'Tab', upperCaseRu: 'Tab', className: 'key key--tab',
  },
  KeyQ: {
    name: 'KeyQ', lowerCaseEng: 'q', upperCaseEng: 'Q', lowerCaseRu: 'й', upperCaseRu: 'Й', className: 'key',
  },
  KeyW: {
    name: 'KeyW', lowerCaseEng: 'w', upperCaseEng: 'W', lowerCaseRu: 'ц', upperCaseRu: 'Ц', className: 'key',
  },
  KeyE: {
    name: 'KeyE', lowerCaseEng: 'e', upperCaseEng: 'E', lowerCaseRu: 'у', upperCaseRu: 'У', className: 'key',
  },
  KeyR: {
    name: 'KeyR', lowerCaseEng: 'r', upperCaseEng: 'R', lowerCaseRu: 'к', upperCaseRu: 'К', className: 'key',
  },
  KeyT: {
    name: 'KeyT', lowerCaseEng: 't', upperCaseEng: 'T', lowerCaseRu: 'е', upperCaseRu: 'Е', className: 'key',
  },
  KeyY: {
    name: 'KeyY', lowerCaseEng: 'y', upperCaseEng: 'Y', lowerCaseRu: 'н', upperCaseRu: 'Н', className: 'key',
  },
  KeyU: {
    name: 'KeyU', lowerCaseEng: 'u', upperCaseEng: 'U', lowerCaseRu: 'г', upperCaseRu: 'Г', className: 'key',
  },
  KeyI: {
    name: 'KeyI', lowerCaseEng: 'i', upperCaseEng: 'I', lowerCaseRu: 'ш', upperCaseRu: 'Ш', className: 'key',
  },
  KeyO: {
    name: 'KeyO', lowerCaseEng: 'o', upperCaseEng: 'O', lowerCaseRu: 'щ', upperCaseRu: 'Щ', className: 'key',
  },
  KeyP: {
    name: 'KeyP', lowerCaseEng: 'p', upperCaseEng: 'P', lowerCaseRu: 'з', upperCaseRu: 'З', className: 'key',
  },
  BracketLeft: {
    name: 'BracketLeft', lowerCaseEng: '[', upperCaseEng: '[', lowerCaseRu: 'х', upperCaseRu: 'Х', className: 'key',
  },
  BracketRight: {
    name: 'BracketRight', lowerCaseEng: ']', upperCaseEng: ']', lowerCaseRu: 'ъ', upperCaseRu: 'Ъ', className: 'key',
  },
  Backslash: {
    name: 'Backslash', lowerCaseEng: '\\', upperCaseEng: '|', lowerCaseRu: '\\', upperCaseRu: '/', className: 'key',
  },
  Delete: {
    name: 'Delete', lowerCaseEng: 'DEL', upperCaseEng: 'DEL', lowerCaseRu: 'DEL', upperCaseRu: 'DEL', className: 'key key--del',
  },

  CapsLock: {
    name: 'CapsLock', lowerCaseEng: 'CapsLock', upperCaseEng: 'CapsLock', lowerCaseRu: 'CapsLock', upperCaseRu: 'CapsLock', className: 'key key--capsLock',
  },
  KeyA: {
    name: 'KeyA', lowerCaseEng: 'a', upperCaseEng: 'A', lowerCaseRu: 'ф', upperCaseRu: 'Ф', className: 'key',
  },
  KeyS: {
    name: 'KeyS', lowerCaseEng: 's', upperCaseEng: 'S', lowerCaseRu: 'ы', upperCaseRu: 'Ы', className: 'key',
  },
  KeyD: {
    name: 'KeyD', lowerCaseEng: 'd', upperCaseEng: 'D', lowerCaseRu: 'в', upperCaseRu: 'В', className: 'key',
  },
  KeyF: {
    name: 'KeyF', lowerCaseEng: 'f', upperCaseEng: 'F', lowerCaseRu: 'а', upperCaseRu: 'А', className: 'key',
  },
  KeyG: {
    name: 'KeyG', lowerCaseEng: 'g', upperCaseEng: 'G', lowerCaseRu: 'п', upperCaseRu: 'П', className: 'key',
  },
  KeyH: {
    name: 'KeyH', lowerCaseEng: 'h', upperCaseEng: 'H', lowerCaseRu: 'р', upperCaseRu: 'Р', className: 'key',
  },
  KeyJ: {
    name: 'KeyJ', lowerCaseEng: 'j', upperCaseEng: 'J', lowerCaseRu: 'о', upperCaseRu: 'О', className: 'key',
  },
  KeyK: {
    name: 'KeyK', lowerCaseEng: 'k', upperCaseEng: 'K', lowerCaseRu: 'л', upperCaseRu: 'Л', className: 'key',
  },
  KeyL: {
    name: 'KeyL', lowerCaseEng: 'l', upperCaseEng: 'L', lowerCaseRu: 'д', upperCaseRu: 'Д', className: 'key',
  },
  Semicolon: {
    name: 'Semicolon', lowerCaseEng: ';', upperCaseEng: ';', lowerCaseRu: 'ж', upperCaseRu: 'Ж', className: 'key',
  },
  Quote: {
    name: 'Quote', lowerCaseEng: '\'', upperCaseEng: '\'', lowerCaseRu: 'э', upperCaseRu: 'Э', className: 'key',
  },
  Enter: {
    name: 'Enter', lowerCaseEng: 'ENTER', upperCaseEng: 'ENTER', lowerCaseRu: 'ENTER', upperCaseRu: 'ENTER', className: 'key key--enter',
  },

  ShiftLeft: {
    name: 'ShiftLeft', lowerCaseEng: 'Shift', upperCaseEng: 'Shift', lowerCaseRu: 'Shift', upperCaseRu: 'Shift', className: 'key key--shift-left',
  },
  KeyZ: {
    name: 'KeyZ', lowerCaseEng: 'z', upperCaseEng: 'Z', lowerCaseRu: 'я', upperCaseRu: 'Я', className: 'key',
  },
  KeyX: {
    name: 'KeyX', lowerCaseEng: 'x', upperCaseEng: 'X', lowerCaseRu: 'ч', upperCaseRu: 'Ч', className: 'key',
  },
  KeyC: {
    name: 'KeyC', lowerCaseEng: 'c', upperCaseEng: 'C', lowerCaseRu: 'с', upperCaseRu: 'С', className: 'key',
  },
  KeyV: {
    name: 'KeyV', lowerCaseEng: 'v', upperCaseEng: 'V', lowerCaseRu: 'м', upperCaseRu: 'М', className: 'key',
  },
  KeyB: {
    name: 'KeyB', lowerCaseEng: 'b', upperCaseEng: 'B', lowerCaseRu: 'и', upperCaseRu: 'И', className: 'key',
  },
  KeyN: {
    name: 'KeyN', lowerCaseEng: 'n', upperCaseEng: 'N', lowerCaseRu: 'т', upperCaseRu: 'Т', className: 'key',
  },
  KeyM: {
    name: 'KeyM', lowerCaseEng: 'm', upperCaseEng: 'M', lowerCaseRu: 'ь', upperCaseRu: 'Ь', className: 'key',
  },
  Comma: {
    name: 'Comma', lowerCaseEng: ',', upperCaseEng: ',', lowerCaseRu: 'б', upperCaseRu: 'Б', className: 'key',
  },
  Period: {
    name: 'Period', lowerCaseEng: '.', upperCaseEng: '.', lowerCaseRu: 'ю', upperCaseRu: 'Ю', className: 'key',
  },
  Slash: {
    name: 'Slash', lowerCaseEng: '/', upperCaseEng: '/', lowerCaseRu: '.', upperCaseRu: '.', className: 'key',
  },
  ArrowUp: {
    name: 'ArrowUp', lowerCaseEng: '▲', upperCaseEng: '▲', lowerCaseRu: '▲', upperCaseRu: '▲', className: 'key key--arrow-up',
  },
  ShiftRight: {
    name: 'ShiftRight', lowerCaseEng: 'Shift', upperCaseEng: 'Shift', lowerCaseRu: 'Shift', upperCaseRu: 'Shift', className: 'key key--shift-right',
  },

  ControlLeft: {
    name: 'ControlLeft', lowerCaseEng: 'Ctrl', upperCaseEng: 'Ctrl', lowerCaseRu: 'Ctrl', upperCaseRu: 'Ctrl', className: 'key key--control-left',
  },
  MetaLeft: {
    name: 'MetaLeft', lowerCaseEng: 'Win', upperCaseEng: 'Win', lowerCaseRu: 'Win', upperCaseRu: 'Win', className: 'key key--meta-left',
  },
  AltLeft: {
    name: 'AltLeft', lowerCaseEng: 'Alt', upperCaseEng: 'Alt', lowerCaseRu: 'Alt', upperCaseRu: 'Alt', className: 'key key--alt-left',
  },
  Space: {
    name: 'Space', lowerCaseEng: ' ', upperCaseEng: ' ', lowerCaseRu: ' ', upperCaseRu: ' ', className: 'key key--space',
  },
  AltRight: {
    name: 'AltRight', lowerCaseEng: 'Alt', upperCaseEng: 'Alt', lowerCaseRu: 'Alt', upperCaseRu: 'Alt', className: 'key key--alt-right',
  },
  ArrowLeft: {
    name: 'ArrowLeft', lowerCaseEng: '◄', upperCaseEng: '◄', lowerCaseRu: '◄', upperCaseRu: '◄', className: 'key key--arrow-left',
  },
  ArrowDown: {
    name: 'ArrowDown', lowerCaseEng: '▼', upperCaseEng: '▼', lowerCaseRu: '▼', upperCaseRu: '▼', className: 'key key--arrow-down',
  },
  ArrowRight: {
    name: 'ArrowRight', lowerCaseEng: '►', upperCaseEng: '►', lowerCaseRu: '►', upperCaseRu: '►', className: 'key key--arrow-right',
  },
  ControlRight: {
    name: 'ControlRight', lowerCaseEng: 'Ctrl', upperCaseEng: 'Ctrl', lowerCaseRu: 'Ctrl', upperCaseRu: 'Ctrl', className: 'key key--control-right',
  },
};

const languages = {
  ENG: 'eng',
  RU: 'ru',
};
