const fs = require('fs');
const fontkit = require('fontkit');
const emoji = require('node-emoji');
const tmp = require('tmp');
const font = fontkit.openSync('./Apple Color Emoji.ttc').fonts[0];
const argv = require('minimist')(process.argv.slice(2));

const wiggle = require('./wiggle');

const emo = (argv.e || argv.emoji || emoji.random().emoji);
const name = (argv.n || argv.name || emoji.which(emo) || 'emoji');

let run = font.layout(emo);
let glyph = run.glyphs[0].getImageForSize(160);

if(glyph == null)
  return console.error('Emoji not found: '+emo);

let options = {
  minScale:argv.min,
  maxScale:argv.max,
  frames:argv.frames,
  name,
  dir:'',
  imgPath:'',
  emo
}

tmp.dir({unsafeCleanup:true}, (err, path) => {
  if (err) throw err;

  let imgPath = path + '/' + out + '.png';
  fs.writeFileSync(imgPath, glyph.data);
  options.dir = path;
  options.imgPath = imgPath;
  wiggle(options);
});
