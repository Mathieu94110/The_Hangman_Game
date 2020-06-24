let words = [
  "javascript",
  "csharp",
  "java",
  "perl",
  "ruby",
  "python",
  "css",
  "php",
  "html",
];
function randomWords() {
  return words[Math.floor(Math.random() * words.length)];
}

export { randomWords };
