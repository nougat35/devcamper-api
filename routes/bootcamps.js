const express = require('express');
const courses = require('./courses');
const { protect } = require('../middleware/auth');

const router = express.Router();
const {
    getBootcamps,
    getBootcamp,
    updateBootcamp,
    deleteBootcamp,
    createBootcamp,
    uploadPhotoBootcamp,
} = require('../controllers/bootcamps');

router.use('/:bootcampId/courses', courses);

router.route('/').get(getBootcamps).post(protect, createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamp)
    .delete(protect, deleteBootcamp);

router.route('/:id/photo').put(protect, uploadPhotoBootcamp);

module.exports = router;
