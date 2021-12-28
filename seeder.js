const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/devcamper');

const bootcamps = JSON.parse(
    fs.readFileSync('./_data/bootcamps.json', 'utf-8')
);

const courses = JSON.parse(fs.readFileSync('./_data/courses.json', 'utf-8'));

(async function () {
    switch (process.argv[2]) {
        case '-f':
            await Bootcamp.create(bootcamps);
            await Course.create(courses);
            break;
        case '-e':
            await Bootcamp.deleteMany();
            await Course.deleteMany();
            break;
        case '-r':
            await Course.deleteMany();
            await Bootcamp.deleteMany();
            await Bootcamp.create(bootcamps);
            await Course.create(courses);
            break;
    }

    process.exit();
})();
