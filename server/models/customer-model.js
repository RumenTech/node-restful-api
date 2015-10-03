var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var _ = require('lodash');

var customerSchema = new Schema({
    'name': {type: String, required: true},
    'email': {type: String, required: true, unique: true},
    'barber': String
}, {
    id: false,
    toJSON: {virtuals: true}
});

var fields = 'name email barber'.split(' ');

customerSchema.methods.modify = function(data, cb) {
    _
        .extend(this, _.pick(data, fields))
        .save(cb);
};

customerSchema.findByEmail = function(email, cb) {
    return this.findOne({'email': email}, cb);
};

var Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;