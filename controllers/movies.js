import { Movie } from "../models/movie.js"
import { Performer } from "../models/performer.js"

function newMovie(req, res) {
  res.render("movies/new", {
    title: "Add Movie"
  })
}

function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Movie.create(req.body)
  .then(movie => {
    res.redirect(`/movies/${movie._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/movies")
  })
}

function index(req, res) {
  Movie.find({})
  .then(movies => {
    res.render('movies/index', {
      movies,
      title: "All Movies",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function show(req, res) {
  Movie.findById(req.params.id)
  .populate("cast")
  .then(movie => {
    Performer.find({ _id: {$nin: movie.cast} })
    .then(performersNotInCast => {
      res.render('movies/show', {
        title: "Movie Detail",
        movie: movie,
        performersNotInCast
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/movies")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/movies")
  })
}

function deleteMovie(req, res) {
  Movie.findByIdAndDelete(req.params.id)
  .then(movie => {
    res.redirect("/movies")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/movies")
  })
}

function edit(req, res) {
  Movie.findById(req.params.id)
  .then(movie => {
    res.render("movies/edit", {
      title: "Edit Movie",
      movie, 
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(movie => {
    res.redirect(`/movies/${movie._id}`) 
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createReview(req, res) {
  Movie.findById(req.params.id)
  .then(movie => {
    movie.reviews.push(req.body)
    movie.save()
    .then(() => {
      res.redirect(`/movies/${movie._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addToCast(req, res) {
  Movie.findById(req.params.id)
  .then(movie => {
    movie.cast.push(req.body.performerId)
    movie.save()
    .then(() => {
      res.redirect(`/movies/${movie._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies")
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect("/movies")
  })
}

export {
  newMovie as new,
  create,
  index,
  show,
  deleteMovie as delete,
  edit,
  update,
  createReview,
  addToCast,
}