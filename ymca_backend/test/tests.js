// Basic tests test barebones functionality as well as input validation/sanitization
// Advanced tests test more contrived situations which are likely to cause trouble

process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let www = require('../bin/www');
const config = require('../config/config');
let users = require('../models/user');
let admin = require('../models/users/admin');
let api_utils = require('../utils/api_utils');
var should = require('should');
var assert = require('assert');
var request = require('supertest');

mongoose.connect(config.db_path, {
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true
    },
    function (err) {
        if (err) {
            console.log('Failed to connect to mongo: ' + err);
        } else {
            console.log('Dropping database: ' + config.db_path);
            mongoose.connection.db.dropDatabase();
        }
    });


//region Declarations for basic tests
let initialUserDetails = {
    email: 'joshua@richardson.tech',
    password: 'password',
    firstName: 'Joshua',
    secondName: 'Richardson',
    phone: '07450650708'
};

let extraUserDetails = {
    email: 'joshua2@richardson.tech',
    password: 'password',
    firstName: 'Joshua',
    secondName: 'Richardson',
    phone: '07450650708'
};


let deletedUserDetails = {
    email: 'devdude@devdude.me',
    password: 'password',
    firstName: 'Youssef',
    secondName: 'SamiDevdude',
    phone: '07450650708'
};

let userAuth = {
    email: 'joshua@richardson.tech',
    password: 'password',
};

let initialMenteeDetails = {
    email: 'somementee@gmail.com',
    meetingAddress: '25 Imaginary Road, Kelvinbridge, Glagsow, G12 NQW',
    firstName: 'Jack',
    secondName: 'Saunders',
    phone: '07450470502',
    mentorEmail: 'joshua@richardson.tech'
};


let deletedMenteeDetails = {
    email: 'somementee1@gmail.com',
    meetingAddress: 'lorem',
    firstName: 'lorem',
    secondName: 'lorem',
    phone: '07450470502',
    mentorEmail: 'joshua@richardson.tech'
};


let deletedManagerDetails = {
    email: 'somemanager@gmail.com',
    firstName: 'Jesse',
    secondName: 'Jackson',
    phone: '07650650801',
    password: 'password1'
};

let initialManagerDetails = {
    email: 'someothermanager@gmail.com',
    firstName: 'Jethro',
    secondName: 'Jackson',
    phone: '07650650801',
    password: 'password1'
};


let testEscalationUserDetails = {
    email: 'zara@gmail.com',
    password: 'password12345',
    firstName: 'James',
    secondName: 'Jackson',
    phone: '07450650708',
};

let authToken = '';
let escalationAuthToken = '';
let initialUserId = '';
let initialMenteeId = '';
let initialManagerId = '';
let initialMeetingId = '';
let deletedUserId = '';
let deletedMenteeId = '';
let deletedManagerId = '';
let deletedMeetingId = '';

let extraUserId = '';

//endregion

