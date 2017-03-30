process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../src/server/server.babel.js');
let expect = chai.expect;

chai.use(chaiHttp);

const server = 'http://localhost:8080';

/*
  * Test the /GET route
  */
  describe('/GET api', () => {
    it('Expects 401 for unauthorized users', (done) => {
      chai.request(server)
          .get('/api/users/1')
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
    });
  });


  describe('/POST login', () => {
    it('Expects login failure for invalid emails and passwords.', (done) => {
      chai.request(server)
          .post('/login')
          .send({ email: 'admin@example.com', password: 'fake' })
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
    });

    it('Expects successful login for valid emails and passwords.', (done) => {
      chai.request(server)
          .post('/login')
          .send({ email: 'admin@example.com', password: 'password' })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
    });

    it('Expects api route to be authorized after succesful user log in.', (done) => {
      var agent = chai.request.agent(server);
        agent
          .post('/login')
          .send({ email: 'admin@example.com', password: 'password' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            return agent.get('/api/users/1')
              .end(function (err, res) {
                 expect(res).to.have.status(200);
                 done();
              });
          });
    });
  });


  describe('/POST logout', () => {
    it('Expects user to logout succesfully.', (done) => {
      var agent = chai.request.agent(server);

      agent.get('/logut')
           .end((err, res) => {
            expect(res).to.have.status(200);
            return agent.get('/api/users/1')
              .end(function (err, res) {
                 expect(res).to.have.status(401);
                 done();
              });
          });
    });

    it('Expects user to lose authorization after logged out.', (done) => {
      var agent = chai.request.agent(server);

      agent.post('/login')
           .send({ email: 'admin@example.com', password: 'password' })
           .end((err, res) => {
             agent.get('/logout')
                  .end((err, res) => {
                    expect(res).to.have.status(200);
                    agent.get('/api/users/1')
                         .end(function (err, res) {
                           expect(res).to.have.status(401);
                           done();
                          });
            });
          });
    });

  });
