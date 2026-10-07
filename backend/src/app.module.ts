import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [UrlModule,
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
     type: 'postgres',
      database: process.env.DATABASE,
      username: process.env.DB_USERNAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      host: process.env.DB_HOST ? process.env.DB_HOST : 'postgres',
      password: process.env.DB_PASSWORD,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
  }),
  UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
