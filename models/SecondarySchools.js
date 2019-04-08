const mongoose = require('mongoose'),
crypto = require('crypto'),
jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;


const SecondarySchoolSchema = new Schema({
    secondary_school_admission_status: String,
    secondary_school_students_count: Number,
    secondary_school_application_status: String,
    secondary_school_application_deadline: String,
    secondary_school_seats_count: Number,
    secondary_school_seats_remaining_count: Number,
    secondary_school_students_applied_count: Number,
    secondary_school_students_accepted_count: Number,
    secondary_school_males_count: Number,
    secondary_school_females_count: Number
});


SecondarySchoolSchema.plugin(mongoosePaginate);


SecondarySchoolSchema.methods.generateJWT = function(){

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        secondary_school_admission_status: this.secondary_school_admission_status,
        secondary_school_students_count: this.secondary_school_students_count,
        secondary_school_application_status: this.secondary_school_application_status,
        secondary_school_application_deadline: this.secondary_school_application_deadline,
        secondary_school_seats_count: this.secondary_school_seats_count,
        secondary_school_seats_remaining_count: this.secondary_school_remaining_seats_count,
        secondary_school_students_applied_count: this.secondary_school_students_applied_count,
        secondary_school_students_accepted_count: this.secondary_school_students_accepted_count,
        secondary_school_males_count: this.secondary_school_males_count,
        secondary_school_females_count: this.secondary_school_females_count,
        _id: this._id,
        exp: parseInt(expirationDate.getDate()/1000, 10)
    }, 'secret');
}

SecondarySchoolSchema.methods.toAuthJSON = function(){

    return{
    secondary_school_admission_status: this.secondary_school_admission_status,
    secondary_school_students_count: this.secondary_school_students_count,
    secondary_school_application_status: this.secondary_school_application_status,
    secondary_school_application_deadline: this.secondary_school_application_deadline,
    secondary_school_seats_count: this.secondary_school_seats_count,
    secondary_school_seats_remaining_count: this.secondary_school_remaining_seats_count,
    secondary_school_students_applied_count: this.secondary_school_students_applied_count,
    secondary_school_students_accepted_count: this.secondary_school_students_accepted_count,
    secondary_school_males_count: this.secondary_school_males_count,
    secondary_school_females_count: this.secondary_school_females_count,
    _id: this._id,
    token: this.generateJWT()
    };
};

var SecondarySchools = mongoose.model('SecondarySchools', SecondarySchoolSchema);
module.exports = SecondarySchools;
