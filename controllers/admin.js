module.exports = function(app) {
    app.get('/admin', function(req, res){
        res.render('admin');
    });

    app.post('/admin/:id', function(req, res){
        res.render('admin');
    });
};