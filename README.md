# emoji-wiggler
It grabs emoji from the Apple Color Emoji font and wiggles them using Imagemagick's liquid resize

![Wiggly Joy Face](/examples/joy.gif?raw=true "Wiggly Joy Face")

### Dependencies
[Imagemagick](https://www.imagemagick.org/script/index.php) with the http://liblqr.wikidot.com/ library.

The font file `Apple Color Emoji.ttc` in the root directory of the project.

### Usage

 * Clone this repo
 * Install dependencies
 * Run `node index` for a randomly wiggled emoji

`node index -e 🤔 -n crushed_thinker --min 20 --max 100`

`node index -e 🍆 -n wiggly_eggplant --min 70 --max 300`

### Flags

* `-e` or `--emoji`: paste in any emoji to wiggle
* `-n` or `--name`: the output file name

The gif distortion cycles from a maximum to minumum to maximum scale factor.

* `--min`: the min scale factor. The closer to 0 the more distorted the emoji. Defaults to 70 (not much).
* `--max`: the max scale factor. 100 == no distortion. <100 == more distortion. >100 == more wiggling. Defaults to 200 (wiggly).

* `--frames`: how many frames the animation will run for. Defaults to 30 (~ 1s)


### TODO

* multiple emoji sets (Google Noto, Twitter, EmojiOne)
* change size of final output
* better step [shaping functions](www.flickr.com/photos/kynd/9546075099/)
