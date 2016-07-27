var checkUser = function (req, res, next) {
    if (req.user) next();
    else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
}

var checkAdmin = function(req, res, next) {
    if (req.user.is_admin) next();
     else {
         var err = new Error('Unauthorized');
         err.status = 401;
         next(err);
     }
}

var checkAccess = function (req, res, next) {
    if (req.user === req.requestedUser || req.user.is_admin) next();
    else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
}

module.exports = {
    user: checkUser,
    admin: checkAdmin,
    access: checkAccess
}
