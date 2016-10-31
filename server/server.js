var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    sessions        = require('./routes/sessions'),
    events        = require('./routes/events'),
    news        = require('./routes/news'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/sessions', sessions.findAll);
app.get('/sessions/:id', sessions.findById);
app.get('/events', events.findAll);
app.get('/events/:id', events.findById);
app.get('/news', news.findAll);
app.get('/news/:id', news.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
