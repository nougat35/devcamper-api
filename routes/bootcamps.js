const express = require('express');
const router = express.Router();
const {
    getBootcamps,
    getBootcamp,
    addBootcamp,
    updateBootcamp,
    deleteBootcamp,
} = require('../controllers/bootcamps');

router.route('/').get(getBootcamps).post(addBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .post(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;
