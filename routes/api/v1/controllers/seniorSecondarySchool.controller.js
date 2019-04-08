const mongoose = require('mongoose');

var SeniorSecondarySchools = require(`${__base}/models/SeniorSecondarySchools`);

exports.createSeniorSecondarySchool = (req, res, next)=>{
   
    const { body: {seniorSecondarySchools} } = req;

    const finalSeniorSecondarySchool = new SeniorSecondarySchools(seniorSecondarySchools);

    return finalSeniorSecondarySchool.save().then(()=> res.json({ seniorSecondarySchools: finalSeniorSecondarySchool.toAuthJSON() }));
}

exports.getAllSeniorSecondarySchools = (req, res, next) => {
    console.log('ENTERED!!!');
        SeniorSecondarySchools.find({}, (err,school)=>{
            if(err){
                return next(err);
            }
            return res.json(school);
        });
    
}

exports.getSeniorSecondarySchoolById = (req, res, next) => {
    
    SeniorSecondarySchools.findById( req.params.id, (err, school)=>{
        if(err){
            return next(err);
        }
        return res.json(school);
    });
}

