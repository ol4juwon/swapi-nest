import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { MysqlDBConfigService } from './MysqlConfig';
import { SWAPIService } from './services/films/films.service';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlDBConfigService,
      inject: [MysqlDBConfigService],
    }),
    FilmsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SWAPIService],
})
export class AppModule {}
