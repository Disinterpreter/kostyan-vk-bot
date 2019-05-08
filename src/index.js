import Koa from 'koa'
import koaBody from 'koa-body'
import config from '../config'
import rootRoute from './routes/root'
import './controllers/bot'

const app = new Koa()

app.use(koaBody())
app.use(rootRoute.routes())

app.listen(config.port ? config.port : 8080)
