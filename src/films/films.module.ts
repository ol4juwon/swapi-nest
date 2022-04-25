import { Module } from '@nestjs/common';
import { FilmsService } from './films/films.service';
import { FilmsController } from './films/films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films.entity';
import { HttpModule } from '@nestjs/axios';
import { SWAPIService } from 'src/services/films/films.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Film])],
  providers: [FilmsService, SWAPIService],
  controllers: [FilmsController],
})
export class FilmsModule {}
