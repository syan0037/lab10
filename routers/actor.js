let mongoose = require ('mongoose');

let Actor = require('../models/actor');
let Movie = require('../models/movie');

module.exports = {

    // implement functions

    getAll: function (req, res) {
        Actor.find(function (err, actor) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            console.log('Done');
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },

    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },

    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    
                    res.json(actor);
                });
            })
        });
    },

    //2. Delete an actor and all its movies 
    deleteActor: function(req, res){
        Actor.findOneAndDelete({_id: req.body.id}, function (err, actor){
            if (err) return res.status(400).json(err);

            res.json();
        });

    },

    //3. Remove a movie from the list of movies of an actor
    deleteMovie: function(req, res){
        Actor.findOne({_id: req.params.id}, function (err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findByIdAndRemove({_id: req.params.id1}, function (err, movie){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(actor);
            });
        });
    },

    //7. Update the implementation such that the array of movies should contain the details of the movies instead of IDs
    getMovies: function(req, res){
        Actor.find().populate('movies').exec(function (err,actor){
            if (err) return res.json(err);
            if (!actor) return res.json();
            res.json(actor);
        });
    },


    //** */
    incrementAge: function (req, res){
         Actor.find({bYear:{$lt:1969}}), function (err, actor) {
            for (let i = 0; i< actor.length; i++){
                actor[i].bYear -= 4
            };
        };
    },

}