const child = require('child_process');

module.exports = function childProcessPromise( command ){
  return new Promise((resolve, reject) => {
    const process = child.exec(command);
    process.on('exit', resolve);
    process.on('error', reject);
    process.stdout.on('data', data => {console.log(data)});
    process.stderr.on('data', data => {console.error(data)});
  });
}
