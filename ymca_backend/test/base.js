process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var www = require('../bin/www');

chai.use(chaiHttp);
describe('Base test suite', () => {
    describe('GET /', () => {
        it('it should return a JSON object of correct content', (done) => {
            chai.request(www)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql("Welcome to our API");
                    done();
                });
        });
    });

});
