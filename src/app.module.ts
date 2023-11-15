import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { ExceptionHandler } from './exception/exception.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        entities: ['dist/entities/*.entity'],
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        database: config.get('DB_NAME'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PassportModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {}
