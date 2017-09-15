const fontkit = require('fontkit');
const font = fontkit.openSync('./Apple Color Emoji.ttc').fonts[0];
const nodeEmoji = require('node-emoji');
const charset = font.characterSet;

const char = charset[Math.floor(Math.random() * charset.length)];
const emoji = String.fromCodePoint(char);
console.log(charset.length, nodeEmoji.which(emoji), emoji);
