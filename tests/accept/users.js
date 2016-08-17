var logger = require('winston');
var server = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var UserModel = require('../../models/user');
var User = new UserModel();
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';


describe('Users', function() {

  // Before our test suite
  before(function(done) {
    // Start our app on an alternative port for acceptance tests
    server.listen(8001, function() {
      logger.info('Listening at http://localhost:8001 for acceptance tests');
      done();
    });
  });

  describe('/GET users', function() {
    it('should return a list of users', function(done) {
      chai.request(url)
        .get('/users')
        .end(function(err, res) {
          res.body.should.be.a('array');
          res.should.have.status(200);
          res.body.length.should.be.eql(100);
          done();
        });
    });
  });

  describe('/GET users/:username', function() {
    it('should return a single user', function(done) {
      // Find a user in the DB
      User.findOne({username: "tinywolf709"}, function(err, user) {
        var username = user.username;

        // Read this user by id
        chai.request(url)
          .get('/users/' + username)
          .end(function(err, res) {
            res.should.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.name.first).to.be.a('string');
            done();
          });
      });
    });
  });
});
