module.exports = function(app){
    app.get('/voter', function(req, res){
        res.render('voter');
    });
    app.post('/voter', function(req, res){
        res.send(req.body);
    })
};