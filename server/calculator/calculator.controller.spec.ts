import * as chai from 'chai';
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';

chai.use(require('chai-http')).should();

describe('Calculator Controller', () => {
  let firstOperand: number;
  let secondOperand: number;
  const endPointUrl = '/api/calculator';

  it('should return zero when inputs array is empty', (done) => {
    chai.request(app)
      .post(endPointUrl)
      .send({inputs: []})
      .end((err, res) => {
        assertSuccessResponse(res, 0);
        done();
      });
  });

  describe('two number functions', () => {
    it('should calculate a result when addition', (done) => {
      firstOperand = 3;
      secondOperand = 2;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), secondOperand.toString(), '+']})
        .end((err, res) => {
          assertSuccessResponse(res, firstOperand + secondOperand);
          done();
        });
    });

    it('should calculate a result when subtraction', (done) => {
      firstOperand = 20;
      secondOperand = 9.5;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), secondOperand.toString(), '-']})
        .end((err, res) => {
          assertSuccessResponse(res, firstOperand - secondOperand);
          done();
        });
    });

    it('should calculate a result when multiplication', (done) => {
      firstOperand = 8;
      secondOperand = 20;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), secondOperand.toString(), '*']})
        .end((err, res) => {
          assertSuccessResponse(res, firstOperand * secondOperand);
          done();
        });
    });

    it('should calculate a result when division', (done) => {
      firstOperand = 14;
      secondOperand = 2;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), secondOperand.toString(), '/']})
        .end((err, res) => {
          assertSuccessResponse(res, firstOperand / secondOperand);
          done();
        });
    });

    it('should return error when inputs array has invalid sequence', (done) => {
      firstOperand = 3;
      secondOperand = 2;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), '*', secondOperand.toString()]})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.a.property('errors')
            .eql([{message: 'inputs provided do not represent a valid postfix (RPN) expression'}]);
          done();
        });
    });
  });

  describe('percentage functions', () => {
    it('should calculate a result when two numbers present', (done) => {
      firstOperand = 50;
      secondOperand = 10;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), secondOperand.toString(), '%']})
        .end((err, res) => {
          assertSuccessResponse(res, firstOperand * (secondOperand / 100));
          done();
        });
    });

    it('should calculate a result when one number present', (done) => {
      firstOperand = 50;
      chai.request(app)
        .post(endPointUrl)
        .send({inputs: [firstOperand.toString(), '%']})
        .end((err, res) => {
          assertSuccessResponse(res, (firstOperand / 100));
          done();
        });
    });
  });

  function assertSuccessResponse(res: any, result: number): void {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.a.property('data').eql(result);
  }
});
