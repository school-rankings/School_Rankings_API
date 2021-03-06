const mongoose = require('mongoose'),
  ttl = 60 * 60 * 1,
  axios = require('axios'),
  redis = require('redis'),
  client = redis.createClient();

var Schools = require(`${__base}/models/Schools`),
  url = require('url'),
  ObjectID = require('mongoose').ObjectID,
  NodeGeocoder = require('node-geocoder'),
  request = require('request');

var NodeGeocoder = require('node-geocoder'),
  geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: 'd4641583c9eb4b4eb6286824a9e04b09'
  });

client.on('error', (err) => {
  console.log('Error: ' + err);
});

exports.createSchool = (req, res, next) => {

  const { body: { schools } } = req;

  const finalSchool = new Schools(schools);

  return finalSchool.save().then(() => res.json({ schools: finalSchool.toAuthJSON() }));
}

exports.getAllSchoolsWithPagination = (req, res, next) => {

  var get_params = url.parse(req.url, true).query;

  if (get_params['limit'] != null || get_params['page'] != null) {

    return client.get('/api/v1/schools?page=' + req.query.page + '&limit=' + req.query.limit, (err, result) => {
      if (result) {
        const resultJSON = JSON.parse(result);
        return res.status(200).json(resultJSON);
      }
      else {
        return axios.get(
          Schools.paginate({}, Schools.find().limit(req.query.limit).skip(req.skip).lean().exec().then((schools) => {
            const responseJSON = schools;
            client.setex('/api/v1/schools?page=' + req.query.page + '&limit=' + req.query.limit, 3600, JSON.stringify(responseJSON));

            return res.status(200).json({
              object: 'schools',
              page_count: req.query.page,
              result: schools
            });
          }).catch(err => {
            next(err);
          })));
      }
    });
  }

  else {

    Schools.find((err, school) => {
      if (err) {
        return next(err);
      }
      return res.json(school);
    });
  }
}

exports.getSchoolById = (req, res, next) => {

  Schools.findById(req.params.id, (err, school) => {
    if (err) {
      return next(err);
    }
    return res.json(school);
  });

}


// Ensure indexes is depcreated
// A new text index was created directly on the collection
// See mongo/CreateSchoolSearchIndex.mongo
// Schools.ensureIndexes({school_name: "text"});

exports.searchSchool = (req, res, next) => {

  let term = req.params.term;

  if (term) {
    Schools.find(
      { $text: { $search: req.params.term } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .exec((err, data) => {
        if (err) {
          return next(err);
        }
        return res.json(data);
      });
  } else {
    Schools.find((err, data) => {
      if (err) {
        return next(err);
      }
      return res.json(data);
    });
  }
};


// GeoLocation services has been made active
// and in working across the cities.
// Request params has been receiving coords
// to send further to GeoCoder to fetch loc info.

exports.getGeoLocSchools = (req, res) => {
  geocoder.geocode(req.params.term).then(data => {

    console.log('Data: ',data[0]);

    var options = {
      url: 'http://localhost:8000/api/v1/schools/search/' + data[0].county,
      method: 'GET',
      json: true
    }

    request(options, (error, response, body) => {
      return res.json(body);
    })

  });
};




