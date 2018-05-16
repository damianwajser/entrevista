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
  it('responds to /metric', function testSlash(done) {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.length.should.be.eql(0);
    done();
  });
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar').end((err, res) => {
        res.should.have.status(404);
      done();
    });
  });
});