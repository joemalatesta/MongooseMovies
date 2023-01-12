import {Router} from 'express'
import * as performersCtrl from '../controllers/performers.js'

const router = Router()

// GET /performers/new
router.get('/new', performersCtrl.new)

// POST /performers
router.post('/', performersCtrl.create)

export{
  router
}