module.exports = function padZeros(num, max){
  let n = '' + num;
  let m = '' + max;
  while(n.length < m.length)
    n = '0' + n;
  return n;
}
