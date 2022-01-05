function errorHandler(error, req, res) {
    res.status(400).json({
        success: false,
        error: error,
    });
}

module.exports = errorHandler;
