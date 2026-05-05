import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { I18nValidationPipe } from 'nestjs-i18n'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT ?? 8080
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }))
  app.setGlobalPrefix('api/v1')

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  )

  app.use(cookieParser())

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )

  app.enableCors({
    origin: ['http://localhost:7070', 'http://127.0.0.1:7070'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/'
  })

  const config = new DocumentBuilder()
    .setTitle('Arabic Learning API')
    .setDescription('API documentation for Arabic Learning Platform.')
    .setVersion('1.0.0')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token'
    })
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
void bootstrap()
