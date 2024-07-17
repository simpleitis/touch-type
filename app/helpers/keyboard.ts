export const keys = [
  [
    { value: "Digit1", display: "1" },
    { value: "Digit2", display: "2" },
    { value: "Digit3", display: "3" },
    { value: "Digit4", display: "4" },
    { value: "Digit5", display: "5" },
    { value: "Digit6", display: "6" },
    { value: "Digit7", display: "7" },
    { value: "Digit8", display: "8" },
    { value: "Digit9", display: "9" },
    { value: "Digit0", display: "0" },
    { value: "Minus", display: "-" },
    { value: "Equal", display: "=" },
  ],
  [
    { value: "KeyQ", display: "Q" },
    { value: "KeyW", display: "W" },
    { value: "KeyE", display: "E" },
    { value: "KeyR", display: "R" },
    { value: "KeyT", display: "T" },
    { value: "KeyY", display: "Y" },
    { value: "KeyU", display: "U" },
    { value: "KeyI", display: "I" },
    { value: "KeyO", display: "O" },
    { value: "KeyP", display: "P" },
  ],
  [
    { value: "KeyA", display: "A" },
    { value: "KeyS", display: "S" },
    { value: "KeyD", display: "D" },
    { value: "KeyF", display: "F" },
    { value: "KeyG", display: "G" },
    { value: "KeyH", display: "H" },
    { value: "KeyJ", display: "J" },
    { value: "KeyK", display: "K" },
    { value: "KeyL", display: "L" },
    { value: "Semicolon", display: ";" },
    { value: "Quote", display: "'" },
  ],
  [
    { value: "KeyZ", display: "Z" },
    { value: "KeyX", display: "X" },
    { value: "KeyC", display: "C" },
    { value: "KeyV", display: "V" },
    { value: "KeyB", display: "B" },
    { value: "KeyN", display: "N" },
    { value: "KeyM", display: "M" },
    { value: "Comma", display: "," },
    { value: "Period", display: "." },
  ],
  [
    { value: "Space", display: "Space" },
  ],
];

export const specialKeys: { [key: string]: string } = {
  Space: "w-[40%]",
};

export const progressKeys = [
  "Q",
  "T",
  "D",
  "H",
  "A",
  "R",
  "Z",
  "F",
  "G",
  "J",
  "C",
  "X",
  "U",
  "I",
  "W",
  "K",
  "S",
  "B",
  "M",
  "L",
  "P",
  "E",
  "O",
  "N",
  "V",
  "Y",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
];

export function generateParagraph(index: number, length = 250) {
  const allowedLetters = progressKeys.slice(0, index);

  let paragraph = "";
  let wordLength = 0;
  let lastCharWasSpace = false;

  for (let i = 0; i < length; i++) {
    if (
      i === 0 ||
      ((wordLength >= 5 || Math.random() < 0.15) && !lastCharWasSpace)
    ) {
      paragraph += " ";
      wordLength = 0;
      lastCharWasSpace = true;
    } else {
      const randomIndex = Math.floor(Math.random() * allowedLetters.length);
      paragraph += allowedLetters[randomIndex].toLowerCase();
      wordLength++;
      lastCharWasSpace = false;
    }
  }

  // Ensure the paragraph does not start with a space
  if (paragraph[0] === " ") {
    paragraph = paragraph.trimStart();
  }

  return paragraph;
}