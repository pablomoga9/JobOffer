const manage404 = function(req, res, next) {
    res.status(404).send('Error 404: Not found')}
    
module.exports = manage404;