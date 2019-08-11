module.exports = function(app) {
    app.get('/vote', function(req, res){
        res.render('vote');
    });

    app.post('/vote/:id', function(req, res){
        res.render('vote');
    });
};