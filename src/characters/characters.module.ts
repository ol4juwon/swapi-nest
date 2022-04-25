import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SWAPIService } from 'src/services/films/films.service';
import { Characters } from './characters.entity';
import { CharactersController } from './characters/characters.controller';
import { CharactersService } from './characters/characters.service';

@Module({
  controllers: [CharactersController],
  imports: [HttpModule, TypeOrmModule.forFeature([Characters])],
  providers: [CharactersService, SWAPIService],
})
export class CharactersModule {}
