const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;


const SeniorSecondarySchoolSchema = new Schema({
    senior_secondary_school_admission_status: String,
    senior_secondary_school_students_count: Number,
    senior_secondary_school_application_status: String,
    senior_secondary_school_application_deadline: String,
    senior_secondary_school_seats_count: Number,
    senior_secondary_school_seats_remaining_count: Number,
    senior_secondary_school_students_applied_count: Number,
    senior_secondary_school_students_accepted_count: Number,
    senior_secondary_school_males_count: Number,
    senior_secondary_school_females_count: Number
});


SeniorSecondarySchoolSchema.plugin(mongoosePaginate);


SeniorSecondarySchoolSchema.methods.generateJWT = function(){

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        senior_secondary_school_admission_status: this.senior_secondary_school_admission_status,
        senior_secondary_school_students_count: this.senior_secondary_school_students_count,
        senior_secondary_school_application_status: this.senior_secondary_school_application_status,
        senior_secondary_school_application_deadline: this.senior_secondary_school_application_deadline,
        senior_secondary_school_seats_count: this.senior_secondary_school_seats_count,
        senior_secondary_school_seats_remaining_count: this.senior_secondary_school_remaining_seats_count,
        senior_secondary_school_students_applied_count: this.senior_secondary_school_students_applied_count,
        senior_secondary_school_students_accepted_count: this.senior_secondary_school_students_accepted_count,
        senior_secondary_school_males_count: this.senior_secondary_school_males_count,
        senior_secondary_school_females_count: this.senior_secondary_school_females_count,
        _id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

SeniorSecondarySchoolSchema.methods.toAuthJSON = function(){

    return{
    senior_secondary_school_admission_status: this.senior_secondary_school_admission_status,
    senior_secondary_school_students_count: this.senior_secondary_school_students_count,
    senior_secondary_school_application_status: this.senior_secondary_school_application_status,
    senior_secondary_school_application_deadline: this.senior_secondary_school_application_deadline,
    senior_secondary_school_seats_count: this.senior_secondary_school_seats_count,
    senior_secondary_school_seats_remaining_count: this.senior_secondary_school_remaining_seats_count,
    senior_secondary_school_students_applied_count: this.senior_secondary_school_students_applied_count,
    senior_secondary_school_students_accepted_count: this.senior_secondary_school_students_accepted_count,
    senior_secondary_school_males_count: this.senior_secondary_school_males_count,
    senior_secondary_school_females_count: this.senior_secondary_school_females_count,
    _id: this._id,
    token: this.generateJWT()
    };
};

var SeniorSecondarySchools = mongoose.model('SeniorSecondarySchools', SeniorSecondarySchoolSchema);
module.exports = SeniorSecondarySchools;
