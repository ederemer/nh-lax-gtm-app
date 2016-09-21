// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    var Opportunity = require('./public/js/models/opportunity');

    // configuration =================
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://prod:produser@ds035846.mlab.com:35846/nh-lax-gtm');     // connect to mongoDB database 
    //mongoose.connect('mongodb://localhost:27017/nhlaxgtm');
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    // routes =================================
    var router = express.Router();  // get an instance of the express Router

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        //console.log(req);
        next();
    });

    router.get('/', function(req, res) {
        res.json({ message: 'test successful' });
    });

    // Main Controller routes

    router.route('/opportunities')

        // create an opportunity
        .post(function(req, res, next) {

            var opportunity = new Opportunity(req.body); // create new instance of Opportunity model

            // save the opportunity
            opportunity.save(function(err, opportunities) {
                if (err) 
                    res.send(err)

                res.json(opportunities);

            });
        })

        // get all opportunities
        .get(function(req, res) {
            Opportunity.find(function(err, opportunities) {
                if (err)
                    res.send(err);

                res.json(opportunities);
                //console.log(opportunities);
            });
        });

    router.route('/opportunities/:_id')

        // get opportunity with that id
        .get(function(req, res) {
            Opportunity.findById(req.params._id, function(err, opportunity) {
                if (err)
                    return res.send(err)

                res.json(opportunity);
            });
        })

        .put(function(req, res) {
            console.log(req.body);
            // use opportunity model to find opportunity we want to update
            Opportunity.findById(req.params._id, function(err, opportunity) {
                console.log(opportunity.opportunityStatus);
                if (err)
                    res.send(err);

                opportunity.type = req.body.type;
                opportunity.account = req.body.account;
                opportunity.lead = req.body.lead;
                opportunity.lastContact = new Date(req.body.lastContact);
                opportunity.opportunityName = req.body.opportunityName;
                opportunity.opportunityStatus = req.body.opportunityStatus;

                opportunity.save(function(err) {
                    if (err)
                        return res.send();

                    res.json({ message: 'Opportunity updated' });
                });
            });
        })

        .delete(function(req, res) {
            console.log(req);
            Opportunity.findById(req.params._id, function(err, opportunity) {
                if (err)
                    res.send(err);

                opportunity.is_archived = true;

                opportunity.save(function(err) {
                    if (err)
                        return res.send();

                    res.json({ message: 'Opportunity archived' });
                });
            });
        });
        
    // Leaderboard Routes

    router.route('/leaderboard')

        .get(function(req, res) {
            Opportunity.aggregate(
                { $match : { lead : { "$exists": true, "$ne": null }, is_archived : false }},
                { $group: { _id : "$lead", opportunityCount : { $sum: 1 }}},
                { $sort: { opportunityCount : -1 }},
                function(err, result) {
                if (err)
                    return res.send(err)

                res.json(result);
                console.log(result);
            });
        });

    // Pie graph Route

    router.route('/charts')

        .get(function(req, res) {
            Opportunity.aggregate(
                { $match: { lead : { "$exists": true, "$ne": null}, is_archived : false, opportunityStatus : { "$ne" : "lost" } } },
                { $group: { _id : "$opportunityStatus", value : { $sum : 1 }}},
                { $sort: { _id : 1 }},
            function(err, result) {
                if (err)
                    return res.send(err)

                res.json(result);
                console.log(result);
            });
        });


    // register routes
    // all routes will be prefixed with /api
    app.use('/api', router);


    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 8080);
    console.log("App listening on port 8080");


