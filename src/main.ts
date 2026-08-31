import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { type NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'
import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  })

  const port = Number(process.env.PORT ?? 8080)
  const isProduction = process.env.NODE_ENV === 'production'

  app.setGlobalPrefix('api/v1')

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: isProduction,
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  )
  app.use(compression())
  app.use(cookieParser())

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }))

  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:7070')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  // In development the app is also opened from phones and tablets on the local
  // network, whose address changes with the router, so any private LAN origin is
  // accepted there. Production stays on the explicit list.
  const LAN_ORIGIN =
    /^http:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/

  app.enableCors({
    origin: isProduction ? corsOrigins : [...corsOrigins, LAN_ORIGIN],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
    maxAge: isProduction ? '30d' : 0,
    immutable: isProduction
  })

  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Arabic Learning API')
      .setDescription('API documentation for the Arabic vocabulary learning platform.')
      .setVersion('1.0.0')
      .addCookieAuth('access_token', { type: 'apiKey', in: 'cookie', name: 'access_token' })
      .build()

    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config), {
      swaggerOptions: { persistAuthorization: true }
    })
  }

  await app.listen(port, '0.0.0.0')
  Logger.log(`Server listening on port ${port} (${process.env.NODE_ENV ?? 'development'})`, 'Bootstrap')
}

void bootstrap()
