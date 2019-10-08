let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');

let actors = require('./routers/actor');
let movies = require('./routers/movie');

let app = express();
let path = require('path');

app.listen(8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/", express.static(path.join(__dirname,"dist/movieAng")));

mongoose.connect('mongodb://localhost:27017/movies', function(err){

    if (err){
        return console.log('Mongoose-connection error:', err);
    }
    console.log('Connect Successfully');

});


//Configuring Endpoints
//Actor RESTFul endpoionts
// app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

//2. Delete an actor and all its movies (**OK**)
app.delete('/actors', actors.deleteActor);

//3. Remove a movie from the list of movies of an actor (**OK**)
app.delete('/actors/:id/:id1', actors.deleteMovie);

//7. Update the implementation such that the array of movies should contain the details of the movies instead of IDs (**OK**)
app.get('/actors', actors.getMovies);

//** */
app.put('/actors', actors.incrementAge)




//Movie RESTFul endpoionts
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.post('/movies/:id/actors', movies.addActor);
// app.post('/movies/:title/name', movies.addActor);

//1. Delete a movie by its ID (**OK**)
app.delete('/movies/:id', movies.deleteOne);

//4. Remove an actor from the list of actors in a movie (**OK**)
app.delete('/movies/:id/actors', movies.deleteActor)

//5. Add an exsiting actor to the list of actors in movie (**OK**)
// app.post('/movies/:id/:actorId', movies.updateActor);

//6. Retrieve (GET) all the movies produced between year1 and year2, where year1>year2 (**OK**)
app.get('/movies/:year1/:year2', movies.getMoviesByYear);


//8. getAll movies such that it retrieves the details of all actors for each individual movie (**OK**)
app.get('/movies', movies.getActors);


// Add the actor into a movie
app.post('/movies/:id/:actorId', movies.updateActor);

//delete all movies produced before aYear, aYear>year
app.delete('/movies/aYear', movies.deleteMoviesBeforeAYear)

