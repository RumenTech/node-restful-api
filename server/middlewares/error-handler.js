module.exports = function(app) {
    // Catch 404 and forward to error handler
    app.use(function four_O_fourHandler(req, res, next) {
        next({status: 404, message: 'Not Found'});
    });

    // Error handler
    app.use(function errorHandler(err, req, res, next) {
        var status = err.status || 500;

        if (req.accepts('html') || req.accepts('json')) {
            res.status(status).json({error: err});
        } else {
            res.status(406).send('Not Acceptable');
        }
    });
}