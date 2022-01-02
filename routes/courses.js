const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({
    mergeParams: true,
});

const {
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    createCourse,
} = require('../controllers/courses');

router
    .route('/')
    .get(getCourses)
    .post(protect, authorize(['publisher']), createCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, authorize(['publisher']), updateCourse)
    .delete(protect, authorize(['publisher']), deleteCourse);

module.exports = router;
