import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import * as process from 'node:process'
import * as path from 'path'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './common/guards/auth.guard'
import { RolesGuard } from './common/guards/roles.guard'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { DistrictsModule } from './districts/districts.module'
import { FilesModule } from './files/files.module'
import { RegionsModule } from './regions/regions.module'
import { UsersModule } from './users/users.module'
import { VocabularyModule } from './vocabulary/vocabulary.module'

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector) => new ClassSerializerInterceptor(reflector),
      inject: [Reflector]
    }
  ],
  imports: [
    AuthModule,
    UsersModule,
    RegionsModule,
    DistrictsModule,
    FilesModule,
    VocabularyModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST')?.trim(),
        port: Number(configService.get<string>('DB_PORT', '5432').trim()),
        username: configService.get<string>('DB_USERNAME')?.trim(),
        password: configService.get<string>('DB_PASSWORD')?.trim(),
        database: configService.get<string>('DB_NAME')?.trim(),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false
      }),
      inject: [ConfigService]
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'uz',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-custom-lang'])
      ]
    })
  ],
  exports: []
})
export class AppModule {}
