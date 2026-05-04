import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { I18nValidationPipe } from 'nestjs-i18n'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { join } from 'path'
import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { AppModule } from './app.module'
import { RoleEnum } from './common/enums/role.enum'
import { User } from './users/entities/user.entity'
import { Region } from './regions/entities/region.entity'
import { District } from './districts/entities/district.entity'

async function bootstrap() {
  const PORT = process.env.PORT ?? 8080
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }))
  app.setGlobalPrefix('api/v1')

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: false
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
    .setTitle('Arabic Learning API Documentation')
    .setDescription('Arabic Learning Platform API endpoints.')
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

  // Seed logic
  const dataSource = app.get(DataSource)
  const userRepository = dataSource.getRepository(User)
  const regionRepository = dataSource.getRepository(Region)
  const districtRepository = dataSource.getRepository(District)

  const userCount = await userRepository.count()
  if (userCount === 0) {
    console.log('Seeding initial data...')
    
    let region = await regionRepository.findOne({ where: { soato: '17' } })
    if (!region) {
      region = regionRepository.create({ name: 'Toshkent', soato: '17' })
      region = await regionRepository.save(region)
    }

    let district = await districtRepository.findOne({ where: { soato: '1726' } })
    if (!district) {
      district = districtRepository.create({ name: 'Yunusobod', soato: '1726', regionId: region.id })
      district = await districtRepository.save(district)
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = userRepository.create({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@arabic.uz',
      fullName: 'Administrator',
      phoneNumber: '+998901234567',
      role: RoleEnum.ADMIN,
      regionId: region.id,
      districtId: district.id
    })
    await userRepository.save(admin)
    console.log('Initial Admin created: admin / admin123')
  }
}
void bootstrap()
