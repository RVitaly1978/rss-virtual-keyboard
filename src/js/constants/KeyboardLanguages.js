
const KeyboardLanguages = [
  'EN',
  'RU',
];

function getNextLanguage(lang) {
  const index = KeyboardLanguages.indexOf(lang);
  const nextIndex = (index + 1) % KeyboardLanguages.length;
  return KeyboardLanguages[nextIndex];
}

export {
  KeyboardLanguages,
  getNextLanguage,
};
