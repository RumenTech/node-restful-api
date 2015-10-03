var routes = require('./index');

module.exports = function(app) {
    app.use('/api/customers', routes.api.customer());
}