let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


describe('loading express', function () {
  this.timeout(150000);
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /metric?name=damianwajser', function testSlash(done) {
    chai.request(server)
    .get('/metric?name=damianwajser')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
    done();
  });
});
  it('responds to /metric', function testSlash(done) {
    chai.request(server)
    .get('/metric')
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
    done();
  });
  });
});