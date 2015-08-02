var spawn = require('child_process').spawn
  , fs = require('fs')
  , Path = require('path')
  ;

var flags = process.argv.slice(2).join(' ');

var MAX_LEVELS = (function () {
  var levels = flags.match(/--levels=(\d*)/);
  return levels && levels[1] || 2;
})();

if (MAX_LEVELS >= 5 && flags.indexOf('--seriously') === -1) {
  throw new Error('You gotta be serious. Use --seriously if you\'re serious.')
}

if (flags.substr(0, 5) === 'setup')
  setup();

if (flags.substr(0, 8) === 'multiply')
  multiply(1, 1);

function setup () {
  if (!fs.existsSync('children')) {
    fs.mkdirSync('children');
  }

  var read = fs.createReadStream('./template.js')
    , write = fs.createWriteStream('./children/1.js')
    ;

  read.pipe(write);
};

function multiply (level, id) {
  if (level <= MAX_LEVELS) {
    var fname = (id || 1) + '.js'
      , fpath = Path.relative(__dirname, Path.join(__dirname, 'children', fname))
      ;

    var cp = spawn('node', [fpath]);

    cp.stdout.on('data', function (children) {
      children = children.toString().replace(/[^\d,]/g, '').split(',');
      children.forEach(multiply.bind(null, level + 1));
    });
  }
};
