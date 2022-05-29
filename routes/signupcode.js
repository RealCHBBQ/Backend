const {validateArticle} = require('../controllers/validation');
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const model = require('../models/signupcode')
const likes = require('../models/likes');
const prefix = '/api/v1/signupcode';
const router = Router({prefix: prefix});
const request = require('request')

router.get('/', getAll)
router.get('/:id([0-9]{1,})', getById)



async function getAll(ctx) {
let signupcode = await model.getAll();
 console.log("getAll");
  if (signupcode.length) {
    ctx.body = signupcode
  }
}



async function getById(ctx) {
  let id = ctx.params.id
  let article = await model.getById(id)
  if (article.length) {
    ctx.body = article[0]
  }
}

module.exports = router;
