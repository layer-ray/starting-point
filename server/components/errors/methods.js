exports.asyncHandler = fn => 
                       (req, res, next) => 
                        Promise.resolve(fn(req, res, next))
                                .catch(next);

exports.httpError = (err, req, res, next) => {
        err.reqErr
                ? res.status(err.status || 400)
                     .json({error: err.message || "Something failed about your request"})
                : next(err);
};

exports.serverError = (err, req, res, next) => {
        console.error(err);
        res.status(500).json({error: "Server is crashed"});
};