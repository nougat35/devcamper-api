function errorHandler(error, req, res, next) {
    res.status(400).json({
        success: false,
        error: error,
    });
}

module.exports = errorHandler;
