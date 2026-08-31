import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './common/guards/auth.guard'
import { RolesGuard } from './common/guards/roles.guard'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { DecksModule } from './decks/decks.module'
import { FilesModule } from './files/files.module'
import { HurufModule } from './huruf/huruf.module'
import { NahwModule } from './nahw/nahw.module'
import { PatternsModule } from './patterns/patterns.module'
import { RootsModule } from './roots/roots.module'
import { SarfModule } from './sarf/sarf.module'
import { StudyModule } from './study/study.module'
import { UsersModule } from './users/users.module'
import { WordsModule } from './words/words.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      cache: true
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: Number(config.get('THROTTLE_TTL', '60000')),
          limit: Number(config.get('THROTTLE_LIMIT', '120'))
        }
      ]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST')?.trim(),
        port: Number(config.get<string>('DB_PORT', '5432').trim()),
        username: config.get<string>('DB_USERNAME')?.trim(),
        password: config.get<string>('DB_PASSWORD')?.trim(),
        database: config.get<string>('DB_NAME')?.trim(),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        logging: config.get<string>('NODE_ENV') === 'development' ? ['error', 'warn'] : ['error'],
        ssl: config.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
        extra: { max: Number(config.get('DB_POOL_MAX', '10')) }
      })
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'uz',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: process.env.NODE_ENV === 'development'
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-custom-lang'])
      ]
    }),
    AuthModule,
    UsersModule,
    FilesModule,
    RootsModule,
    PatternsModule,
    SarfModule,
    HurufModule,
    NahwModule,
    WordsModule,
    DecksModule,
    StudyModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector) => new ClassSerializerInterceptor(reflector),
      inject: [Reflector]
    }
  ]
})
export class AppModule {}
