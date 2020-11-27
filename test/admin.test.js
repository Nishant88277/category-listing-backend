const request = require('supertest')('http://localhost:3002');

describe('AdminController', function () {
  describe('#Admin Login', function () {
    it('should respond with 200', function (done) {
      request
        .post('/admin-api/login')
        .send({
          email: 'admin@mailinator.com',
          password: 'Mind@123'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
