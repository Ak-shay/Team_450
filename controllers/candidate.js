module.exports = function(app) {
    app.get('/candidate', function(req, res){
        res.render('candidate');
    });

    app.post('/candidate/:id', function(req, res){
        res.render('candidate');
    });
};