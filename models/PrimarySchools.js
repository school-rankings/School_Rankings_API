const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;


const PrimarySchoolSchema = new Schema({
    primary_school_admission_status: String,
    primary_school_students_count: Number,
    primary_school_application_status: String,
    primary_school_application_deadline: String,
    primary_school_seats_count: Number,
    primary_school_seats_remaining_count: Number,
    primary_school_students_applied_count: Number,
    primary_school_students_accepted_count: Number,
    primary_school_males_count: Number,
    primary_school_females_count: Number
});


PrimarySchoolSchema.plugin(mongoosePaginate);


PrimarySchoolSchema.methods.generateJWT = function(){

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        primary_school_admission_status: this.primary_school_admission_status,
        primary_school_students_count: this.primary_school_students_count,
        primary_school_application_status: this.primary_school_application_status,
        primary_school_application_deadline: this.primary_school_application_deadline,
        primary_school_seats_count: this.primary_school_seats_count,
        primary_school_seats_remaining_count: this.primary_school_remaining_seats_count,
        primary_school_students_applied_count: this.primary_school_students_applied_count,
        primary_school_students_accepted_count: this.primary_school_students_accepted_count,
        primary_school_males_count: this.primary_school_males_count,
        primary_school_females_count: this.primary_school_females_count,
        _id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

PrimarySchoolSchema.methods.toAuthJSON = function(){

    return{
    primary_school_admission_status: this.primary_school_admission_status,
    primary_school_students_count: this.primary_school_students_count,
    primary_school_application_status: this.primary_school_application_status,
    primary_school_application_deadline: this.primary_school_application_deadline,
    primary_school_seats_count: this.primary_school_seats_count,
    primary_school_seats_remaining_count: this.primary_school_remaining_seats_count,
    primary_school_students_applied_count: this.primary_school_students_applied_count,
    primary_school_students_accepted_count: this.primary_school_students_accepted_count,
    primary_school_males_count: this.primary_school_males_count,
    primary_school_females_count: this.primary_school_females_count,
    _id: this._id,
    token: this.generateJWT()
    };
};

var PrimarySchools = mongoose.model('PrimarySchools', PrimarySchoolSchema);
module.exports = PrimarySchools;
