import App from './app'
import Config from './core/config'
import type Environment from './core/enums/environments'

const app = new App({
  port: Number(Config.PORT),
  environment: Config.ENV as Environment
})

app.start()
