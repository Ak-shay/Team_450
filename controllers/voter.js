module.exports = function(app){
    app.get('/voter', function(req, res){
        res.render('voter');
    });
};