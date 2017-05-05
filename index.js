const fs = require('fs');
const fontkit = require('fontkit');
const nodeEmoji = require('node-emoji');
const tmp = require('tmp');
const font = fontkit.openSync('./Apple Color Emoji.ttc').fonts[0];
const argv = require('minimist')(process.argv.slice(2));

const wiggle = require('./wiggle');

const emoji = (argv.e || argv.emoji || nodeEmoji.random().emoji);
const name = (argv.n || argv.name || nodeEmoji.which(emoji) || 'emoji');

const run = font.layout(emoji);
const glyph = run.glyphs[0].getImageForSize(160);

if(!glyph)
  return console.error(`Emoji not found: ${emoji}`);

const options = {
  minScale:argv.min,
  maxScale:argv.max,
  frames:argv.frames,
  emoji,
  name,
  dir:'',
  imgPath:''
}

tmp.dir({unsafeCleanup:true}, (err, path) => {
  if (err) throw err;

  let imgPath = `${path}/${name}.png`;
  fs.writeFileSync(imgPath, glyph.data);
  options.dir = path;
  options.imgPath = imgPath;
  wiggle(options);
});
