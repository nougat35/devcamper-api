const asyncHandler = require('../middleware/asyncHandler');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

exports.getCourses = asyncHandler(async (req, res) => {
    const courses = req.params.bootcampId
        ? await Course.find({ bootcamp: req.params.bootcampId })
        : await Course.find().populate({
              path: 'bootcamp',
              select: 'name',
          });

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});

exports.getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({
            success: false,
            error: `Resource ${req.params.id} not found`,
        });
    }

    res.status(200).json(course);
});

exports.createCourse = asyncHandler(async (req, res) => {
    //TODO
    const bootcamp = await Bootcamp.findById(req.body.bootcamp);

    if (!bootcamp) {
        res.sendStatus(403);
    }

    if (req.user.toString() !== bootcamp.user.toString()) {
        return res.sendStatus(401);
    }

    res.status(200).json({
        data: 'TODO',
    });
});

exports.updateCourse = asyncHandler(async (req, res) => {
    //TODO
    res.status(200).json({
        data: 'TODO',
    });
});
exports.deleteCourse = asyncHandler(async (req, res) => {
    //TODO
    res.status(200).json({
        data: 'TODO',
    });
});
