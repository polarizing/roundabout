'use strict';

var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});


module.exports = function (app, db) {

    // setValue and getValue are merely alias
    // for app.set and app.get used in the less
    // common way of setting application variables.
    app.setValue = app.set.bind(app);

    app.getValue = function (path) {
        return app.get(path);
    };

    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);

    // Logging middleware, set as application
    // variable inside of server/app/configure/app-variables.js
    app.use(app.getValue('log'));
   // Parse our file / form upload
    app.use(multer({storage : storage}).single('photo'));


    // var upload = multer({dest:'./uploads/'});
    app.post('/upload', function (req, res) {
        res.send(req.file.filename)
    });


    require('./authentication')(app, db);

};
