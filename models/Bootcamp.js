const mongoose = require('mongoose');
const slugify = require('slugify');
const Course = require('./Course');

const BootcampSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            maxlength: 50,
            required: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
            maxlength: 500,
            required: true,
        },
        website: {
            type: String,
            match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            required: true,
        },
        email: {
            type: String,
            match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: true,
        },

        phone: {
            type: String,
            maxlength: 20,
            required: true,
        },
        address: {
            type: String,
            maxlength: 50,
            required: true,
        },
        careers: {
            type: [String],
            enum: [
                'Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Other',
            ],
            required: true,
        },
        averageRating: {
            type: Number,
            min: 1,
            max: 10,
        },
        averageCost: {
            type: Number,
        },
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

BootcampSchema.virtual('courses', {
    localField: '_id',
    foreignField: 'bootcamp',
    ref: 'Course',
    justOne: false,
});

BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

BootcampSchema.pre('remove', async function (next) {
    await Course.deleteMany({ bootcamp: this._id });
    next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
