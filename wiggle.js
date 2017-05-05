const fs = require('fs');
const _defaults = require('lodash.defaults');
const pad = require('./pad');
const childProcessPromise = require('./childProcessPromise');

let defaults = {
  minScale:70,
  maxScale:200,
  frames:30,
  name:undefined,
  dir:undefined,
  imgPath:undefined
}

function wiggle(options){
  _defaults(options, defaults);
  Promise.all( processImage(options) )
  .then(()=>{ processGif(options) })
  .then(()=>{ console.log(options.emo+'  saved: '+__dirname+'/'+options.name+'.gif'); })
  .catch(err => {
    console.error(err);
  });
}

function processImage(opts){
  let initial = opts.frames/2;
  let promises = [];

  for(let i=0; i<opts.frames; i++){
    let pos = step(i, initial, opts.frames);
    let scale = opts.minScale + pos * (opts.maxScale - opts.minScale);
    let output = opts.dir + '/' + opts.name + '_frame_' + pad(i, opts.frames) + '.png';
    let command = 'convert ' + opts.imgPath
                  + ' -liquid-rescale ' + scale + '%x' + scale + '% -scale 320x320\! '
                  + output;
    promises.push(childProcessPromise(command));
  }
  return promises;
}

function processGif(opts){
  let input = opts.dir + '/' + opts.name + '_frame_*.png';
  let command = 'convert -delay 5 -loop 0 -background white -alpha remove ' + input +' ' + opts.name+'.gif';
  childProcessPromise(command);
}

function step(index, start, max){
  return (max / 2 - Math.abs(max/2 - (Math.abs(start-index)%max))) / (max/2);
}

module.exports = wiggle;
