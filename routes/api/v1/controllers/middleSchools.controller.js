const mongoose = require('mongoose');

var MiddleSchools = require(`${__base}/models/MiddleSchools`);

exports.createMiddleSchool = (req, res, next)=>{
   
    const { body: {middleSchools} } = req;

    const finalMiddleSchool = new MiddleSchools(middleSchools);

    return finalMiddleSchool.save().then(()=> res.json({ middleSchools: finalMiddleSchool.toAuthJSON() }));
}

exports.getAllMiddleSchools = (req, res, next) => {
    console.log('ENTERED!!!');
        MiddleSchools.find({}, (err,school)=>{
            if(err){
                return next(err);
            }
            return res.json(school);
        });
    
}

exports.getMiddleSchoolById = (req, res, next) => {
    
    MiddleSchools.findById( req.params.id, (err, school)=>{
        if(err){
            return next(err);
        }
        return res.json(school);
    });
}

