process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let www = require('../bin/www');

chai.use(chaiHttp);
describe('Users test suite', () => {

    let userDetails = {
        'email': 'joshua@richardson.tech',
        'password': 'password',
        'firstName': 'Joshua',
        'secondName': 'Richardson',
        'phone': '07450650708'
    };

    let userAuth = {
        'email': 'joshua@richardson.tech',
        'password': 'password',
    };

    describe('POST /api/users/register', () => {
        it('Registering a user should return a user object', (done) => {
            chai.request(www)
                .post('/api/users/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.email.should.be.eql(userDetails.email);
                    res.body.admin.should.be.eql(false);
                    done();
                });
        });
    });

    describe('Duplicate email POST /api/users/register', () => {
        it('should return an error due to the duplicate email', (done) => {
            chai.request(www)
                .post('/api/users/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('errors');
                    res.body.errors.email.msg.should.be.eql('This email is either in use, or a server error occurred.');
                    done();
                });
        });
    });


    describe('POST /api/users/authenticate', () => {
        it('should return an auth token', (done) => {
            chai.request(www)
                .post('/api/users/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(userAuth)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    done();
                });
        });
    });


    describe('Incorrect POST /api/users/authenticate', () => {
        it('should return an invalid username/password error', (done) => {
            userAuth["password"] += "1";
            chai.request(www)
                .post('/api/users/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(userAuth)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.have.property('error');
                    done();
                });
        });
    });


});
