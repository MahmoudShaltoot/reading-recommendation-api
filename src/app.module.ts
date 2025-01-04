import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:  [configuration]
  }),
  TypeOrmModule.forRoot(dataSourceOptions),
  UsersModule,
  BookModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
