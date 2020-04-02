
const KeyCases = {
  LOWER_CASE: 'lowerCase',
  UPPER_CASE: 'upperCase',
};

function getKeyCase({ state, keyType }) {
  const { isShift, isCapsLock } = state;

  switch (keyType) {
    case 'symbol':
      if (isShift) {
        return KeyCases.UPPER_CASE;
      }
      return KeyCases.LOWER_CASE;
    case 'letter':
      if ((isShift && isCapsLock) || (!isShift && !isCapsLock)) {
        return KeyCases.LOWER_CASE;
      }
      return KeyCases.UPPER_CASE;
    default:
      return KeyCases.LOWER_CASE;
  }
}

export default getKeyCase;
