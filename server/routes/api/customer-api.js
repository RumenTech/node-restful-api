var router = require('express').Router();
var mongoose = require('mongoose');
var Q = require('q');

/**
 * API implementation for customers CRUD operation
 *
 *  Method  | URL                                       | Description
 *  -----------------------------------------------------------------
 *     GET  | /api/customers                            | Get all of the customers
 *          | /api/customers?name=john                  | Get a customer specified by name
 *          | /api/customers?email=example@gmail.com    | Get a customer specified by email
 *          | /api/customers/:customer_id               | Get a customer specified by unique ID
 *    POST  | /api/customers                            | Create a single customer
 *     PUT  | /api/customers/:customer_id               | Update a single customer specified by unique ID
 *  DELETE  | /api/customers/:customer_id               | Delete a single customer specified by unique ID
 *  -----------------------------------------------------------------
 */

module.exports = function() {
    var Customer = mongoose.model('customers');

    return router
        .get('/', function(req, res, next) {
            var qry = req.query;
            var Query = Customer.find();

            if (qry.email) {
                Query.and({'email': qry.email});
            }
            if (qry.name) {
                Query.and({'name': qry.name});
            }

            Q
                .nbind(Query.exec, Query)()
                .then(function(docs) {
                    res.json(docs);
                })
                .then(null, function(err) {
                    next(err);
                });
        })

        .get('/:customerId', function(req, res, next) {
            var customerId = req.params.customerId;
            var Query = Customer.findById(customerId);

            Q
                .nbind(Query.exec, Query)()
                .then(function(doc) {
                    res.json(doc);
                })
                .then(null, function(err) {
                    next(err);
                })
        })

        .post('/', function(req, res, next) {
            var data = req.body;

            Q
                .nbind(Customer.create, Customer)(data)
                .then(function(doc) {
                    res.json(doc)
                })
                .then(null, function(err) {
                    next(err);
                })
        })

        .put('/:customerId', function(req, res, next) {
            var customerId = req.params.customerId;
            var data = req.body;

            Q
                .nbind(Customer.findById, Customer)(customerId)
                .then(function(doc) {
                    return Q.nbind(doc.modify, doc)(data);
                })
                .spread(function(doc, numAffected) {
                    res.json(doc);
                })
                .catch(function(err) {
                    next(err);
                })
        })

        .delete('/:customerId', function(req, res, next) {
            var customerId = req.params.customerId;

            Q
                .nbind(Customer.findById, Customer)(customerId)
                .then(function(doc) {
                    return Q.nbind(doc.remove, doc)();
                })
                .then(function(doc) {
                    res.json(doc);
                })
                .catch(function(err) {
                    next(err);
                })
        });
};