describe('Test suite for API', () => {


    describe('If this fails you messed something up real bad test suite', () => {
        it('it should return a JSON object of correct content', (done) => {
            request(www)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Object);
                    res.body.message.should.be.eql('Welcome to our API');
                    done();
                });
        });
    });


    describe('Basic users test suite', () => {


        it('should return a user object', (done) => {
            request(www)
                .post('/api/users/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(initialUserDetails)
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Object);
                    res.body.result.linkedModel.should.have.properties('_id', 'phone', 'firstName', 'secondName');
                    res.body.result.email.should.be.eql(initialUserDetails.email);
                    initialUserId = res.body.result._id;
                    done();
                });
        });


        it('should return a user object', (done) => {
            request(www)
                .post('/api/users/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(extraUserDetails)
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Object);
                    res.body.result.linkedModel.should.have.properties('_id', 'phone', 'firstName', 'secondName');
                    res.body.result.email.should.be.eql(extraUserDetails.email);
                    extraUserId = res.body.result._id;
                    done();
                });
        });

        it('should return a second user object (setting up for later)', (done) => {
            request(www)
                .post('/api/users/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(deletedUserDetails)
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Object);
                    res.body.result.linkedModel.should.have.properties('_id', 'phone', 'firstName', 'secondName');
                    res.body.result.email.should.be.eql(deletedUserDetails.email);
                    deletedUserId = res.body.result._id;
                    done();
                });
        });


        it('should return an auth token', (done) => {
            request(www)
                .post('/api/users/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(userAuth)
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('token');
                    authToken = res.body.token;
                    done();
                });
        });


    });


    describe('Basic admin test suite', () => {


        //region Testing user functions
        it('Should return an array of mentors', (done) => {
            api_utils.findObjectByKey(users, 'email', initialUserDetails.email).then(result_user => {
                let adminObject = new admin();
                adminObject.firstName = initialUserDetails.firstName;
                adminObject.secondName = initialUserDetails.secondName;
                adminObject.phone = initialUserDetails.phone;
                adminObject.save((err, result) => {
                    result_user.linkedModel = adminObject;
                    result_user.save((err, result) => {
                        if (err) throw (err);
                        request(www)
                            .post('/api/admins/mentors')
                            .set('content-type', 'application/x-www-form-urlencoded')
                            .send({'auth': authToken})
                            .expect(200)
                            .end((err, res) => {
                                res.body.should.be.instanceOf(Array);
                                res.body.length.should.be.eql(2);
                                done();
                            });
                    });
                });
            });
        });


        it('should return success with user deleted', (done) => {
            request(www)
                .post('/api/admins/mentors/delete')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': deletedUserId
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('success');
                    res.body.success.should.be.eql(true);
                    done();
                });
        });


        it('Should return an array of users', (done) => {
            request(www)
                .post('/api/admins/mentors')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });


        it('should return success and result with user modified', (done) => {
            request(www)
                .post('/api/admins/mentors/edit')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': extraUserId,
                        'json': '{"firstName": "James"}'
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.property('firstName');
                    res.body.result.firstName.should.be.eql('James');
                    done();
                });
        });


        it('Should return an array of users', (done) => {
            request(www)
                .post('/api/admins/mentors')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });

        //endregion


        //region Testing mentee functions
        it('should return the new mentee object', (done) => {
            request(www)
                .post('/api/admins/mentees/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(Object.assign({'auth': authToken}, initialMenteeDetails))
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.property('firstName');
                    res.body.result.firstName.should.be.eql('Jack');
                    initialMenteeId = res.body.result._id;
                    done();
                });
        });


        it('should return the new mentee object', (done) => {
            request(www)
                .post('/api/admins/mentees/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(Object.assign({'auth': authToken}, deletedMenteeDetails))
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.property('firstName');
                    res.body.result.firstName.should.be.eql('lorem');
                    deletedMenteeId = res.body.result._id;
                    done();
                });
        });


        it('should return an array of mentees', (done) => {
            request(www)
                .post('/api/admins/mentees')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(2);
                    done();
                });
        });


        it('should return success with mentee deleted', (done) => {
            request(www)
                .post('/api/admins/mentees/delete')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': deletedMenteeId
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('success');
                    res.body.success.should.be.eql(true);
                    done();
                });
        });


        it('should return an array of mentees', (done) => {
            request(www)
                .post('/api/admins/mentees')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });


        it('should return success and result with mentee modified', (done) => {
            request(www)
                .post('/api/admins/mentees/edit')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': initialMenteeId,
                        'json': '{"meetingAddress": "some road somewhere"}'
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.property('meetingAddress');
                    res.body.result.meetingAddress.should.be.eql('some road somewhere');
                    done();
                });
        });
        // endregion


        //region Testing manager functions
        it('should return the new manager object', (done) => {
            request(www)
                .post('/api/admins/managers/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(Object.assign({'auth': authToken}, initialManagerDetails))
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.linkedModel.should.have.property('firstName');
                    res.body.result.linkedModel.firstName.should.be.eql('Jethro');
                    initialManagerId = res.body.result._id;
                    done();
                });
        });


        it('should return the new manager object', (done) => {
            request(www)
                .post('/api/admins/managers/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(Object.assign({'auth': authToken}, deletedManagerDetails))
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.linkedModel.should.have.property('firstName');
                    res.body.result.linkedModel.firstName.should.be.eql('Jesse');
                    deletedManagerId = res.body.result._id;
                    done();
                });
        });


        it('should return an array of managers', (done) => {
            request(www)
                .post('/api/admins/managers')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(2);
                    done();
                });
        });


        it('should return success with manager deleted', (done) => {
            request(www)
                .post('/api/admins/managers/delete')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': deletedManagerId
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('success');
                    res.body.success.should.be.eql(true);
                    done();
                });
        });


        it('should return an array of managers', (done) => {
            request(www)
                .post('/api/admins/managers')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });


        it('should return success and result with manager modified', (done) => {
            request(www)
                .post('/api/admins/managers/edit')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': initialManagerId,
                        'json': '{"secondName": "Jenson", "firstName": "Jehovah"}'
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.properties('secondName', 'firstName');
                    res.body.result.secondName.should.be.eql('Jenson');
                    res.body.result.firstName.should.be.eql('Jehovah');
                    done();
                });
        });


        it('should return success and result with mentee linked to manager', (done) => {
            request(www)
                .post('/api/admins/managers/assign')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'mentorEmail': extraUserDetails.email,
                        'managerEmail': initialManagerDetails.email
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.linkedModel.should.have.property('manager');
                    res.body.result.linkedModel.manager.should.have.property('email');
                    res.body.result.linkedModel.manager.email.should.eql(initialManagerDetails.email);
                    done();
                });
        });
        //endregion

    });


    describe('Basic user methods test suite', () => {


        it('should return a user object', (done) => {
            request(www)
                .post('/api/methods/profile')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({auth: authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Object);
                    res.body.linkedModel.should.have.properties('_id', 'phone', 'firstName', 'secondName');
                    res.body.email.should.be.eql(initialUserDetails.email);
                    initialUserId = res.body._id;
                    done();
                });
        });


        // We're not going to test /emergency here because that costs money so nah


        it('should return the new meeting object', (done) => {
            request(www)
                .post('/api/methods/meetings/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(({
                    'auth': authToken,
                    'id': initialMenteeId,
                    'meetingAddress': initialMenteeDetails.meetingAddress,
                    'startTime': Date.now() - 5000000,
                    'endTime': Date.now() - 4997000,
                }))
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.properties('_id', 'meetingAddress', 'startTime', 'endTime');
                    initialMeetingId = res.body.result._id;
                    done();
                });
        });


        it('should return the new meeting object', (done) => {
            request(www)
                .post('/api/methods/meetings/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(({
                    'auth': authToken,
                    'id': initialMenteeId,
                    'meetingAddress': initialMenteeDetails.meetingAddress,
                    'startTime': Date.now() - 5000000,
                    'endTime': Date.now() - 4000000,
                }))
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.properties('_id', 'meetingAddress', 'startTime', 'endTime');
                    deletedMeetingId = res.body.result._id;
                    done();
                });
        });


        it('should return an array of meetings', (done) => {
            request(www)
                .post('/api/methods/meetings')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(2);
                    done();
                });
        });

        it('should return success and result with meeting modified', (done) => {
            request(www)
                .post('/api/methods/meetings/edit')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': initialMeetingId,
                        'json': '{"actualStartTime": "' + (Date.now() - 4999500).toString() + '", "meetingAddress": "Some changed meeting address"}'
                    })
                .expect(200)
                .end((err, res) => {
                    // console.log("YEYEYEYEYE");
                    // console.log(res.body);
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.properties('actualStartTime', 'meetingAddress');
                    res.body.result.meetingAddress.should.be.eql("Some changed meeting address");
                    done();
                });
        });

        it('should return success with meeting deleted', (done) => {
            request(www)
                .post('/api/methods/meetings/delete')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': deletedMeetingId
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('success');
                    res.body.success.should.be.eql(true);
                    done();
                });
        });


        it('should return an array of meetings', (done) => {
            request(www)
                .post('/api/methods/meetings')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });


        it('should return success and result with meeting modified', (done) => {
            request(www)
                .post('/api/methods/meetings/edit')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        'auth': authToken,
                        'id': initialMeetingId,
                        'json': '{"actualStartTime": "' + (Date.now() - 4999500).toString() + '", "meetingAddress": "Some changed meeting address"}'
                    })
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.properties('success', 'result');
                    res.body.success.should.be.eql(true);
                    res.body.result.should.have.properties('actualStartTime', 'meetingAddress');
                    res.body.result.meetingAddress.should.be.eql("Some changed meeting address");
                    done();
                });
        });

        it('should return an array of mentees', (done) => {
            request(www)
                .post('/api/methods/mentees')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'auth': authToken})
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });


    });


    describe('More advanced tests (global)', () => {


        it('should return an error due to the duplicate email', (done) => {
            request(www)
                .post('/api/users/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(initialUserDetails)
                .expect(422)
                .end((err, res) => {
                    res.body.should.have.property('errors');
                    res.body.errors.email.msg.should.be.eql('This email is either in use, or a server error occurred.');
                    done();
                });
        });


        it('should return an invalid username/password error', (done) => {
            userAuth.password += '1';
            request(www)
                .post('/api/users/authenticate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(userAuth)
                .expect(403)
                .end((err, res) => {
                    res.body.should.have.property('error');
                    userAuth.password = userAuth.password.replace('1', '');
                    done();
                });
        });

        describe('Testing admin function privileges', () => {

            it('should return a new user', (done) => {
                request(www)
                    .post('/api/users/register')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(testEscalationUserDetails)
                    .expect(200)
                    .end((err, res) => {
                        done();
                    })
            });
            it('should return 200', (done) => {
                request(www)
                    .post('/api/users/authenticate')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({email: testEscalationUserDetails.email, password: testEscalationUserDetails.password})
                    .expect(200)
                    .end((err, res) => {
                        res.body.should.have.property('token');
                        escalationAuthToken = res.body.token;
                        done();
                    })
            });
            it('should return a 403', (done) => {
                request(www)
                    .post('/api/admins/mentees')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({auth: escalationAuthToken})
                    .expect(403)
                    .end((err, res) => {
                        done();
                    })
            });
        });
    });
});
