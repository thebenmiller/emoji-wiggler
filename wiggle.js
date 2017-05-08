const fs = require('fs');
const _defaults = require('lodash.defaults');
const padZeros = require('./padZeros');
const childProcessPromise = require('./childProcessPromise');

const defaults = {
  minScale:70,
  maxScale:200,
  frames:30,
  size:'320x320',
  name:null,
  dir:null,
  imgPath:null,
  emoji:null
}

function wiggle(options){
  _defaults(options, defaults);
  Promise.all( processImage(options) )
    .then(()=>{ processGif(options) })
    .then(()=>{ console.log(`${options.emoji}  saved: ${__dirname}/${options.name}.gif`); })
    .catch(console.error);
}

function processImage(opts){
  let initial = opts.frames/2;
  let promises = [];

  for(let i=0; i<opts.frames; i++){
    let pos = step(i, initial, opts.frames);
    let scale = opts.minScale + pos * (opts.maxScale - opts.minScale);
    let output = `${opts.dir}/${opts.name}_frame_${padZeros(i, opts.frames)}.png`;
    let command = `convert ${opts.imgPath} -liquid-rescale ${scale}%x${scale}% `+
                  `-scale ${opts.size}\! ${output}`;
    promises.push(childProcessPromise(command));
  }
  return promises;
}

function processGif(opts){
  let input = `${opts.dir}/${opts.name}_frame_*.png`;
  let command = `convert -delay 5 -loop 0 -background white -alpha remove ${input} ${opts.name}.gif`;
  childProcessPromise(command);
}

function step(index, start, max){
  return (max / 2 - Math.abs(max/2 - (Math.abs(start-index)%max))) / (max/2);
}

module.exports = wiggle;
