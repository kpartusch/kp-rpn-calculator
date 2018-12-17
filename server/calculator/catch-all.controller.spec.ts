import * as chai from 'chai';
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';

chai.use(require('chai-http')).should();

describe('Catch All Controller', () => {
  it('should return 404 when URL not found', (done) => {
    const nonExistentEndPointUrl = '/api/foo';
    chai.request(app)
      .get(nonExistentEndPointUrl)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.a.property('errors')
          .eql([{message: 'Not Found'}]);
        done();
      });
  });

  it('should return 200 and description when requesting the API root', (done) => {
    const apiRootUrl = '/api/';
    chai.request(app)
      .get(apiRootUrl)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.a.property('data')
          .eql({
            title: 'Reverse Polish Notation Calculator.',
            description: 'This calculator API uses reverse polish notation. You can submit a POST ' +
              'request to "/api/calculation" with an array of string inputs. The response will contain ' +
              'either a response or list of errors.'});
        done();
      });
  });
});
