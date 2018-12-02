import * as chai from 'chai';
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';

chai.use(require('chai-http')).should();

describe('Calculator Controller', () => {
  it('should calculate a result when valid inputs provided', done => {
    chai.request(app)
      .get('/api/calculator')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.a.property('data').eql('Hello world');
        done();
      });
  });
});
