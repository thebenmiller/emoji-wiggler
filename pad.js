module.exports = function pad(num, max){
  var n = '' + num;
  var m = '' + max;
  while(n.length < m.length)
    n = '0' + n;
  return n;
}
