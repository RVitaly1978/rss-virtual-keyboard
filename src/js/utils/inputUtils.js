
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
  input.selectionEnd = selectionStart + 1;
}

function handlePressTab({ textarea }) {
  const char = CharKeys[KeyboardLayout.EN.Tab.type];
  insertChar({ textarea, char });
}

function handlePressEnter({ textarea }) {
  const char = CharKeys[KeyboardLayout.EN.Enter.type];
  insertChar({ textarea, char });
}

function handlePressBackspace({ textarea }) {
  const input = textarea;
  const { value, selectionStart, selectionEnd } = input;

  if (selectionStart !== selectionEnd) {
    input.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
    input.selectionStart = selectionStart;
  } else {
    input.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);
    input.selectionStart = selectionStart - 1;
  }

  input.selectionEnd = selectionStart - 1;
}

function handlePressDelete({ textarea }) {
  const input = textarea;
  const { value, selectionStart, selectionEnd } = input;

  if (selectionStart !== selectionEnd) {
    input.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
  } else {
    input.value = value.slice(0, selectionStart) + value.slice(selectionStart + 1);
  }

  input.selectionStart = selectionStart;
  input.selectionEnd = selectionStart;
}

function handlePressArrowLeft({ textarea }) {
  const input = textarea;
  const { selectionStart, selectionEnd } = input;

  if (selectionStart !== selectionEnd) {
    input.selectionStart = selectionStart;
  } else {
    input.selectionStart = selectionStart - 1;
  }

  input.selectionEnd = selectionStart - 1;
}

function handlePressArrowRight({ textarea }) {
  const input = textarea;
  const { selectionStart, selectionEnd } = input;

  if (selectionStart !== selectionEnd) {
    input.selectionStart = selectionEnd;
  } else {
    input.selectionStart = selectionStart + 1;
  }

  input.selectionEnd = selectionStart + 1;
}

export {
  insertChar,
  handlePressTab,
  handlePressEnter,
  handlePressBackspace,
  handlePressDelete,
  handlePressArrowLeft,
  handlePressArrowRight,
};
