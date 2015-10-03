var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;

var config = require('../../server/config.js');
var server = supertest.agent(config.host);

describe('Customers API', function() {

    var newCustomerId;

    it('should properly create a customer', function(done) {
        var customer = {
            'name': 'john',
            'email': 'john@example.com',
            'barber': 'Barber No.1'
        };

        server
            .post('/api/customers')
            .send(customer)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                expect(res).to.have.property('status')
                    .equals(200);
                expect(res.body).to.have.property('name')
                    .equals('john');
                expect(res.body).to.have.property('email')
                    .equals('john@example.com');
                newCustomerId = res.body._id;
                done();
            });
    });

    it('should disable creation of customer with duplicate email', function(done) {
        var customer = {
            'name': 'john smith',
            'email': 'john@example.com',
            'barber': 'Barber No.2'
        };

        server
            .post('/api/customers')
            .send(customer)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                console.log(res);
                expect(res).to.have.property('status')
                    .equals(500);
                done();
            });
    });

    it('should correctly update customer details', function(done) {
        var customer = {
            'name': 'john smith',
            'email': 'john@example.com'
        };

        server
            .put('/api/customers/' + newCustomerId)
            .send(customer)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                expect(res.body).to.have.property('name')
                    .equals('john smith');
                done();
            });
    });

    it('should correctly return customer specified by ID', function(done) {
        server
            .get('/api/customers/' + newCustomerId)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                expect(res.body).to.have.property('name')
                    .equals('john smith');
                done();
            });
    });

    it("should return 404",function(done){
        server
            .get("/random")
            .expect(404)
            .end(function(err,res){
                expect(res).to.have.property('status')
                    .equals(404);
                done();
            });
    });
});