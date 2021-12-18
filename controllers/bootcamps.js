exports.getBootcamps = (req, res, next) => {
    res.send('get bootcamps');
};

exports.getBootcamp = (req, res, next) => {
    let id = req.params.id;
    res.send(`get bootcamp ${id}`);
};

exports.addBootcamp = (req, res, next) => {
    res.send('post bootcamp');
};

exports.updateBootcamp = (req, res, next) => {
    let id = req.params.id;
    res.send(`put bootcamp ${id}`);
};

exports.deleteBootcamp = (req, res, next) => {
    let id = req.params.id;
    res.send(`delete bootcamp ${id}`);
};
