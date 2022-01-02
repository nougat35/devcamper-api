const express = require('express');
const { protect } = require('../middleware/auth');

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

router.route('/').get(getCourses).post(protect, createCourse);

router
    .route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);

module.exports = router;
