const express = require('express');
const courses = require('./courses');

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

router.route('/').get(getBootcamps).post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

router.route('/:id/photo').put(uploadPhotoBootcamp);

module.exports = router;
