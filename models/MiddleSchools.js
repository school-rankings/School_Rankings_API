const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;


const MiddleSchoolSchema = new Schema({
    middle_school_admission_status: String,
    middle_school_students_count: Number,
    middle_school_application_status: String,
    middle_school_application_deadline: String,
    middle_school_seats_count: Number,
    middle_school_seats_remaining_count: Number,
    middle_school_students_applied_count: Number,
    middle_school_students_accepted_count: Number,
    middle_school_males_count: Number,
    middle_school_females_count: Number
});


MiddleSchoolSchema.plugin(mongoosePaginate);


MiddleSchoolSchema.methods.generateJWT = function(){

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        middle_school_admission_status: this.middle_school_admission_status,
        middle_school_students_count: this.middle_school_students_count,
        middle_school_application_status: this.middle_school_application_status,
        middle_school_application_deadline: this.middle_school_application_deadline,
        middle_school_seats_count: this.middle_school_seats_count,
        middle_school_seats_remaining_count: this.middle_school_remaining_seats_count,
        middle_school_students_applied_count: this.middle_school_students_applied_count,
        middle_school_students_accepted_count: this.middle_school_students_accepted_count,
        middle_school_males_count: this.middle_school_males_count,
        middle_school_females_count: this.middle_school_females_count,
        _id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

MiddleSchoolSchema.methods.toAuthJSON = function(){

    return{
    middle_school_admission_status: this.middle_school_admission_status,
    middle_school_students_count: this.middle_school_students_count,
    middle_school_application_status: this.middle_school_application_status,
    middle_school_application_deadline: this.middle_school_application_deadline,
    middle_school_seats_count: this.middle_school_seats_count,
    middle_school_seats_remaining_count: this.middle_school_remaining_seats_count,
    middle_school_students_applied_count: this.middle_school_students_applied_count,
    middle_school_students_accepted_count: this.middle_school_students_accepted_count,
    middle_school_males_count: this.middle_school_males_count,
    middle_school_females_count: this.middle_school_females_count,
    _id: this._id,
    token: this.generateJWT()
    };
};

var MiddleSchools = mongoose.model('MiddleSchools', MiddleSchoolSchema);
module.exports = MiddleSchools;
