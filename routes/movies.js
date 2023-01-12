import { Router } from 'express'
import * as moviesCtrl from "../controllers/movies.js"

const router = Router()


// GET /movies
router.get('/', moviesCtrl.index)

// GET /movies/new
router.get('/new', moviesCtrl.new)

// GET /movies/:id
router.get('/:id', moviesCtrl.show)

// GET /movies/:id/edit
router.get("/:id/edit", moviesCtrl.edit)

// POST /movies
router.post("/", moviesCtrl.create)

// POST /movies/:id/reviews
router.post("/:id/reviews", moviesCtrl.createReview)

// POST /movies/:id/performers
router.post("/:id/performers", moviesCtrl.addToCast)

// DELETE /movies/:id
router.delete("/:id", moviesCtrl.delete)

// PUT /movies/:id
router.put("/:id", moviesCtrl.update)

export {
  router
}