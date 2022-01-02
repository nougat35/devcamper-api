const express = require('express');
const courses = require('./courses');
const { protect, authorize } = require('../middleware/auth');

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

router
    .route('/')
    .get(getBootcamps)
    .post(protect, authorize(['publisher']), createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize(['publisher']), updateBootcamp)
    .delete(protect, authorize(['publisher']), deleteBootcamp);

router
    .route('/:id/photo')
    .put(protect, authorize(['publisher']), uploadPhotoBootcamp);

module.exports = router;
