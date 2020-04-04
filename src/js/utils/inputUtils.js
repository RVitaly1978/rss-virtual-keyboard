
import {
  KeyboardLayout,
  CharKeys,
} from '../constants/KeyboardLayout';

function insertChar({ textarea, char }) {
  const input = textarea;
  const { value, selectionStart, selectionEnd } = input;

  if (selectionStart !== selectionEnd) {
    input.value = value.slice(0, selectionStart) + char + value.slice(selectionEnd);
  } else {
    input.value = value.slice(0, selectionStart) + char + value.slice(selectionStart);
  }

  input.selectionStart = selectionStart + 1;
  input.selectionEnd = input.selectionStart;
  input.focus();
}

function handlePressTab({ textarea }) {
  const char = CharKeys[KeyboardLayout.EN.Tab.type];
  insertChar({ textarea, char });
  // Tab.classList.add('key--active');
  // removeActive(Tab);
}

export {
  insertChar,
  handlePressTab,
};
