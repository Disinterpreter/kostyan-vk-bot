import Router from 'koa-router'
import eventEmitter from '../controllers/eventEmitter'
import config from '../../config'

const router = new Router()

router.get(config.root ? config.root : '/', (ctx, next) => {
  switch (ctx.request.query.type) {
    case 'confirmation':
      ctx.body = config.confirmation
      break
    default:
      ctx.body = 'ok'
      break
  }

  eventEmitter.emit(ctx.request.query.type, ctx.request.query)
})

export default router
