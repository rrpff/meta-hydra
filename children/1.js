// Siblings: [1]
// Children: []

var fs = require('fs')
  , Path = require('path')
  ;

(function spawn () {
  var contents = fs.readFileSync(__filename).toString();

  if(contents.match(commentRegexp('Children'))[1].length === 0) {
    var children = spawnChildren(contents);

    var thisContents = replaceComment(contents, 'Children', children.join(', '));
    fs.createWriteStream(__filename).end(thisContents, function () {
      console.log(children.join(', '));
    });
  }

})();

function spawnChildren (contents) {
  var children = [null, null].map(function () {
    return Math.floor(Math.random() * 500).toString() + Date.now();
  });

  var childPaths = children.map(function (id) {
    return Path.join(__dirname, id) + '.js';
  });

  var newContents = replaceComment(contents, 'Siblings', children.join(', '));

  childPaths.forEach(function (path) {
    fs.createWriteStream(path).end(newContents);
  });

  return children;
};

function commentRegexp (name) {
  return new RegExp('\\/\\/ ' + name + ': \\[([^\\]]*)\\]');
};

function replaceComment (contents, name, replacement) {
  var replacement = '/' + '/ ' + name + ': [' + replacement + ']';
  return contents.replace(commentRegexp(name), replacement);
};
