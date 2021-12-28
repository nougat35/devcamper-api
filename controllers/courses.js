const asyncHandler = require('../middleware/asyncHandler');
const Course = require('../models/Course');

exports.getCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find(req.query);

    res.status(200).json({
        success: true,
        count: await Course.count(),
        data: courses,
    });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({
            success: false,
            error: `Resource ${req.params.id} not found`,
        });
    }

    res.status(200).json(course);
});

exports.createCourse = asyncHandler(async (req, res, next) => {
    //TODO
    res.status(200).json({
        data: 'todo',
    });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
    //TODO
    res.status(200).json({
        data: 'todo',
    });
});
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    //TODO
    res.status(200).json({
        data: 'todo',
    });
});
