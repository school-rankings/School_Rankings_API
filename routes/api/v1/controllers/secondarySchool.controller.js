const mongoose = require('mongoose');

var SecondarySchools = require(`${__base}/models/SecondarySchools`);

exports.createSecondarySchool = (req, res, next)=>{
   
    const { body: {secondarySchools} } = req;

    const finalSecondarySchool = new SecondarySchools(secondarySchools);

    return finalSecondarySchool.save().then(()=> res.json({ secondarySchools: finalSecondarySchool.toAuthJSON() }));
}

exports.getAllSecondarySchools = (req, res, next) => {
    console.log('ENTERED!!!');
        SecondarySchools.find({}, (err,school)=>{
            if(err){
                return next(err);
            }
            return res.json(school);
        });
    
}

exports.getSecondarySchoolById = (req, res, next) => {
    
    SecondarySchools.findById( req.params.id, (err, school)=>{
        if(err){
            return next(err);
        }
        return res.json(school);
    });
}

