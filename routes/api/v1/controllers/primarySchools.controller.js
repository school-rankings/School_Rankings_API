const mongoose = require('mongoose');

var PrimarySchools = require(`${__base}/models/PrimarySchools`);

exports.createPrimarySchool = (req, res, next)=>{

    console.log('ENTERED!!!');
   
    const { body: {primarySchools} } = req;

    const finalPrimarySchool = new PrimarySchools(primarySchools);

    return finalPrimarySchool.save().then(()=> res.json({ primarySchools: finalPrimarySchool.toAuthJSON() }));
}

exports.getAllPrimarySchools = (req, res, next) => {
    console.log('ENTERED!!!');
        PrimarySchools.find({}, (err,school)=>{
            if(err){
                return next(err);
            }
            return res.json(school);
        });
    
}

exports.getPrimarySchoolById = (req, res, next) => {
    
    PrimarySchools.findById( req.params.id, (err, school)=>{
        if(err){
            return next(err);
        }
        return res.json(school);
    });
}

