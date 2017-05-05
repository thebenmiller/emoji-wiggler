const child = require('child_process');

module.exports = function childProcessPromise( command ){
  let promise = new Promise((resolve, reject) => {
    let process = child.exec(command);
    process.on('exit', resolve);
    process.on('error', reject);
    process.stdout.on('data', data => {console.log(data)});
    process.stderr.on('data', data => {console.error(data)});
  });
  return promise;
}
