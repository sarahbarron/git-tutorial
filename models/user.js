var fs = require('fs');
var _ = require('underscore');

function User() {
  this._data = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'hex'));
}


User.prototype.find = function(params, cb) {
  return cb(null, this._data);
};

User.prototype.findOne = function(params, cb) {
  var username = params.username;
  var user = _.findWhere(this._data, {
    username: username
  });

  return cb(null, user);
};


module.exports = User;